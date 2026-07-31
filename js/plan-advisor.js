// plan-advisor.js — 「帮我选套餐」性价比计算器（纯前端，基于已加载的套餐数据）
// 输入：模型系（多选）、月用量档位、人民币直付/预算上限；输出：分层排序的套餐推荐。
import { escapeHtml, safeExternalUrl } from './render.js';
import { renderBrandIcon } from './plans-table.js';
import { outboundTrackingAttributes, purchaseLinkTarget } from './plans-detail.js';
import { PROVIDER_NAME_MAP } from './shared/brands.js';
import { displayNameForProvider } from './shared/plan-utils.js';
import { USD_TO_CNY, effectiveMonthlyPrice, monthlyQuota } from './shared/quota-utils.js';

export { effectiveMonthlyPrice, monthlyQuota };
export { parseQuota } from './shared/quota-utils.js';

// 月用量档位（次/月）
const USAGE_TIERS = [
  { id: 'light', label: '轻度 ~500 次/月', value: 500 },
  { id: 'medium', label: '中度 ~3,000 次/月', value: 3000 },
  { id: 'heavy', label: '重度 ~10,000 次/月', value: 10000 },
  { id: 'extreme', label: '极重 ~30,000 次/月', value: 30000 }
];

// 模型目录 provider → 模型系名称（兜底用 provider 原名）
const PROVIDER_FAMILY_MAP = {
  '智谱': 'GLM 系',
  'KIMI': 'Kimi 系',
  '阿里云百炼': 'Qwen 系',
  'Qoder': 'Qwen 系',
  '火山引擎': '豆包系',
  'DeepSeek': 'DeepSeek',
  'MiniMax': 'MiniMax',
  '腾讯混元': '混元系',
  '百度千帆': '文心系',
  '阶跃星辰': 'Step 系',
  'Xiaomi MiMo': 'MiMo 系'
};

const DEFAULT_VISIBLE_RESULTS = 8;

// ---------- 模型系选项 ----------

function familyForCatalogModel(model) {
  return PROVIDER_FAMILY_MAP[model.provider] || model.provider || '其他';
}

export function buildFamilyOptions(modelCatalog, plans) {
  const familyByModelId = new Map();
  for (const model of modelCatalog) {
    if (model.id) familyByModelId.set(model.id, familyForCatalogModel(model));
  }
  const counts = new Map();
  for (const plan of plans) {
    const families = new Set((plan.modelIds || [])
      .map(id => familyByModelId.get(id))
      .filter(Boolean));
    for (const family of families) {
      counts.set(family, (counts.get(family) || 0) + 1);
    }
  }
  const options = [...counts.entries()]
    .map(([family, count]) => ({ family, count }))
    .sort((a, b) => (b.count - a.count) || a.family.localeCompare(b.family, 'zh-CN'));
  return { options, familyByModelId };
}

function planFamilies(plan, familyByModelId) {
  return new Set((plan.modelIds || []).map(id => familyByModelId.get(id)).filter(Boolean));
}

// ---------- 匹配与分层排序 ----------

