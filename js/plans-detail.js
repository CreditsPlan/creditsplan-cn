import { escapeHtml, safeExternalUrl } from './render.js';
import {
  currencySymbol,
  displayNameForProvider,
  formatPriceNumber,
  getRiskDisplayText,
  hasDisplayPrice,
  optionalDetailText,
  supportedModelDisplay
} from './shared/plan-utils.js';

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

function addPlanExtraRow(rows, label, value, keepInline) {
  const text = optionalDetailText(value);
  if (text) rows.push({ label, value: text, keepInline: keepInline || false });
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
      </div>`;
  }

  return `
    <div class="plan-price-block">
      <div class="plan-price-mainline">
        <span class="plan-price-label">连续包月</span>
        <span class="plan-price-main">${escapeHtml(plan.monthlyPrice)}</span>
      </div>
    </div>`;
}

export function renderSelectedPlanDetail(plan) {
  if (!plan) return '';
  const typeLabel = PLAN_TYPE_LABELS[plan.planType] || plan.planType || '';
  const rows = [];
  const hasRmb = plan.rmbRecharge && plan.rmbRecharge !== '待确认' && plan.rmbRecharge !== '请以官网为准';
  const hasInvoice = plan.invoice && plan.invoice !== '待确认' && plan.invoice !== '请以官网为准';

  addPlanExtraRow(rows, '套餐类型', typeLabel, true);
  addPlanExtraRow(rows, '支持模型', (plan.supportedModelNames || []).join('、'), true);
  if (plan.firstMonthPrice != null) {
    const firstMonthPrice = Number(plan.firstMonthPrice);
    addPlanExtraRow(rows, '首月价格', Number.isFinite(firstMonthPrice)
      ? `${currencySymbol(plan.monthlyCurrency || 'CNY')}${formatPriceNumber(firstMonthPrice)}`
      : plan.firstMonthPrice);
  }
  if (plan.domesticPayment) addPlanExtraRow(rows, '国内支付', '支持', true);
  addPlanExtraRow(rows, '包含调用量', plan.includedCalls, true);
  const fiveH = optionalDetailText(plan.fiveHoursRequests);
  const weekly = optionalDetailText(plan.weeklyRequests);
  if (fiveH || weekly) {
    const combined = [fiveH ? `5小时请求 ${fiveH}` : '', weekly ? `周请求 ${weekly}` : ''].filter(Boolean).join('  ·  ');
    addPlanExtraRow(rows, '请求频率', combined);
  }
  addPlanExtraRow(rows, '月请求', plan.monthlyRequests);
  addPlanExtraRow(rows, '5小时实测 Tokens', plan.measuredFiveHoursTokens);
  addPlanExtraRow(rows, '周实测 Tokens', plan.measuredWeeklyTokens);
  addPlanExtraRow(rows, '月实测 Tokens', plan.measuredMonthlyTokens);
  addPlanExtraRow(rows, 'Token上限', plan.tokenLimit);
  addPlanExtraRow(rows, '权益', plan.benefits);
  addPlanExtraRow(rows, '输入价格', plan.modelInputPrice);
  addPlanExtraRow(rows, '输出价格', plan.modelOutputPrice);
  if (plan.monthlyCurrency === 'USD') {
    addPlanExtraRow(rows, '支付币种', plan.monthlyCurrencyLabel || '美元');
  } else if (hasRmb) {
    addPlanExtraRow(rows, '人民币充值', plan.rmbRecharge);
  }
  if (hasInvoice) addPlanExtraRow(rows, '发票支持', plan.invoice);
  addPlanExtraRow(rows, 'Credits限制', plan.creditsLimit, true);
  addPlanExtraRow(rows, '并发限制', plan.concurrencyLimit);
  addPlanExtraRow(rows, '刷新规则', plan.resetRule);
  addPlanExtraRow(rows, '退款政策', plan.refundPolicy);
  addPlanExtraRow(rows, '评分', plan.rating);
  addPlanExtraRow(rows, '标签', plan.tags);
  addPlanExtraRow(rows, '适用场景', plan.suitableFor);
  addPlanExtraRow(rows, '适合', plan.recommendationText);
  addPlanExtraRow(rows, '注意', getRiskDisplayText(plan));
  addPlanExtraRow(rows, '备注', notesWithoutTableDuplicates(plan));

  const rowsHtml = rows.length ? rows.map(row => {
    const isLong = row.value.length > 40 || row.label === '刷新规则' || row.label === '备注' || row.label === '注意' || row.label === '适合';
    const itemClass = row.keepInline
      ? 'plan-extra-item plan-extra-inline'
      : (isLong ? 'plan-extra-item plan-extra-wide' : 'plan-extra-item plan-extra-inline');
    return `
    <div class="${itemClass}">
      <span class="plan-extra-label">${escapeHtml(row.label)}</span>
      <span class="plan-extra-value">${escapeHtml(row.value)}</span>
    </div>`;
  }).join('') : '<p class="plan-extra-empty">暂无表格外补充信息。</p>';
  const planUrl = safeExternalUrl(plan.url);
  const sourceMeta = plan.lastVerifiedAt
    ? `数据来源：${escapeHtml(plan.sourceType || '后台维护')} · 核对日期 ${escapeHtml(plan.lastVerifiedAt)}`
    : '';
  const footerHtml = sourceMeta || planUrl
    ? `<div class="selected-plan-detail-footer">
        <span>${sourceMeta}</span>
        ${planUrl ? `<a href="${escapeHtml(planUrl)}" target="_blank" rel="noopener noreferrer nofollow" ${outboundTrackingAttributes(plan)}>打开官网</a>` : ''}
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
