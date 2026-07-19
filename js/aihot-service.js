const BASE_URL = '/aihot-api';
const REQUEST_TIMEOUT_MS = 10000;
const _UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36 aihot-skill/0.2.0';

const CATEGORY_LABELS = {
  'ai-models': '模型发布/更新',
  'ai-products': '产品发布/更新',
  'industry': '行业动态',
  'paper': '论文研究',
  'tip': '技巧与观点'
};

export { CATEGORY_LABELS };

async function apiFetch(path, params = {}) {
  const url = new URL(`${BASE_URL}${path}`, location.origin);
  for (const [key, value] of Object.entries(params)) {
    if (value != null && value !== '') url.searchParams.set(key, String(value));
  }
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const res = await fetch(url.toString(), {
      cache: 'no-store',
      headers: { 'Accept': 'application/json' },
      signal: controller.signal
    });
    if (!res.ok) throw new Error(`API ${res.status}: ${res.statusText}`);
    return await res.json();
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function fetchAiHotItems({ mode = 'selected', take = 50, category, q, since, cursor } = {}) {
  const params = { mode, take };
  if (category) params.category = category;
  if (q) params.q = q;
  if (since) params.since = since;
  if (cursor) params.cursor = cursor;
  const data = await apiFetch('/items', params);
  return {
    items: Array.isArray(data?.items) ? data.items : (Array.isArray(data) ? data : []),
    nextCursor: data?.nextCursor || null,
    total: data?.total ?? null
  };
}

export async function fetchAiHotDaily() {
  return apiFetch('/daily');
}

export async function fetchAiHotDailyByDate(date) {
  if (!date) return fetchAiHotDaily();
  return apiFetch(`/daily/${date}`);
}

export async function fetchAiHotDailies(take = 30) {
  const data = await apiFetch('/dailies', { take });
  return Array.isArray(data?.items) ? data.items : (Array.isArray(data?.dailies) ? data.dailies : (Array.isArray(data) ? data : []));
}

export function formatPublishedTime(isoStr) {
  if (!isoStr) return '';
  const date = new Date(isoStr);
  if (isNaN(date.getTime())) return '';
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const target = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const dayDiff = Math.floor((today - target) / 86400000);
  const hhmm = date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', hour12: false });
  if (dayDiff === 0) return `今天 ${hhmm}`;
  if (dayDiff === 1) return `昨天 ${hhmm}`;
  if (dayDiff < 7) return `${dayDiff}天前 ${hhmm}`;
  return `${date.getMonth() + 1}月${date.getDate()}日 ${hhmm}`;
}

export function formatTimeOnly(isoStr) {
  if (!isoStr) return '';
  const date = new Date(isoStr);
  if (isNaN(date.getTime())) return '';
  return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', hour12: false });
}

export function getDateKey(isoStr) {
  if (!isoStr) return '未知日期';
  const date = new Date(isoStr);
  if (isNaN(date.getTime())) return '未知日期';
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const target = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const dayDiff = Math.floor((today - target) / 86400000);
  const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  if (dayDiff === 0) return `今天 ${date.getMonth() + 1}月${date.getDate()}日 ${weekdays[date.getDay()]}`;
  if (dayDiff === 1) return `昨天 ${date.getMonth() + 1}月${date.getDate()}日 ${weekdays[date.getDay()]}`;
  return `${date.getMonth() + 1}月${date.getDate()}日 ${weekdays[date.getDay()]}`;
}

export function getCategoryLabel(key) {
  return CATEGORY_LABELS[key] || key || '';
}

export function groupByDate(items) {
  const groups = new Map();
  for (const item of items) {
    const key = getDateKey(item.publishedAt);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(item);
  }
  return Array.from(groups, ([date, dateItems]) => ({ date, items: dateItems }));
}
