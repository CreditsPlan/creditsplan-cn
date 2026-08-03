import { escapeHtml, safeExternalUrl } from './render.js';
import { PROVIDER_NAME_MAP } from './shared/brands.js';
import {
  currencySymbol,
  DATA_TRAINING_LABELS,
  displayNameForProvider,
  formatPriceNumber,
  getRiskDisplayText,
  hasDisplayPrice,
  optionalDetailText,
  privacyFreshness,
  resolvePlanPrivacy,
  supportedModelDisplay,
  verifiedFreshness
} from './shared/plan-utils.js';
import { planQuotaDisplay } from './shared/quota-utils.js';

export const PLAN_TYPE_LABELS = {
  coding_plan: 'Coding Plan',
  token_plan: 'Token Plan',
  agent_plan: 'Agent Plan',
  credits_plan: 'Credits Plan',
  api_package: '按量付费'
};

export function outboundTrackingAttributes(plan) {
  const planId = String(plan.planId || plan.plan_id || plan.raw?.planId || plan.raw?.plan_id || '').trim();
  const brand = String(
    plan.brand || plan.brandSlug || plan.brand_slug || plan.raw?.brand || plan.raw?.brand_slug || planId.split('.')[0] || ''
  ).trim();
  return `data-track="plan-out" data-plan-id="${escapeHtml(planId)}" data-brand="${escapeHtml(brand)}"`;
}

// affiliate 跳转层：配置了邀请码的套餐走站内 /go/{plan_id}（nginx 302 带码 URL），
// 其余保持官方直链；带码外跳按规范标注 rel="sponsored nofollow"。
export function purchaseLinkTarget(plan, planUrl) {
  const planId = String(plan.planId || plan.plan_id || plan.raw?.planId || plan.raw?.plan_id || '').trim();
  const hasAffiliate = plan.hasAffiliate === true || plan.raw?.has_affiliate === true;
  if (hasAffiliate && planId && /^[A-Za-z0-9._-]+$/.test(planId)) {
    return { href: `/go/${planId}`, rel: 'sponsored nofollow noopener noreferrer' };
  }
  return { href: planUrl, rel: 'noopener noreferrer nofollow' };
}

function addPlanExtraRow(rows, label, value, keepInline, wide, compactInline, nowrapValue) {
  const text = optionalDetailText(value);
  if (text) {
    rows.push({
      label,
      value: text,
      keepInline: keepInline || false,
      wide: wide || false,
      compactInline: compactInline || false,
      nowrapValue: nowrapValue || false
    });
  }
}

function notesWithoutTableDuplicates(plan) {
  const notes = optionalDetailText(plan.notes);
  if (!notes) return '';
  const resetRule = optionalDetailText(plan.resetRule);
  if (resetRule && notes.includes(resetRule)) return '';
  const tableValues = [
    plan.name,
    displayNameForProvider(plan.provider),
    supportedModelDisplay(plan),
    plan.monthlyPrice,
    plan.quarterlyPrice,
    plan.quarterlyMonthlyPrice,
    plan.annualPrice,
    plan.annualMonthlyPrice,
    plan.statusLabel,
    plan.lastVerifiedAt
  ];
  for (const value of tableValues) {
    const text = optionalDetailText(value);
    if (!text) continue;
    if (notes.includes(text)) return '';
    const compactText = text.replace(/[\s年月季约/]/g, '');
    if (compactText.length >= 2 && notes.includes(compactText)) return '';
  }
  return notes;
}

// 首月特惠行：仅当首月价低于标准月价时展示（与月价相同无信息量，不展示）
export function firstMonthPriceText(plan) {
  const value = Number(plan.firstMonthPrice);
  if (!Number.isFinite(value) || value <= 0) return '';
  const monthly = Number(plan.monthlyPriceValue);
  if (Number.isFinite(monthly) && value >= monthly) return '';
  return `${currencySymbol(plan.monthlyCurrency || 'CNY')}${formatPriceNumber(value)}`;
}