// 分层：1 额度覆盖用量（每千次成本升序）→ 2 额度可能不足 → 3 额度未公开（月价升序）→ 4 模型未标注
export function rankPlans(plans, criteria, familyByModelId) {
  const { families, usage, rmbOnly, budget } = criteria;
  const results = [];
  let paygoCount = 0;

  for (const plan of plans) {
    if (plan.planType === 'api_package') { paygoCount += 1; continue; }
    if (rmbOnly && !plan.domesticPayment) continue;

    const price = effectiveMonthlyPrice(plan);
    if (budget != null && price && price.cny > budget) continue;

    let unlabeled = false;
    if (families.size) {
      const matched = planFamilies(plan, familyByModelId);
      if (!matched.size) {
        unlabeled = true; // 模型未标注：降权保留而非剔除
      } else if (![...matched].some(family => families.has(family))) {
        continue;
      }
    }

    const quota = monthlyQuota(plan);
    const costPer1k = quota && price && quota.value > 0 ? (price.cny / quota.value) * 1000 : null;
    let tier;
    if (unlabeled) tier = 4;
    else if (!quota) tier = 3;
    else if (quota.value >= usage) tier = 1;
    else tier = 2;

    results.push({ plan, price, quota, costPer1k, tier });
  }

  results.sort((a, b) => {
    if (a.tier !== b.tier) return a.tier - b.tier;
    if (a.tier === 1 || a.tier === 2) {
      if (a.costPer1k !== b.costPer1k) return (a.costPer1k ?? Infinity) - (b.costPer1k ?? Infinity);
    }
    const priceA = a.price ? a.price.cny : Infinity;
    const priceB = b.price ? b.price.cny : Infinity;
    return priceA - priceB;
  });

  return { results, paygoCount };
}

// ---------- 格式化 ----------

function formatCount(value) {
  return Math.round(value).toLocaleString('zh-CN');
}

function formatMoney(value, currency = 'CNY') {
  const symbol = currency === 'USD' ? '$' : '¥';
  return `${symbol}${value.toLocaleString('zh-CN', { maximumFractionDigits: value < 10 ? 2 : 0 })}`;
}

// ---------- 弹窗渲染 ----------

function renderResultItem(item, providerInfo) {
  const { plan, price, quota, costPer1k, tier } = item;
  const providerLabel = displayNameForProvider(plan.provider, providerInfo, PROVIDER_NAME_MAP);
  const chips = [];
  if (tier === 1) chips.push('<span class="plan-advisor-chip plan-advisor-chip--good">额度充足</span>');
  else if (tier === 2) chips.push('<span class="plan-advisor-chip plan-advisor-chip--warn">额度可能不足</span>');
  else if (tier === 3) chips.push('<span class="plan-advisor-chip plan-advisor-chip--muted">额度未公开</span>');
  else chips.push('<span class="plan-advisor-chip plan-advisor-chip--muted">模型未标注</span>');
  if (quota) {
    const suffix = quota.estimated ? `（${escapeHtml(quota.basis)}，估算）` : '';
    chips.push(`<span class="plan-advisor-chip">月额度 ~${formatCount(quota.value)} 次${suffix}</span>`);
  }
  if (costPer1k != null) {
    chips.push(`<span class="plan-advisor-chip">每千次 ≈ ${formatMoney(costPer1k)}</span>`);
  }
  if (plan.domesticPayment) chips.push('<span class="plan-advisor-chip">人民币直付</span>');
  if (plan.supportedModelNames?.length) {
    const names = plan.supportedModelNames.slice(0, 3).join(' / ');
    chips.push(`<span class="plan-advisor-chip">支持 ${escapeHtml(names)}${plan.supportedModelNames.length > 3 ? ' 等' : ''}</span>`);
  }

  let priceHtml = '<span class="plan-advisor-price-muted">价格请以官网为准</span>';
  if (price) {
    const cycleBadge = price.cycle !== '月付' ? `<span class="plan-advisor-cycle">${escapeHtml(price.cycle)}</span>` : '';
    const usdNote = price.currency === 'USD'
      ? `<span class="plan-advisor-price-note">≈ ¥${formatCount(price.cny)}（按 ¥${USD_TO_CNY} 折算）</span>`
      : '';
    priceHtml = `<span class="plan-advisor-price">${formatMoney(price.value, price.currency)}/月</span>${cycleBadge}${usdNote}`;
  }

  const planUrl = safeExternalUrl(plan.url);
  const link = planUrl ? purchaseLinkTarget(plan, planUrl) : null;
  const linkHtml = link
    ? `<a href="${escapeHtml(link.href)}" target="_blank" rel="${link.rel}" ${outboundTrackingAttributes(plan)} class="plan-advisor-link">官网 →</a>`
    : '';

  return `
    <li class="plan-advisor-result">
      <div class="plan-advisor-result-head">
        ${renderBrandIcon(plan.providerIconUrl, providerLabel, 'brand-icon plan-advisor-result-icon')}
        <div class="plan-advisor-result-name">
          <strong>${escapeHtml(plan.name)}</strong>
          <span>${escapeHtml(providerLabel)}</span>
        </div>
        <div class="plan-advisor-result-price">${priceHtml}</div>
      </div>
      <div class="plan-advisor-result-chips">${chips.join('')}</div>
      ${linkHtml}
    </li>
  `;
}

