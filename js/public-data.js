import { isLocalHostname, modelDataUrl } from './data-source.js';
import { VENDOR_NAMES } from './shared/brands.js';

const blockedNewsHosts = new Set(['x.com', 'www.x.com', 'twitter.com', 'www.twitter.com']);
const domesticPlanCategories = [];
const modelScenarios = [
  { id: 'low-cost', label: '低成本' },
  { id: 'long-context', label: '长上下文' },
  { id: 'multimodal', label: '多模态' },
  { id: 'enterprise-api', label: '企业 API' },
  { id: 'personal-use', label: '个人使用' }
];
export { domesticPlanCategories, modelScenarios };

export async function loadModelDataset() {
  const isLocal = isLocalHostname();
  const source = isLocal ? 'backend' : 'static';
  const payload = await fetchJson(modelDataUrl());
  const dataset = normalizeModelDataset(payload, source);

  return {
    ...dataset,
    dataUnavailable: !payload
  };
}

export async function loadPlanDataset() {
  const dataset = await loadModelDataset();
  const plans = dataset.models.flatMap(model => normalizePlansFromModel(model));
  return { ...dataset, plans, providerInfo: dataset.providerInfo || {} };
}

function normalizeModelDataset(payload, source) {
  if (payload && Array.isArray(payload.models)) {
    const models = payload.models.map(model => normalizeBackendModel(model, source));
    if (models.length) {
      return {
        source,
        lastUpdated: payload.last_updated || latestDate(models.map(model => model.updatedAt)),
        models,
        rawModels: payload.models,
        providerInfo: payload.provider_info || {}
      };
    }
  }

  return {
    source,
    lastUpdated: payload?.last_updated || 'unknown',
    models: [],
    rawModels: [],
    providerInfo: payload?.provider_info || {}
  };
}

export async function loadUpdateDataset() {
  const source = 'aihot';
  const payload = await fetchJson('/aihot-api/items?mode=selected&take=100');
  const backendItems = Array.isArray(payload?.items) ? payload.items : [];
  const updates = backendItems
    .map(normalizeBackendUpdate)
    .filter(isRelevantUpdate)
    .filter(isDisplayableUpdate);

  if (updates.length) {
    updates.forEach((item, i) => { item.heatScore = computeHeatScore(item, i); });
    return { source, updates };
  }

  return { source, updates: [] };
}