function firstMonthLineHtml(plan) {
  const text = firstMonthPriceText(plan);
  return text
    ? `<div class="plan-price-subline plan-price-subline--first"><span>首月特惠</span><strong>${escapeHtml(text)}/月</strong></div>`
    : '';
}

export function renderPlanPriceBlock(plan) {
  const hasMonthlyPrice = hasDisplayPrice(plan.monthlyPrice);
  const hasQuarterlyPrice = hasDisplayPrice(plan.quarterlyPrice);
  const hasAnnualPrice = hasDisplayPrice(plan.annualPrice);
  if (!hasMonthlyPrice && !hasQuarterlyPrice && !hasAnnualPrice) return '';

  if (hasAnnualPrice) {
    const annualMainPrice = hasDisplayPrice(plan.annualMonthlyPrice) ? plan.annualMonthlyPrice : plan.annualPrice;
    const quarterlyLineHtml = hasQuarterlyPrice
      ? `<div class="plan-price-subline"><span>连续包季</span><strong>${escapeHtml(plan.quarterlyPrice)}</strong></div>`
      : '';
    const originalMonthlyHtml = hasMonthlyPrice
      ? `<span class="plan-price-original">${escapeHtml(plan.monthlyPrice)}</span>`
      : '';
    const monthlyLineHtml = hasMonthlyPrice
      ? `<div class="plan-price-subline"><span>连续包月</span><strong>${escapeHtml(plan.monthlyPrice)}</strong></div>`
      : '';
    return `
      <div class="plan-price-block">
        <div class="plan-price-mainline">
          <span class="plan-price-label">连续包年</span>
          <span class="plan-price-main">${escapeHtml(annualMainPrice)}</span>
          ${originalMonthlyHtml}
        </div>
        <div class="plan-price-subline"><span>按年计费</span><strong>${escapeHtml(plan.annualPrice)}</strong></div>
        ${quarterlyLineHtml}
        ${monthlyLineHtml}
        ${firstMonthLineHtml(plan)}
      </div>`;
  }

  if (hasQuarterlyPrice) {
    const quarterlyMainPrice = hasDisplayPrice(plan.quarterlyMonthlyPrice) ? plan.quarterlyMonthlyPrice : plan.quarterlyPrice;
    const originalMonthlyHtml = hasMonthlyPrice
      ? `<span class="plan-price-original">${escapeHtml(plan.monthlyPrice)}</span>`
      : '';
    const monthlyLineHtml = hasMonthlyPrice
      ? `<div class="plan-price-subline"><span>连续包月</span><strong>${escapeHtml(plan.monthlyPrice)}</strong></div>`
      : '';
    return `
      <div class="plan-price-block">
        <div class="plan-price-mainline">
          <span class="plan-price-label">连续包季</span>
          <span class="plan-price-main">${escapeHtml(quarterlyMainPrice)}</span>
          ${originalMonthlyHtml}
        </div>
        <div class="plan-price-subline"><span>按季计费</span><strong>${escapeHtml(plan.quarterlyPrice)}</strong></div>
        ${monthlyLineHtml}
        ${firstMonthLineHtml(plan)}
      </div>`;
  }

  return `
    <div class="plan-price-block">
      <div class="plan-price-mainline">
        <span class="plan-price-label">连续包月</span>
        <span class="plan-price-main">${escapeHtml(plan.monthlyPrice)}</span>
      </div>
      ${firstMonthLineHtml(plan)}
    </div>`;
}

