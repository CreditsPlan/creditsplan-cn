import { initAppShell } from './app.js';
import { initFitDescription } from './fit-description.js';
import { escapeHtml } from './render.js';

const kindLabels = {
  catalog: '套餐与品牌',
  data: '数据更新',
  feature: '站点功能',
};

// 路线图状态（按展示优先级排序）
const roadmapStatus = {
  in_progress: { label: '开发中', cls: 'progress' },
  planned: { label: '已规划', cls: 'planned' },
  evaluating: { label: '评估中', cls: 'evaluating' },
};
const roadmapOrder = ['in_progress', 'planned', 'evaluating'];

// 结构化变更明细的字段显示名（与采集管线 FIELD_LABELS 保持一致；未收录回退原字段名）
const diffFieldLabels = {
  monthly_price: '月费',
  first_month_price: '首月价',
  quarterly_price: '季费',
  yearly_price: '年费',
  annual_price: '按年价',
  monthly_currency: '币种',
  included_calls: '包含额度',
  token_limit: 'Token 上限',
  five_hours_requests: '5 小时限额',
  weekly_requests: '每周限额',
  monthly_requests: '每月限额',
  benefits: '权益',
  refund_policy: '退款政策',
  billing_cycle: '计费周期',
  credits_limit: 'Credits 上限',
  reset_rule: '重置规则',
  notes: '备注',
  url: '购买链接',
  url_en: '购买链接',
  sort_order: '排序',
  input_price: '输入价',
  output_price: '输出价',
  cache_read_price: '缓存读价',
  cache_write_price: '缓存写价',
  currency: '币种',
  context_length: '上下文长度',
  max_output: '最大输出',
  lifecycle_status: '生命周期状态',
  release_date: '发布日期',
};

const els = {
  count: document.getElementById('changelogEntryCount'),
  error: document.getElementById('changelogError'),
  list: document.getElementById('changelogList'),
  loading: document.getElementById('changelogLoading'),
  empty: document.getElementById('changelogEmpty'),
  changelogView: document.getElementById('changelogView'),
  roadmapList: document.getElementById('roadmapList'),
  roadmapView: document.getElementById('roadmapView'),
  roadmapEmpty: document.getElementById('roadmapEmpty'),
  updatedAt: document.getElementById('changelogUpdatedAt'),
  filterResult: document.getElementById('filterResult'),
  dateFilterList: document.getElementById('dateFilterList'),
  sidebarNav: document.getElementById('changelogSidebarNav'),
  chips: document.getElementById('changelogChips'),
  tabbar: document.getElementById('changelogTabbar'),
  searchInput: document.getElementById('changelogSearchInput'),
};

// 筛选状态：view 为 all（更新日志）或 roadmap（正在推进）；category/month/query 仅在 all 视图生效
const state = { view: 'all', category: '', month: '', query: '' };
let entries = [];
let roadmapItems = [];
let searchTimer = null;

function formatDate(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(value || ''));
  return match ? `${match[1]}.${match[2]}.${match[3]}` : '—';
}

function formatDiffValue(value) {
  if (value === null || value === undefined || String(value).trim() === '') return '—';
  return String(value);
}

// 单条结构化变更明细：平台/档位（或模型）标签 + 字段级旧值→新值 diff
function renderChangeItem(change) {
  const isModel = change?.scope === 'model';
  const isCreate = change?.action === 'create';
  const subject = isModel
    ? (change?.model_name || change?.canonical_id || '')
    : (change?.plan_name || change?.plan_id || '');
  const actionLabel = `${isCreate ? '新增' : '更新'}${isModel ? '模型' : '套餐'}`;
  const changes = change?.changes && typeof change.changes === 'object' ? Object.entries(change.changes) : [];

  return `
    <li class="changelog-diff-item">
      <div class="changelog-diff-head">
        <span class="changelog-diff-action changelog-diff-action--${isCreate ? 'create' : 'update'}">${escapeHtml(actionLabel)}</span>
        ${change?.provider ? `<span class="changelog-diff-provider">${escapeHtml(change.provider)}</span>` : ''}
        <span class="changelog-diff-subject">${escapeHtml(subject)}</span>
      </div>
      ${changes.length ? `
      <dl class="changelog-diff-fields">
        ${changes.map(([field, c]) => `
        <div class="changelog-diff-field">
          <dt>${escapeHtml(diffFieldLabels[field] || field)}</dt>
          <dd><del>${escapeHtml(formatDiffValue(c?.from))}</del><span class="changelog-diff-arrow" aria-hidden="true">→</span><ins>${escapeHtml(formatDiffValue(c?.to))}</ins></dd>
        </div>`).join('')}
      </dl>` : ''}
    </li>`;
}