function renderDialogShell(familyOptions) {
  return `
    <div class="plan-advisor-dialog" role="dialog" aria-modal="true" aria-labelledby="planAdvisorTitle" tabindex="-1">
      <div class="plan-advisor-head">
        <h2 id="planAdvisorTitle">哪个套餐最划算？</h2>
        <button type="button" class="plan-advisor-close" data-advisor-close aria-label="关闭计算器">✕</button>
      </div>
      <div class="plan-advisor-body">
        <div class="plan-advisor-form">
          <div class="plan-advisor-field">
            <span class="plan-advisor-label">主要用哪个模型系？<small>可多选，不选=不限</small></span>
            <div class="plan-advisor-options" data-advisor-families>
              ${familyOptions.map(option => `
                <button type="button" class="plan-advisor-option" data-family="${escapeHtml(option.family)}" aria-pressed="false">
                  ${escapeHtml(option.family)}<span class="plan-advisor-option-count">${option.count}</span>
                </button>
              `).join('')}
            </div>
          </div>
          <div class="plan-advisor-field">
            <span class="plan-advisor-label">每月大约调用多少次？</span>
            <div class="plan-advisor-options" data-advisor-usage>
              ${USAGE_TIERS.map(tier => `
                <button type="button" class="plan-advisor-option${tier.id === 'medium' ? ' is-active' : ''}" data-usage="${tier.value}" aria-pressed="${tier.id === 'medium'}">
                  ${escapeHtml(tier.label)}
                </button>
              `).join('')}
              <input type="number" min="1" class="plan-advisor-input" data-advisor-usage-custom placeholder="自定义次数" aria-label="自定义每月调用次数">
            </div>
          </div>
          <div class="plan-advisor-field plan-advisor-field--row">
            <label class="plan-advisor-switch">
              <input type="checkbox" data-advisor-rmb>
              <span>仅看支持人民币直付</span>
            </label>
            <label class="plan-advisor-budget">
              <span>预算上限</span>
              <input type="number" min="0" class="plan-advisor-input" data-advisor-budget placeholder="¥/月，可不填" aria-label="每月预算上限（元）">
            </label>
          </div>
        </div>
        <div class="plan-advisor-results" data-advisor-results aria-live="polite"></div>
      </div>
      <p class="plan-advisor-disclaimer">额度与价格为公开资料估算，仅供比较参考，请以厂商官网为准。</p>
    </div>
  `;
}

// ---------- 初始化 ----------