export function renderSelectedPlanDetail(plan, providerInfo = {}) {
  if (!plan) return '';
  const typeLabel = PLAN_TYPE_LABELS[plan.planType] || plan.planType || '';
  const rows = [];
  const hasRmb = plan.rmbRecharge && plan.rmbRecharge !== '待确认' && plan.rmbRecharge !== '请以官网为准';
  const hasInvoice = plan.invoice && plan.invoice !== '待确认' && plan.invoice !== '请以官网为准';
  const privacy = resolvePlanPrivacy(plan, providerInfo, PROVIDER_NAME_MAP);
  // 额度列已展示的字段不在展开详情中重复；包含调用量与 Token 上限内容重复时只保留一处
  const quotaField = (planQuotaDisplay(plan) || {}).field || '';
  const compactTokenLimit = optionalDetailText(plan.tokenLimit).replace(/\s+/g, '');
  const tokenLimitDuplicated = Boolean(compactTokenLimit)
    && optionalDetailText(plan.includedCalls).replace(/\s+/g, '').includes(compactTokenLimit);

  addPlanExtraRow(rows, '套餐类型', typeLabel, false, false, true);
  addPlanExtraRow(rows, '支持模型', (plan.supportedModelNames || []).join('、'), false, true);
  if (plan.firstMonthPrice != null) {
    const firstMonthPrice = Number(plan.firstMonthPrice);
    addPlanExtraRow(rows, '首月价格', Number.isFinite(firstMonthPrice)
      ? `${currencySymbol(plan.monthlyCurrency || 'CNY')}${formatPriceNumber(firstMonthPrice)}`
      : plan.firstMonthPrice);
  }
  if (plan.domesticPayment) addPlanExtraRow(rows, '国内支付', '支持', false, false, true);
  if (quotaField !== 'includedCalls') addPlanExtraRow(rows, '包含调用量', plan.includedCalls, false, false, true);
  // 合并五小时/周/月请求为一行多指标，防止换行撑高卡片
  const fiveHourText = optionalDetailText(plan.fiveHoursRequests);
  const weeklyText = optionalDetailText(plan.weeklyRequests);
  const monthlyText = quotaField === 'monthlyRequests' ? '' : optionalDetailText(plan.monthlyRequests);
  if (fiveHourText || weeklyText || monthlyText) {
    rows.push({
      label: '',
      value: '',
      keepInline: false,
      wide: false,
      compactInline: false,
      nowrapValue: false,
      isRequestsRow: true,
      fiveHourText,
      weeklyText,
      monthlyText
    });
  }
  addPlanExtraRow(rows, '5小时实测 Tokens', plan.measuredFiveHoursTokens);
  addPlanExtraRow(rows, '周实测 Tokens', plan.measuredWeeklyTokens);
  addPlanExtraRow(rows, '月实测 Tokens', plan.measuredMonthlyTokens);
  if (quotaField !== 'tokenLimit' && !tokenLimitDuplicated) addPlanExtraRow(rows, 'Token上限', plan.tokenLimit);
  addPlanExtraRow(rows, '权益', plan.benefits ? plan.benefits.replace(/\n/g, '；') : undefined);
  addPlanExtraRow(rows, '输入价格', plan.modelInputPrice);
  addPlanExtraRow(rows, '输出价格', plan.modelOutputPrice);
  if (plan.monthlyCurrency === 'USD') {
    addPlanExtraRow(rows, '支付币种', plan.monthlyCurrencyLabel || '美元', true);
  } else if (hasRmb) {
    addPlanExtraRow(rows, '人民币充值', plan.rmbRecharge);
  }
  if (hasInvoice) addPlanExtraRow(rows, '发票支持', plan.invoice, true);
  addPlanExtraRow(rows, 'Credits限制', plan.creditsLimit, true);
  addPlanExtraRow(rows, '并发限制', plan.concurrencyLimit);
  addPlanExtraRow(rows, '刷新规则', plan.resetRule, false, true);
  addPlanExtraRow(rows, '退款政策', plan.refundPolicy);
  addPlanExtraRow(rows, '评分', plan.rating);
  addPlanExtraRow(rows, '标签', plan.tags);
  addPlanExtraRow(rows, '适用场景', plan.suitableFor);
  addPlanExtraRow(rows, '适合', plan.recommendationText, false, true);
  addPlanExtraRow(rows, '注意', getRiskDisplayText(plan), false, true);
  if (privacy.training) {
    const trainingLabel = DATA_TRAINING_LABELS[privacy.training] || privacy.training;
    const privacyFresh = privacyFreshness(privacy.verifiedAt);
    const freshnessNote = privacyFresh.state === 'stale'
      ? `（${privacyFresh.date} 核对，待复核）`
      : (privacyFresh.state === 'fresh' ? `（${privacyFresh.date} 核对）` : '');
    const baseLabel = privacy.note ? `${trainingLabel}（${privacy.note}）` : trainingLabel;
    addPlanExtraRow(rows, '数据训练', `${baseLabel}${freshnessNote}`, true);
  }
  addPlanExtraRow(rows, '训练关闭', privacy.optOut);
  addPlanExtraRow(rows, '数据保留', privacy.retention);
  addPlanExtraRow(rows, '备注', notesWithoutTableDuplicates(plan), false, true);

  const rowsHtml = rows.length ? rows.map(row => {
    if (row.isRequestsRow) {
      return `
      <div class="plan-extra-item plan-extra-requests-row">
        ${row.fiveHourText ? `<div class="plan-requests-metric">
          <span class="plan-extra-label">5小时请求</span>
          <span class="plan-extra-value">${escapeHtml(row.fiveHourText)}</span>
        </div>` : ''}
        ${row.weeklyText ? `<div class="plan-requests-metric">
          <span class="plan-extra-label">周请求</span>
          <span class="plan-extra-value">${escapeHtml(row.weeklyText)}</span>
        </div>` : ''}
        ${row.monthlyText ? `<div class="plan-requests-metric">
          <span class="plan-extra-label">月请求</span>
          <span class="plan-extra-value">${escapeHtml(row.monthlyText)}</span>
        </div>` : ''}
      </div>`;
    }
    const isLong = row.value.length > 40 || row.wide;
    const itemClass = row.keepInline
      ? 'plan-extra-item plan-extra-inline'
      : (isLong ? 'plan-extra-item plan-extra-wide' : `plan-extra-item ${row.compactInline ? 'plan-extra-compact-inline' : 'plan-extra-inline'}`);
    const nowrapClass = row.nowrapValue ? ' plan-extra-nowrap' : '';
    return `
    <div class="${itemClass}${nowrapClass}">
      <span class="plan-extra-label">${escapeHtml(row.label)}</span>
      <span class="plan-extra-value">${escapeHtml(row.value)}</span>
    </div>`;
  }).join('') : '<p class="plan-extra-empty">暂无表格外补充信息。</p>';
  const planUrl = safeExternalUrl(plan.url);
  const purchaseLink = purchaseLinkTarget(plan, planUrl);
  const verifiedFresh = verifiedFreshness(plan.lastVerifiedAt);
  const verifiedText = verifiedFresh.state === 'fresh'
    ? `官方页核实于 ${escapeHtml(verifiedFresh.date)}（${verifiedFresh.days === 0 ? '今日' : `${verifiedFresh.days} 天前`}）`
    : verifiedFresh.state === 'stale'
      ? `上次核实 ${escapeHtml(verifiedFresh.date)} · 超过 30 天，待复核`
      : '';
  const sourceMeta = verifiedText
    ? `数据来源：${escapeHtml(plan.sourceType || '后台维护')} · ${verifiedText}`
    : '';
  const privacyPolicyLink = privacy.policyUrl
    ? `<a href="${escapeHtml(privacy.policyUrl)}" target="_blank" rel="noopener noreferrer nofollow">隐私政策来源</a>`
    : '';
  const footerHtml = sourceMeta || planUrl || privacyPolicyLink
    ? `<div class="selected-plan-detail-footer">
        <span>${sourceMeta}</span>
        <span class="selected-plan-detail-footer-links">
          ${privacyPolicyLink}
          ${planUrl ? `<a href="${escapeHtml(purchaseLink.href)}" target="_blank" rel="${purchaseLink.rel}" ${outboundTrackingAttributes(plan)}>打开官网</a>` : ''}
        </span>
       </div>`
    : '';

  return `
    <section class="selected-plan-detail" aria-live="polite">
      <div class="plan-detail-header selected-plan-detail-header"></div>
      <div class="selected-plan-detail-body">
        <div class="plan-extra-list">
          ${rowsHtml}
        </div>
        ${footerHtml}
      </div>
    </section>
  `;
}
