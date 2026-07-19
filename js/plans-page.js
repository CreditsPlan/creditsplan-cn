import { initAppShell } from './app.js';
import {
  bindPlanTableFilters,
  clearPlanTableFilter
} from './plans-filters.js';
import { renderAllPlansDualView, renderBrandIcon } from './plans-table.js';
import { loadPlanDataset } from './public-data.js';
import { escapeHtml } from './render.js';
import { PROVIDER_NAME_MAP, brandForProvider } from './shared/brands.js';
import {
  displayNameForProvider,
  filterFreePlans,
  filterPlansByProviderInfo,
  providerMetadata,
  providerSortOrder,
  safeIconUrl,
  sortPlansBySortOrder
} from './shared/plan-utils.js';

const VIRTUAL_TABS = [
  { id: 'all', label: '全部' },
  { id: 'free', label: '免费' }
];

const els = {
  codingPlanOverview: document.getElementById('codingPlanOverview')
};

function groupPlansByBrand(plans, providerInfo) {
  const grouped = new Map();
  for (const plan of plans) {
    const brand = brandForProvider(plan.provider);
    const provider = String(plan.provider || '').trim();
    const canonicalProvider = PROVIDER_NAME_MAP[provider] || provider;
    if (!canonicalProvider) continue;
    const metadata = providerMetadata(provider, providerInfo, PROVIDER_NAME_MAP);
    const id = brand?.id || canonicalProvider;
    let group = grouped.get(id);
    if (!group) {
      group = {
        id,
        provider,
        label: displayNameForProvider(provider, providerInfo, PROVIDER_NAME_MAP),
        iconUrl: safeIconUrl(metadata.icon_url)
          || safeIconUrl(plan.providerIconUrl)
          || safeIconUrl(brand?.iconUrl),
        sortOrder: providerSortOrder(provider, providerInfo, PROVIDER_NAME_MAP),
        plans: []
      };
      grouped.set(id, group);
    } else if (!group.iconUrl) {
      group.iconUrl = safeIconUrl(metadata.icon_url)
        || safeIconUrl(plan.providerIconUrl)
        || safeIconUrl(brand?.iconUrl);
    }
    group.plans.push(plan);
  }
  for (const group of grouped.values()) {
    group.plans = sortPlansBySortOrder(group.plans);
  }
  return grouped;
}

function renderHeroBanner() {
  return `
    <div class="cn-hero-banner" role="complementary" aria-label="国内站价值主张">
      <div class="cn-hero-banner__points">
        <span class="cn-hero-point"><span aria-hidden="true">¥</span>人民币充值</span>
        <span class="cn-hero-point"><span aria-hidden="true">□</span>可开发票</span>
        <span class="cn-hero-point"><span aria-hidden="true">◈</span>国内网络直连</span>
      </div>
      <a class="cn-hero-banner__intl" href="https://www.creditsplan.com/" target="_blank" rel="noopener noreferrer">海外套餐？前往 creditsplan.com →</a>
    </div>
  `;
}

function initPlansBackTop(workbench) {
  const button = els.codingPlanOverview.querySelector('#plansBackTop');
  if (!button || !workbench) return;

  const syncVisibility = () => {
    const rect = workbench.getBoundingClientRect();
    button.classList.toggle('is-visible', rect.top < -160 && rect.bottom > 160);
  };
  button.addEventListener('click', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    workbench.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
  });
  window.addEventListener('scroll', syncVisibility, { passive: true });
  window.addEventListener('resize', syncVisibility);
  syncVisibility();
}

