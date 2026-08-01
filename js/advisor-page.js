// advisor-page.js — 独立选购助手页（/advisor/）：复用 plan-advisor 的 createAdvisorApp，
// 筛选条件同步到 URL query（families/usage/budget），复制链接即可分享当前结果。
// 页面外壳（header/footer/主题）由 HEAD_COMMON 中 app.js 的 data-auto-init 完成。
import { createAdvisorApp } from './plan-advisor.js';
import { loadPlanDataset } from './public-data.js';
import { PROVIDER_NAME_MAP } from './shared/brands.js';
import { filterPlansByProviderInfo } from './shared/plan-utils.js';

function stateFromLocation() {
  const params = new URLSearchParams(location.search);
  const families = (params.get('families') || '').split(',').map(item => item.trim()).filter(Boolean);
  const usage = Number(params.get('usage'));
  const budget = Number(params.get('budget'));
  return {
    families,
    usage: Number.isFinite(usage) && usage > 0 ? usage : undefined,
    budget: Number.isFinite(budget) && budget > 0 ? budget : undefined
  };
}

function syncStateToLocation(state) {
  const params = new URLSearchParams();
  if (state.families.size) params.set('families', [...state.families].join(','));
  if (state.usage) params.set('usage', String(state.usage));
  if (state.budget != null) params.set('budget', String(state.budget));
  const query = params.toString();
  history.replaceState(null, '', `${location.pathname}${query ? `?${query}` : ''}`);
}

// 与 plans-page.js 的数据不可用提示保持同一口径
function renderDataUnavailable(root, source) {
  const message = source === 'backend'
    ? '本地数据库接口 /api/models 当前不可用，请确认 public-api 已启动并连接数据库。'
    : '部署包中的 data.json 当前不可用，请重新导出数据库快照并部署。';
  root.innerHTML = `<p class="plan-advisor-empty">${message}</p>`;
}

async function initAdvisorPage() {
  const root = document.getElementById('advisorRoot');
  if (!root) return;
  const dataset = await loadPlanDataset();
  if (dataset.dataUnavailable) {
    renderDataUnavailable(root, dataset.source);
    return;
  }
  const providerInfo = dataset.providerInfo || {};
  // 与首页弹窗同口径：仅参与已注册品牌的可展示套餐
  const plans = filterPlansByProviderInfo(dataset.plans, providerInfo, PROVIDER_NAME_MAP);
  createAdvisorApp({
    root,
    plans,
    providerInfo,
    modelCatalog: dataset.modelCatalog || [],
    initialState: stateFromLocation(),
    onStateChange: syncStateToLocation
  });
}

initAdvisorPage();