async function fetchJson(url) {
  try {
    const response = await fetch(url, { cache: 'no-store', headers: { Accept: 'application/json' } });
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}

function normalizeBackendModel(model, source) {
  const capabilities = Array.isArray(model.capabilities) ? model.capabilities : [];
  const inputPriceValue = numberOrNull(model.input_price);
  const contextLengthValue = numberOrNull(model.context_length);
  const notes = compactText(model.plan_summary, model.access_notes, model.notes);
  const scenarios = inferScenarios(model, inputPriceValue, contextLengthValue, capabilities);

  return {
    id: stringValue(model.id),
    vendor: stringValue(model.provider, '待更新'),
    providerIconUrl: stringValue(model.provider_icon_url, model.icon_url || ''),
    modelName: stringValue(model.name, '待更新'),
    inputPrice: formatPrice(model.input_price),
    outputPrice: formatPrice(model.output_price),
    contextLength: formatContext(model.context_length),
    multimodal: capabilities.includes('vision') ? '支持' : '待确认',
    apiSupport: '支持',
    rmbRecharge: stringValue(model.rmb_recharge_support, '请以官网为准'),
    invoice: stringValue(model.invoice_support, '请以官网为准'),
    rmbRechargeRaw: model.rmb_recharge_support ?? null,
    invoiceRaw: model.invoice_support ?? null,
    accessLevel: stringValue(model.access_level, ''),
    marketRegion: stringValue(model.market_region, ''),
    marketRegionLabel: stringValue(model.market_region_label, ''),
    scenarios,
    suitableFor: stringValue(model.suitable_for, notes || '请以官网为准'),
    updatedAt: stringValue(model.last_updated, model.release_date || '待更新'),
    sourceUrl: stringValue(model.docs_url, model.plan_url || ''),
    packagePlans: Array.isArray(model.package_plans) ? model.package_plans : [],
    source,
    raw: model
  };
}

function normalizePlansFromModel(model) {
  const rawPlans = model.packagePlans || [];
  return rawPlans
    .filter(plan => plan.status !== 'discontinued')
    .map(plan => {
      const monthlyPriceValue = numberOrNull(plan.monthly_price);
      const quarterlyPriceValue = numberOrNull(plan.quarterly_price);
      const annualPriceValue = numberOrNull(plan.annual_price);
      const monthlyCurrency = inferMonthlyCurrency(plan, model);
      return {
        id: stringValue(plan.id, `${model.id}-plan`),
        planId: stringValue(plan.planId, plan.plan_id || ''),
        brand: stringValue(plan.brand, plan.brand_slug || ''),
        name: stringValue(plan.name, '待更新套餐'),
        provider: stringValue(plan.provider, model.vendor),
        providerIconUrl: stringValue(plan.provider_icon_url, plan.icon_url, model.providerIconUrl),
        modelName: model.modelName,
        modelId: stringValue(plan.model_id, model.id),
        status: stringValue(plan.status, 'unknown'),
        statusLabel: stringValue(plan.status_label, '待确认'),
        url: stringValue(plan.url, ''),
        monthlyPrice: formatMonthlyPrice(plan.monthly_price, monthlyCurrency),
        monthlyPriceValue,
        monthlyCurrency,
        monthlyCurrencyLabel: monthlyCurrency === 'USD' ? '美元' : '人民币',
        quarterlyPrice: formatPeriodPrice(plan.quarterly_price, monthlyCurrency, '季'),
        quarterlyPriceValue,
        quarterlyMonthlyPrice: quarterlyPriceValue != null
          ? formatMonthlyPrice(quarterlyPriceValue / 3, monthlyCurrency)
          : '',
        quarterlyMonthlyPriceValue: quarterlyPriceValue != null ? quarterlyPriceValue / 3 : null,
        annualPrice: formatPeriodPrice(plan.annual_price, monthlyCurrency, '年'),
        annualPriceValue,
        annualMonthlyPrice: annualPriceValue != null
          ? formatMonthlyPrice(annualPriceValue / 12, monthlyCurrency)
          : '',
        annualMonthlyPriceValue: annualPriceValue != null ? annualPriceValue / 12 : null,
        includedCalls: stringValue(plan.included_calls, ''),
        notes: stringValue(plan.notes, ''),
        planType: stringValue(plan.plan_type, inferPlanCategory(plan, model)),
        category: inferPlanCategory(plan, model),
        rmbRecharge: model.rmbRecharge,
        invoice: model.invoice,
        rmbRechargeRaw: model.rmbRechargeRaw,
        invoiceRaw: model.invoiceRaw,
        accessLevel: model.accessLevel,
        marketRegion: model.marketRegion,
        marketRegionLabel: model.marketRegionLabel,
        firstMonthPrice: plan.first_month_price != null ? plan.first_month_price : null,
        fiveHoursRequests: stringValue(plan.five_hours_requests, ''),
        weeklyRequests: stringValue(plan.weekly_requests, ''),
        monthlyRequests: stringValue(plan.monthly_requests, ''),
        measuredFiveHoursTokens: stringValue(plan.measured_five_hours_tokens, ''),
        measuredWeeklyTokens: stringValue(plan.measured_weekly_tokens, ''),
        measuredMonthlyTokens: stringValue(plan.measured_monthly_tokens, ''),
        tokenLimit: stringValue(plan.token_limit, ''),
        supportedModels: stringValue(plan.supported_models, ''),
        benefits: stringValue(plan.benefits, ''),
        rating: stringValue(plan.rating, ''),
        tags: stringValue(plan.tags, ''),
        sourceUrl: stringValue(plan.source_url, ''),
        lastVerifiedAt: stringValue(plan.last_verified_at, ''),
        refundPolicy: stringValue(plan.refund_policy, ''),
        billingCycle: stringValue(plan.billing_cycle, ''),
        creditsLimit: stringValue(plan.credits_limit, ''),
        concurrencyLimit: stringValue(plan.concurrency_limit, ''),
        resetRule: stringValue(plan.reset_rule, ''),
        limitType: stringValue(plan.limit_type, inferLimitType(plan)),
        dataStatus: stringValue(plan.data_status, inferDataStatus(plan)),
        confidenceScore: plan.confidence_score != null ? plan.confidence_score : null,
        sourceType: stringValue(plan.source_type, ''),
        toolCompatibility: safeParseJson(plan.tool_compatibility_json, {}),
        modelMultiplier: safeParseJson(plan.model_multiplier_json, {}),
        derivedMetrics: safeParseJson(plan.derived_metrics_json, {}),
        measuredMetrics: safeParseJson(plan.measured_metrics_json, {}),
        risk: safeParseJson(plan.risk_json, {}),
        recommendation: safeParseJson(plan.recommendation_json, {}),
        changeSummary: safeParseJson(plan.change_summary_json, {}),
        linkType: stringValue(plan.link_type, 'official'),
        domesticPayment: plan.domestic_payment === true || plan.domestic_payment === 1,
        hasFirstMonthDiscount: plan.has_first_month_discount === true || plan.has_first_month_discount === 1,
        recommendationText: stringValue(plan.recommendation_text, ''),
        riskText: stringValue(plan.risk_text, ''),
        sortOrder: numberOrNull(plan.sort_order),

        raw: plan
      };
    });
}

const domesticKeywords = [
  'DeepSeek', '阿里云', '通义千问', '通义', '火山方舟', '火山引擎', '豆包',
  '智谱', 'GLM', 'Kimi', 'MiniMax', '百度千帆', '百度',
  '腾讯混元', '腾讯', '硅基流动', '阶跃星辰',
  '国内', '人民币', '充值', '发票', '实名', '备案', '工信部',
  '百炼', '千帆', '清言', '元宝'
];

function inferRegion(item) {
  const text = [
    item.title, item.title_zh, item.summary, item.summary_zh,
    item.source, item.description
  ].filter(Boolean).join(' ');
  const lower = text.toLowerCase();
  for (const kw of domesticKeywords) {
    if (lower.includes(kw.toLowerCase())) return 'domestic';
  }
  return 'international';
}

function computeHeatScore(item, index) {
  let score = 100 - index;
  const text = `${item.title || ''} ${item.summary || ''}`.toLowerCase();
  if (/发布|上线|launch|release/.test(text)) score += 20;
  if (/价格|降价|price/.test(text)) score += 15;
  if (/开源|open.?source/.test(text)) score += 10;
  const published = item.publishedAt || item.published_at || item.createdAt || '';
  if (published) {
    const diff = Date.now() - new Date(published).getTime();
    if (diff < 86400000) score += 30;
    else if (diff < 259200000) score += 15;
  }
  return score;
}

function formatRelativeTime(published) {
  if (!published || published === '待更新') return '';
  const date = new Date(published);
  if (isNaN(date.getTime())) return published;
  const diff = Date.now() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return '刚刚';
  if (minutes < 60) return `${minutes} 分钟前`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} 小时前`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} 天前`;
  if (days < 30) return `${Math.floor(days / 7)} 周前`;
  return date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' });
}