function renderCodingPlanOverview(plans, providerInfo = {}) {
  if (!els.codingPlanOverview) return;
  const displayablePlans = filterPlansByProviderInfo(plans, providerInfo, PROVIDER_NAME_MAP);
  const grouped = groupPlansByBrand(displayablePlans, providerInfo);
  const visibleBrands = [...grouped.values()]
    .sort((a, b) => a.sortOrder - b.sortOrder);
  const counts = { all: displayablePlans.length, free: filterFreePlans(displayablePlans).length };

  els.codingPlanOverview.innerHTML = `
    <section class="plans-workbench" aria-labelledby="codingPlanTitle">
      <div class="workbench-head">
        <div class="workbench-intro">
          <p class="workbench-kicker">AI 开发者订阅决策平台</p>
          <h1 id="codingPlanTitle" class="workbench-title">国内 AI Coding 套餐对比与决策</h1>
          <p class="workbench-summary">结构化比较价格、额度、模型与国内使用条件；追踪价格变化，保留官方来源和核对日期，帮你更快完成工具选型与成本决策。真实价格请以厂商官网为准。</p>
        </div>
        <div class="workbench-meta">
          <span>${displayablePlans.length} 条记录</span>
          <span>${visibleBrands.length} 个品牌</span>
        </div>
      </div>
      ${renderHeroBanner()}
      <div class="workbench-body">
        <div id="brandFilterBar" class="brand-filter-bar">
          <div id="brandTabs" class="brand-tab-list">
            ${VIRTUAL_TABS.map(tab => `
              <button type="button" data-brand="${tab.id}" data-brand-label="${escapeHtml(tab.label)}" class="brand-tab${tab.id === 'all' ? ' is-active' : ''}">
                <span>${escapeHtml(tab.label)}</span>
                ${counts[tab.id] > 0 ? `<span class="brand-count">${counts[tab.id]}</span>` : ''}
              </button>
            `).join('')}
            <span class="brand-divider"></span>
            ${visibleBrands.map(brand => {
              return `<button type="button" data-brand="${escapeHtml(brand.id)}" data-brand-label="${escapeHtml(brand.label)}" class="brand-tab">
                ${renderBrandIcon(brand.iconUrl, brand.label, 'brand-icon brand-icon--tab')}
                <span>${escapeHtml(brand.label)}</span>
                <span class="brand-count">${brand.plans.length}</span>
              </button>`;
            }).join('')}
          </div>
        </div>
        <div id="brandDetail" class="brand-detail">
          ${renderAllPlansDualView(displayablePlans, '', providerInfo)}
        </div>
      </div>
    </section>
    <button id="plansBackTop" class="plans-back-top" type="button" aria-label="返回套餐列表顶部" title="返回顶部">
      <span aria-hidden="true">↑</span>
    </button>
  `;

  const workbench = els.codingPlanOverview.querySelector('.plans-workbench');
  const brandTabs = els.codingPlanOverview.querySelector('#brandTabs');
  const detail = els.codingPlanOverview.querySelector('#brandDetail');
  initPlansBackTop(workbench);

  let currentPlans = displayablePlans;
  let activeBrandId = 'all';
  let selectedPlanKey = '';
  const expandedProviders = new Set();
  const renderCurrentView = () => {
    detail.innerHTML = renderAllPlansDualView(
      currentPlans,
      selectedPlanKey,
      providerInfo,
      expandedProviders,
      activeBrandId !== 'all'
    );
  };
  const resetViewState = () => {
    clearPlanTableFilter();
    selectedPlanKey = '';
    expandedProviders.clear();
  };

  const renderFilteredView = () => {
    expandedProviders.clear();
    renderCurrentView();
  };

  bindPlanTableFilters(detail, () => currentPlans, renderFilteredView, key => {
    selectedPlanKey = selectedPlanKey === key ? '' : key;
    renderCurrentView();
  });
  detail.addEventListener('click', event => {
    const toggle = event.target.closest('[data-plan-group-toggle]');
    if (!toggle) return;
    const provider = toggle.dataset.planGroupToggle;
    if (expandedProviders.has(provider)) expandedProviders.delete(provider);
    else expandedProviders.add(provider);
    renderCurrentView();
  });
  brandTabs.addEventListener('click', event => {
    const button = event.target.closest('.brand-tab');
    if (!button) return;
    const brandId = button.dataset.brand;
    resetViewState();
    activeBrandId = brandId;
    brandTabs.querySelectorAll('.brand-tab').forEach(tab => tab.classList.remove('is-active'));
    button.classList.add('is-active');

    if (brandId === 'all') currentPlans = displayablePlans;
    else if (brandId === 'free') currentPlans = filterFreePlans(displayablePlans);
    else if (grouped.has(brandId)) currentPlans = grouped.get(brandId).plans;
    renderCurrentView();
  });
}

function renderPlanDataUnavailable(source) {
  if (!els.codingPlanOverview) return;
  const message = source === 'backend'
    ? '本地数据库接口 /api/models 当前不可用，请确认 public-api 已启动并连接数据库。'
    : '部署包中的 data.json 当前不可用，请重新导出数据库快照并部署。';
  els.codingPlanOverview.innerHTML = `
    <section class="plans-workbench" aria-labelledby="codingPlanTitle">
      <div class="workbench-head">
        <div>
          <span id="codingPlanTitle" style="font-weight:bold">套餐数据暂不可用</span>
        </div>
      </div>
      <div class="workbench-body">
        <p class="text-sm text-slate-600 dark:text-slate-300">${message}</p>
      </div>
    </section>
  `;
}

async function initPlansPage() {
  initAppShell();
  const dataset = await loadPlanDataset();
  if (dataset.dataUnavailable) {
    renderPlanDataUnavailable(dataset.source);
    return;
  }
  renderCodingPlanOverview(dataset.plans, dataset.providerInfo || {});
}

initPlansPage();
