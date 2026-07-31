import { escapeHtml } from './render.js';
import { PROVIDER_NAME_MAP } from './shared/brands.js';
import {
  cleanValue,
  DATA_TRAINING_LABELS,
  displayNameForProvider,
  findPlanByKey,
  resolvePlanPrivacy,
  supportedModelDisplay
} from './shared/plan-utils.js';
import {
  EMPTY_TABLE_VALUE,
  createPlanTableFilterState,
  filterPlansByTableState,
  hasActivePlanTableFilter,
  planTablePriceValue
} from './shared/plan-table-utils.js';
import { planQuotaDisplay, planUnitPriceDisplay } from './shared/quota-utils.js';

let privacyProviderInfo = {};
export function setPlanTablePrivacyContext(providerInfo) {
  privacyProviderInfo = providerInfo || {};
}

function planDataTrainingLabel(plan) {
  const privacy = resolvePlanPrivacy(plan, privacyProviderInfo, PROVIDER_NAME_MAP);
  if (!privacy.training) return '待调研';
  return DATA_TRAINING_LABELS[privacy.training] || privacy.training;
}

// 计费单位标签：按 limit_type 归一为用户可直接比较的计量口径（跨平台口径不同，直接比数字无意义）
export const BILLING_UNIT_LABELS = {
  token: 'Token 计费',
  credits: '积分制',
  five_hours: '请求次数',
  weekly: '请求次数',
  monthly: '请求次数',
  undisclosed: '未公开'
};

export function planBillingUnitLabel(plan) {
  return BILLING_UNIT_LABELS[plan.limitType] || '未公开';
}

export const PLAN_TABLE_FILTER_COLUMNS = [
  { key: 'provider', label: '品牌', value: plan => displayNameForProvider(plan.provider) || EMPTY_TABLE_VALUE },
  { key: 'name', label: '套餐名称', value: plan => cleanValue(plan.name) || EMPTY_TABLE_VALUE },
  { key: 'monthlyPrice', label: '连续包月', value: plan => planTablePriceValue(plan.monthlyPrice) },
  { key: 'quarterlyPrice', label: '连续包季', value: plan => planTablePriceValue(plan.quarterlyPrice) },
  { key: 'annualPrice', label: '连续包年', value: plan => planTablePriceValue(plan.annualPrice) },
  { key: 'billingUnit', label: '计费单位', value: plan => planBillingUnitLabel(plan) },
  { key: 'quota', label: '额度', value: plan => planQuotaDisplay(plan)?.text || EMPTY_TABLE_VALUE },
  { key: 'unitPrice', label: '等效单价', value: plan => planUnitPriceDisplay(plan)?.text || EMPTY_TABLE_VALUE },
  { key: 'model', label: '代表模型', value: plan => supportedModelDisplay(plan) || EMPTY_TABLE_VALUE },
  { key: 'status', label: '状态', value: plan => cleanValue(plan.statusLabel) || EMPTY_TABLE_VALUE },
  { key: 'dataTraining', label: '数据训练', value: plan => planDataTrainingLabel(plan) },
  { key: 'verifiedAt', label: '核对日期', value: plan => cleanValue(plan.lastVerifiedAt) || '待核对' },
  { key: 'source', label: '来源', value: plan => plan.url ? '官网' : EMPTY_TABLE_VALUE }
];

let planTableFilterState = createPlanTableFilterState();
// “只看可购买”快捷开关（与列筛选独立，可叠加）
let availableOnly = false;
const collator = new Intl.Collator('zh-CN', { numeric: true, sensitivity: 'base' });

// 可购买判定：可用与抢购中均算可购买，排除售罄/下线/待确认
function planIsPurchasable(plan) {
  return plan.status === 'available' || plan.status === 'rush_sale'
    || plan.statusLabel === '可用' || plan.statusLabel === '可购买';
}

export function isAvailableOnlyActive() {
  return availableOnly;
}

export function toggleAvailableOnly() {
  availableOnly = !availableOnly;
}

function findPlanTableColumn(key) {
  return PLAN_TABLE_FILTER_COLUMNS.find(column => column.key === key);
}

function planTableColumnValue(plan, key) {
  const column = findPlanTableColumn(key);
  if (!column) return '';
  const value = String(column.value(plan) || '').trim();
  return value || EMPTY_TABLE_VALUE;
}

export function clearPlanTableFilter() {
  planTableFilterState = createPlanTableFilterState();
  availableOnly = false;
}

export function isPlanTableFilterActive() {
  return hasActivePlanTableFilter(planTableFilterState)
    && Boolean(findPlanTableColumn(planTableFilterState.column));
}

export function applyPlanTableFilter(plans) {
  let result = plans;
  if (availableOnly) result = result.filter(planIsPurchasable);
  if (isPlanTableFilterActive()) {
    result = filterPlansByTableState(result, planTableFilterState, planTableColumnValue);
  }
  return result;
}

// “只看可购买”开关按钮已移入筛选栏（plans-page.js），此处仅在开关激活时显示过滤计数
export function renderPlanTableQuickFilters(filteredPlans, plans) {
  if (!availableOnly) return '';
  return `
    <div class="plan-table-quick-filters">
      <span class="plan-table-filter-count">只看可购买：${filteredPlans.length} / ${plans.length} 条</span>
    </div>
  `;
}