function normalizeBackendUpdate(item) {
  const title = stringValue(item.title, item.title_zh || '未命名动态');
  const summary = stringValue(item.summary, item.summary_zh || item.description || '');
  const text = `${title} ${summary}`;
  const published = stringValue(item.publishedAt, item.published_at || item.createdAt || '待更新');
  const region = inferRegion(item);
  return {
    id: stringValue(item.id, title),
    title,
    summary: summary || '该条动态暂无摘要，请打开来源链接核对。',
    source: sourceName(item.source),
    type: inferUpdateType(item.category, text),
    publishedAt: published,
    vendors: extractVendors(text),
    detailUrl: stringValue(item.url, item.sourceUrl || item.link || ''),
    region,
    regionLabel: region === 'domestic' ? '国内' : '国际',
    heatScore: 0,
    relativeTime: formatRelativeTime(published),
    sourceMode: 'backend',
    raw: item
  };
}

function isRelevantUpdate(item) {
  const text = `${item.title} ${item.summary} ${item.type}`.toLowerCase();
  if (item.type === '模型发布' || item.type === 'API 上线' || item.type === '开源模型发布') return true;
  return /价格|套餐|api|上下文|context|计费|充值|发票|开源|模型/.test(text);
}

function isDisplayableUpdate(item) {
  return !isBlockedNewsUrl(item.detailUrl);
}

function isBlockedNewsUrl(url) {
  if (!url) return false;
  try {
    return blockedNewsHosts.has(new URL(url).hostname.toLowerCase());
  } catch {
    return false;
  }
}

function inferScenarios(model, inputPrice, contextLength, capabilities) {
  const text = compactText(model.name, model.provider, model.notes, model.plan_summary, model.access_notes).toLowerCase();
  const scenarios = new Set(['enterprise-api']);
  if (inputPrice != null && inputPrice <= 2) scenarios.add('low-cost');
  if (contextLength != null && contextLength >= 200000) scenarios.add('long-context');
  if (capabilities.includes('vision')) scenarios.add('multimodal');
  if (/个人|会员|订阅|聊天|kimi|豆包/.test(text)) scenarios.add('personal-use');
  return Array.from(scenarios);
}