function renderEntry(entry) {
  const kind = Object.hasOwn(kindLabels, entry?.kind) ? entry.kind : 'data';
  const date = String(entry?.date || '');
  const items = Array.isArray(entry?.items) ? entry.items : [];
  const changeItems = Array.isArray(entry?.change_items) ? entry.change_items : [];

  return `
    <article class="changelog-release" data-changelog-kind="${escapeHtml(kind)}">
      <div class="changelog-date">
        <time datetime="${escapeHtml(date)}">${escapeHtml(formatDate(date))}</time>
        <span>${escapeHtml(date.slice(0, 4))}</span>
      </div>
      <div class="changelog-release-body">
        <div class="changelog-release-meta">
          <span>${escapeHtml(entry?.edition || formatDate(date))}</span>
          <span class="changelog-kind changelog-kind--${escapeHtml(kind)}">${escapeHtml(kindLabels[kind])}</span>
        </div>
        <h3>${escapeHtml(entry?.title || '内容更新')}</h3>
        ${entry?.summary ? `<p class="changelog-release-summary">${escapeHtml(entry.summary)}</p>` : ''}
        <ul>
          ${items.map(item => `
            <li><span class="changelog-item-mark" aria-hidden="true"></span><span>${escapeHtml(item)}</span></li>`).join('')}
        </ul>
        ${changeItems.length ? `
        <ul class="changelog-diff-list" aria-label="变更明细">
          ${changeItems.map(renderChangeItem).join('')}
        </ul>` : ''}
      </div>
    </article>`;
}

function setVisible(element, visible) {
  if (element) element.hidden = !visible;
}

function renderRoadmapItem(item) {
  const st = roadmapStatus[item?.status] || roadmapStatus.planned;
  const votes = Number(item?.votes) > 0 ? Number(item.votes) : 0;
  const users = Array.isArray(item?.users) ? item.users.filter(Boolean) : [];
  const userLabel = users.length
    ? (users.length > 2 ? `${users[0]}、${users[1]} 等 ${users.length} 人` : users.join('、'))
    : '';
  const metaParts = [
    item?.platform ? escapeHtml(item.platform) : '',
    userLabel ? escapeHtml(userLabel) : '',
    item?.date ? `${formatDate(item.date)} 提出` : '',
  ].filter(Boolean).join(' · ');
  return `
    <li class="roadmap-item roadmap-item--${st.cls}">
      <span class="roadmap-status">${st.label}</span>
      <div class="roadmap-body">
        <h3>${escapeHtml(item?.title || '')}</h3>
        ${item?.note ? `<p>${escapeHtml(item.note)}</p>` : ''}
        ${metaParts ? `<p class="roadmap-meta">${metaParts}</p>` : ''}
      </div>
      ${votes ? `<span class="roadmap-votes" title="用户评论提及次数">${votes} 人提及</span>` : ''}
    </li>`;
}

function renderRoadmap(roadmap) {
  roadmapItems = Array.isArray(roadmap) ? roadmap.filter(item => item && item.title) : [];
  if (!els.roadmapList || !els.roadmapView) return;
  if (!roadmapItems.length) {
    els.roadmapList.innerHTML = '';
    setVisible(els.roadmapList, false);
    setVisible(els.roadmapEmpty, true);
  } else {
    const sorted = [...roadmapItems].sort((a, b) => {
      const rank = item => {
        const idx = roadmapOrder.indexOf(item.status);
        return idx === -1 ? roadmapOrder.length : idx;
      };
      return rank(a) - rank(b) || (Number(b.votes) || 0) - (Number(a.votes) || 0);
    });
    els.roadmapList.innerHTML = sorted.map(renderRoadmapItem).join('');
    setVisible(els.roadmapList, true);
    setVisible(els.roadmapEmpty, false);
  }
  const countEl = document.getElementById('countRoadmap');
  if (countEl) countEl.textContent = roadmapItems.length.toLocaleString('zh-CN');
}