export function initPlanAdvisor({ plans, providerInfo = {}, modelCatalog = [], fab }) {
  if (!fab) return null;
  const { options: familyOptions, familyByModelId } = buildFamilyOptions(modelCatalog, plans);

  const state = {
    families: new Set(),
    usage: USAGE_TIERS[1].value,
    rmbOnly: false,
    budget: null,
    showAll: false
  };

  let overlay = null;
  let lastFocused = null;

  const renderResults = () => {
    const container = overlay.querySelector('[data-advisor-results]');
    const { results, paygoCount } = rankPlans(plans, state, familyByModelId);
    if (!results.length) {
      container.innerHTML = `
        <p class="plan-advisor-empty">没有符合条件的套餐，试试放宽模型系或预算限制。</p>
        ${paygoCount ? `<p class="plan-advisor-paygo">另有 ${paygoCount} 个按量计费选项未参与排序，可在套餐表中查看。</p>` : ''}
      `;
      return;
    }
    const visible = state.showAll ? results : results.slice(0, DEFAULT_VISIBLE_RESULTS);
    container.innerHTML = `
      <p class="plan-advisor-summary">按性价比为你排序 ${results.length} 个套餐：</p>
      <ol class="plan-advisor-list">
        ${visible.map(item => renderResultItem(item, providerInfo)).join('')}
      </ol>
      ${results.length > DEFAULT_VISIBLE_RESULTS && !state.showAll
        ? `<button type="button" class="plan-advisor-more" data-advisor-more>展开全部 ${results.length} 个结果</button>`
        : ''}
      ${paygoCount ? `<p class="plan-advisor-paygo">另有 ${paygoCount} 个按量计费选项未参与排序，可在套餐表中查看。</p>` : ''}
    `;
  };

  const close = () => {
    if (!overlay) return;
    overlay.hidden = true;
    document.body.style.overflow = '';
    lastFocused?.focus?.();
  };

  const ensureOverlay = () => {
    if (overlay) return;
    overlay = document.createElement('div');
    overlay.className = 'plan-advisor-overlay';
    overlay.hidden = true;
    overlay.innerHTML = renderDialogShell(familyOptions);
    document.body.appendChild(overlay);

    overlay.addEventListener('click', event => {
      // 点击遮罩空白区域不关闭弹窗，避免误触丢失筛选条件；仅 ✕ 按钮与 ESC 关闭
      if (event.target.closest('[data-advisor-close]')) {
        close();
        return;
      }
      const familyButton = event.target.closest('[data-family]');
      if (familyButton) {
        const family = familyButton.dataset.family;
        if (state.families.has(family)) state.families.delete(family);
        else state.families.add(family);
        const active = state.families.has(family);
        familyButton.classList.toggle('is-active', active);
        familyButton.setAttribute('aria-pressed', String(active));
        state.showAll = false;
        renderResults();
        return;
      }
      const usageButton = event.target.closest('[data-usage]');
      if (usageButton) {
        state.usage = Number(usageButton.dataset.usage);
        overlay.querySelectorAll('[data-usage]').forEach(button => {
          const active = button === usageButton;
          button.classList.toggle('is-active', active);
          button.setAttribute('aria-pressed', String(active));
        });
        const custom = overlay.querySelector('[data-advisor-usage-custom]');
        if (custom) custom.value = '';
        state.showAll = false;
        renderResults();
        return;
      }
      if (event.target.closest('[data-advisor-more]')) {
        state.showAll = true;
        renderResults();
      }
    });

    overlay.querySelector('[data-advisor-usage-custom]')?.addEventListener('input', event => {
      const value = Number(event.target.value);
      if (Number.isFinite(value) && value > 0) {
        state.usage = value;
        overlay.querySelectorAll('[data-usage]').forEach(button => {
          button.classList.remove('is-active');
          button.setAttribute('aria-pressed', 'false');
        });
      }
      state.showAll = false;
      renderResults();
    });

    overlay.querySelector('[data-advisor-rmb]')?.addEventListener('change', event => {
      state.rmbOnly = event.target.checked;
      state.showAll = false;
      renderResults();
    });

    overlay.querySelector('[data-advisor-budget]')?.addEventListener('input', event => {
      const value = Number(event.target.value);
      state.budget = Number.isFinite(value) && value > 0 ? value : null;
      state.showAll = false;
      renderResults();
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && overlay && !overlay.hidden) close();
    });
  };

  const open = () => {
    ensureOverlay();
    lastFocused = document.activeElement;
    overlay.hidden = false;
    document.body.style.overflow = 'hidden';
    renderResults();
    overlay.querySelector('.plan-advisor-dialog')?.focus();
  };

  fab.addEventListener('click', open);
  return { open, close };
}