function safeParseJson(value, fallback) {
  if (!value || typeof value !== 'string') return value || fallback;
  try { return JSON.parse(value); } catch { return fallback; }
}

function inferLimitType(plan) {
  if (plan.five_hours_requests) return 'five_hours';
  if (plan.weekly_requests) return 'weekly';
  if (plan.monthly_requests) return 'monthly';
  if (plan.token_limit) return 'token';
  if (plan.credits_limit) return 'credits';
  return 'undisclosed';
}

function inferDataStatus(plan) {
  if (plan.last_verified_at) return 'verified';
  if (plan.measured_monthly_tokens || plan.measured_weekly_tokens) return 'measured';
  return 'pending';
}

function inferPlanCategory(plan, model) {
  const text = compactText(plan.name, plan.provider, plan.notes, model.vendor, model.modelName).toLowerCase();
  if (/聚合|路由|硅基|siliconflow/.test(text)) return 'aggregated_router';
  if (/会员|订阅|chat|清言|kimi|豆包/.test(text)) return 'personal_subscription';
  if (/maas|百炼|千帆|腾讯云|火山方舟|企业/.test(text)) return 'enterprise_maas';
  if (/开源|部署|私有化/.test(text)) return 'open_source_deploy';
  if (/coding|qoder|claude code|cursor|trae/.test(text)) return 'coding_plan';
  return 'coding_plan';
}

function inferMonthlyCurrency(plan, model) {
  const explicitCurrency = stringValue(plan.monthly_currency).toUpperCase();
  if (explicitCurrency === 'USD' || explicitCurrency === 'CNY') return explicitCurrency;

  const provider = stringValue(plan.provider, model.vendor);
  const providerKey = provider.toLowerCase();
  if (providerKey === 'qoder' || providerKey === 'qoder cn' || providerKey === 'byteplus' || providerKey === 'z.ai') return 'USD';

  const text = compactText(plan.name, provider, plan.url, plan.included_calls, plan.notes).toLowerCase();
  if (/\$|usd|美元|trae\.ai/.test(text)) return 'USD';
  return 'CNY';
}

function inferUpdateType(category, text) {
  if (/价格|计费|降价|涨价|费用/.test(text)) return '价格调整';
  if (/上下文|context/.test(text)) return '上下文长度升级';
  if (/套餐|会员|订阅|资源包/.test(text)) return '国内平台套餐变化';
  if (/开源|open.?source|open weight/.test(text.toLowerCase())) return '开源模型发布';
  if (/api|接口|上线|开放/.test(text.toLowerCase())) return 'API 上线';
  if (category === 'ai-products') return 'API 上线';
  return '模型发布';
}

function extractVendors(text) {
  const lower = String(text || '').toLowerCase();
  const found = VENDOR_NAMES.filter(name => lower.includes(name.toLowerCase()));
  return found.length ? Array.from(new Set(found)) : [];
}

function sourceName(source) {
  if (!source) return '后台维护';
  if (typeof source === 'string') return source;
  return stringValue(source.name, source.title || source.id || '后台维护');
}

function stringValue(...values) {
  const value = values.find(item => item != null && String(item).trim());
  return value == null ? '' : String(value).trim();
}

function numberOrNull(value) {
  if (value == null || value === '') return null;
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function formatPrice(value) {
  const number = numberOrNull(value);
  if (number == null) return stringValue(value, '待更新');
  return `\u00a5${number.toLocaleString('zh-CN', { maximumFractionDigits: 4 })}/百万 tokens`;
}

function formatMonthlyPrice(value, currency = 'CNY') {
  return formatPeriodPrice(value, currency, '月');
}

function formatPeriodPrice(value, currency = 'CNY', period = '月') {
  const number = numberOrNull(value);
  if (number == null) return '请以官网为准';
  const symbol = currency === 'USD' ? '$' : '\u00a5';
  return `${symbol}${number.toLocaleString('zh-CN', { maximumFractionDigits: 2 })}/${period}`;
}

function formatContext(value) {
  const number = numberOrNull(value);
  if (number == null) return stringValue(value, '请以官网为准');
  if (number >= 1000000) return `${(number / 1000000).toLocaleString('zh-CN', { maximumFractionDigits: 1 })}M tokens`;
  if (number >= 1000) return `${(number / 1000).toLocaleString('zh-CN', { maximumFractionDigits: 0 })}K tokens`;
  return `${number.toLocaleString('zh-CN')} tokens`;
}

function compactText(...values) {
  return values.filter(value => value != null && String(value).trim()).join(' ');
}

function latestDate(values) {
  return values.find(value => value && value !== '待更新') || '待更新';
}