function renderChangelog(data) {
  entries = Array.isArray(data?.entries)
    ? [...data.entries].sort((a, b) => String(b?.date || '').localeCompare(String(a?.date || '')))
    : [];
  const updatedAt = data?.last_updated || entries[0]?.date || '';

  els.updatedAt.textContent = formatDate(updatedAt);
  els.updatedAt.dateTime = updatedAt;
  els.count.textContent = entries.length.toLocaleString('zh-CN');
  const countAllEl = document.getElementById('countAll');
  if (countAllEl) countAllEl.textContent = entries.length.toLocaleString('zh-CN');
  updateCategoryCounts();
  renderDateFilter();
  applyFilters();
  // 摘要能容纳就单行：列表已渲染且可见，测量容器宽度
  initFitDescription();

  setVisible(els.loading, false);
  setVisible(els.error, false);
}

// —— 侧边栏筛选：分类计数、日期分组、过滤与视图切换 ——

function updateCategoryCounts() {
  const counts = { catalog: 0, data: 0, feature: 0 };
  for (const entry of entries) {
    const kind = Object.hasOwn(kindLabels, entry?.kind) ? entry.kind : 'data';
    counts[kind] = (counts[kind] || 0) + 1;
  }
  const setCount = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value.toLocaleString('zh-CN');
  };
  setCount('catAll', entries.length);
  setCount('catCatalog', counts.catalog);
  setCount('catData', counts.data);
  setCount('catFeature', counts.feature);
}

function renderDateFilter() {
  if (!els.dateFilterList) return;
  const monthCounts = new Map();
  for (const entry of entries) {
    const match = /^(\d{4})-(\d{2})/.exec(entry.date || '');
    if (match) {
      const key = `${match[1]}.${match[2]}`;
      monthCounts.set(key, (monthCounts.get(key) || 0) + 1);
    }
  }
  const months = [...monthCounts.keys()].sort((a, b) => b.localeCompare(a));
  const calendarIcon = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>';
  els.dateFilterList.innerHTML = `
    <button type="button" class="aihot-nav-item aihot-cat-item is-active" data-month="">
      ${calendarIcon}
      <span>全部日期</span>
      <span class="aihot-cat-count">${entries.length.toLocaleString('zh-CN')}</span>
    </button>
    ${months.map(month => `
    <button type="button" class="aihot-nav-item aihot-cat-item" data-month="${escapeHtml(month)}">
      ${calendarIcon}
      <span>${escapeHtml(month)}</span>
      <span class="aihot-cat-count">${(monthCounts.get(month) || 0).toLocaleString('zh-CN')}</span>
    </button>`).join('')}`;
}