function planTableFilterOptions(plans, column) {
  const counts = new Map();
  for (const plan of plans) {
    const value = planTableColumnValue(plan, column.key);
    counts.set(value, (counts.get(value) || 0) + 1);
  }
  return Array.from(counts.entries())
    .map(([value, count]) => ({ value, count }))
    .sort((a, b) => {
      if (a.value === EMPTY_TABLE_VALUE && b.value !== EMPTY_TABLE_VALUE) return 1;
      if (b.value === EMPTY_TABLE_VALUE && a.value !== EMPTY_TABLE_VALUE) return -1;
      return collator.compare(a.value, b.value);
    });
}

export function renderPlanTableFilterHeader(column, plans) {
  const isActive = planTableFilterState.column === column.key && !!planTableFilterState.value;
  const options = planTableFilterOptions(plans, column);
  return `
    <th scope="col" class="plan-column-filter break-words px-3 py-3 text-left font-semibold text-slate-900 dark:text-white">
      <button type="button" class="plan-column-filter-trigger${isActive ? ' is-active' : ''}" data-plan-filter-column="${escapeHtml(column.key)}" aria-haspopup="menu" aria-expanded="false" title="筛选${escapeHtml(column.label)}">
        <span class="plan-column-filter-label">${escapeHtml(column.label)}</span>
        <span class="plan-column-filter-caret" aria-hidden="true"></span>
      </button>
      <div class="plan-column-filter-menu" data-plan-filter-menu="${escapeHtml(column.key)}" role="menu" hidden>
        <button type="button" class="plan-column-filter-option${isActive ? '' : ' is-active'}" data-plan-filter-value="">
          <span class="plan-column-filter-option-label">全部</span>
          <span class="plan-column-filter-option-count">${plans.length}</span>
        </button>
        ${options.map(option => `
          <button type="button" class="plan-column-filter-option${isActive && option.value === planTableFilterState.value ? ' is-active' : ''}" data-plan-filter-value="${escapeHtml(option.value)}">
            <span class="plan-column-filter-option-label">${escapeHtml(option.value)}</span>
            <span class="plan-column-filter-option-count">${option.count}</span>
          </button>
        `).join('')}
      </div>
    </th>
  `;
}

export function renderPlanTableFilterSummary(filteredPlans, plans) {
  if (!isPlanTableFilterActive()) return '';
  const column = findPlanTableColumn(planTableFilterState.column);
  return `
    <div class="plan-table-filter-summary">
      <span class="plan-table-filter-chip">
        <span>${escapeHtml(column.label)}</span>
        <strong>${escapeHtml(planTableFilterState.value)}</strong>
      </span>
      <span class="plan-table-filter-count">${filteredPlans.length} / ${plans.length} 条</span>
      <button type="button" class="plan-table-filter-clear" data-plan-filter-clear>清除</button>
    </div>
  `;
}

function closePlanColumnFilterMenus(root) {
  if (!root) return;
  root.querySelectorAll('.plan-column-filter-menu').forEach(menu => {
    menu.hidden = true;
  });
  root.querySelectorAll('[data-plan-filter-column]').forEach(button => {
    button.setAttribute('aria-expanded', 'false');
  });
}

export function bindPlanTableFilters(detail, getPlans, renderCurrentView, selectPlan) {
  detail.addEventListener('click', event => {
    const trigger = event.target.closest('[data-plan-filter-column]');
    if (trigger && detail.contains(trigger)) {
      const menu = trigger.closest('.plan-column-filter')?.querySelector('.plan-column-filter-menu');
      if (!menu) return;
      const wasOpen = !menu.hidden;
      closePlanColumnFilterMenus(detail);
      if (!wasOpen) {
        menu.hidden = false;
        trigger.setAttribute('aria-expanded', 'true');
      }
      return;
    }

    const option = event.target.closest('[data-plan-filter-value]');
    if (option && detail.contains(option)) {
      const column = option.closest('[data-plan-filter-menu]');
      const value = option.dataset.planFilterValue || '';
      planTableFilterState = column && value
        ? createPlanTableFilterState(column.dataset.planFilterMenu, value)
        : createPlanTableFilterState();
      renderCurrentView();
      return;
    }

    const clear = event.target.closest('[data-plan-filter-clear]');
    if (clear && detail.contains(clear)) {
      clearPlanTableFilter();
      renderCurrentView();
      return;
    }

    const planTrigger = event.target.closest('[data-plan-key]');
    if (planTrigger && detail.contains(planTrigger) && !event.target.closest('a')) {
      const key = planTrigger.dataset.planKey || '';
      if (findPlanByKey(getPlans(), key)) selectPlan(key);
      return;
    }

    if (!event.target.closest('.plan-column-filter')) closePlanColumnFilterMenus(detail);
  });

  detail.addEventListener('keydown', event => {
    const planTrigger = event.target.closest('[data-plan-key]');
    if (!planTrigger || !detail.contains(planTrigger) || event.target.closest('a')) return;
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    const key = planTrigger.dataset.planKey || '';
    if (findPlanByKey(getPlans(), key)) selectPlan(key);
  });

  document.addEventListener('click', event => {
    if (!detail.contains(event.target)) closePlanColumnFilterMenus(detail);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closePlanColumnFilterMenus(detail);
  });
}