function applyFilters() {
  const q = state.query.trim().toLowerCase();
  const normalizedKind = entry => (Object.hasOwn(kindLabels, entry?.kind) ? entry.kind : 'data');
  const filtered = entries.filter(entry => {
    if (state.category && normalizedKind(entry) !== state.category) return false;
    if (state.month) {
      const month = (entry.date || '').slice(0, 7).replace('-', '.');
      if (month !== state.month) return false;
    }
    if (q) {
      const haystack = [entry.title, entry.summary, ...(Array.isArray(entry.items) ? entry.items : [])]
        .filter(Boolean).join(' ').toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
  els.list.innerHTML = filtered.length ? filtered.map(renderEntry).join('') : '';
  setVisible(els.list, filtered.length > 0);
  setVisible(els.empty, filtered.length === 0);
  els.filterResult.textContent = filtered.length === entries.length
    ? ''
    : `显示 ${filtered.length.toLocaleString('zh-CN')} / 共 ${entries.length.toLocaleString('zh-CN')} 条`;
}

function syncFilterHighlights() {
  document.querySelectorAll('#changelogSidebarNav [data-category]').forEach(btn => {
    btn.classList.toggle('is-active', btn.dataset.category === state.category);
  });
  document.querySelectorAll('#changelogSidebarNav [data-month]').forEach(btn => {
    btn.classList.toggle('is-active', btn.dataset.month === state.month);
  });
}

function switchView(view) {
  state.view = view === 'roadmap' ? 'roadmap' : 'all';
  document.querySelectorAll('#changelogSidebarNav [data-view], #changelogTabbar [data-view]').forEach(btn => {
    btn.classList.toggle('is-active', btn.dataset.view === state.view);
  });
  document.querySelectorAll('#changelogChips [data-filter]').forEach(btn => {
    const active = btn.dataset.filter === state.view;
    btn.classList.toggle('is-active', active);
    btn.setAttribute('aria-pressed', String(active));
  });
  const isRoadmap = state.view === 'roadmap';
  setVisible(els.roadmapView, isRoadmap);
  setVisible(els.changelogView, !isRoadmap);
  setVisible(els.roadmapList, isRoadmap && roadmapItems.length > 0);
  setVisible(els.roadmapEmpty, isRoadmap && roadmapItems.length === 0);
  // 分类/日期筛选仅作用于 all 视图：切到 roadmap 时取消侧边栏高亮（保留选中值，切回时恢复）
  if (isRoadmap) {
    document.querySelectorAll('#changelogSidebarNav [data-category], #changelogSidebarNav [data-month]').forEach(btn => btn.classList.remove('is-active'));
    if (els.filterResult) els.filterResult.textContent = '';
  } else {
    syncFilterHighlights();
    setVisible(els.loading, false);
    setVisible(els.error, entries.length === 0);
    applyFilters();
  }
}

function switchCategory(category) {
  state.category = category;
  if (state.view !== 'all') switchView('all');
  syncFilterHighlights();
  applyFilters();
}

function switchMonth(month) {
  state.month = month;
  if (state.view !== 'all') switchView('all');
  syncFilterHighlights();
  applyFilters();
}

function bindEvents() {
  if (els.sidebarNav) {
    els.sidebarNav.addEventListener('click', e => {
      const viewBtn = e.target.closest('[data-view]');
      if (viewBtn) return switchView(viewBtn.dataset.view);
      const catBtn = e.target.closest('[data-category]');
      if (catBtn) return switchCategory(catBtn.dataset.category);
      const monthBtn = e.target.closest('[data-month]');
      if (monthBtn) return switchMonth(monthBtn.dataset.month);
    });
  }
  if (els.chips) {
    els.chips.addEventListener('click', e => {
      const chip = e.target.closest('[data-filter]');
      if (chip) switchView(chip.dataset.filter);
    });
  }
  if (els.tabbar) {
    els.tabbar.addEventListener('click', e => {
      const tab = e.target.closest('[data-view]');
      if (tab) switchView(tab.dataset.view);
    });
  }
  if (els.searchInput) {
    els.searchInput.addEventListener('input', () => {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(() => {
        state.query = els.searchInput.value;
        if (state.view !== 'all') switchView('all');
        applyFilters();
      }, 200);
    });
  }
}

async function loadChangelog() {
  try {
    const response = await fetch('./changelog.json', { cache: 'no-cache' });
    if (!response.ok) throw new Error('Changelog unavailable');
    renderChangelog(await response.json());
  } catch {
    setVisible(els.loading, false);
    setVisible(els.list, false);
    setVisible(els.empty, false);
    setVisible(els.error, true);
  }
}

async function loadRoadmap() {
  try {
    const response = await fetch('./roadmap.json', { cache: 'no-cache' });
    if (!response.ok) return;
    const data = await response.json();
    renderRoadmap(data?.items);
  } catch { /* roadmap 为可选内容，加载失败时忽略 */ }
}

initAppShell();
bindEvents();
loadChangelog();
loadRoadmap();
