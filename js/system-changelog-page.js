import { initAppShell } from './app.js';
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
  roadmapList: document.getElementById('roadmapList'),
  roadmapSection: document.getElementById('roadmapSection'),
  updatedAt: document.getElementById('changelogUpdatedAt'),
};

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
  const items = Array.isArray(roadmap) ? roadmap.filter(item => item && item.title) : [];
  if (!items.length || !els.roadmapList || !els.roadmapSection) return;
  const sorted = [...items].sort((a, b) => {
    const rank = item => {
      const idx = roadmapOrder.indexOf(item.status);
      return idx === -1 ? roadmapOrder.length : idx;
    };
    return rank(a) - rank(b) || (Number(b.votes) || 0) - (Number(a.votes) || 0);
  });
  els.roadmapList.innerHTML = sorted.map(renderRoadmapItem).join('');
  setVisible(els.roadmapSection, true);
}

function renderChangelog(data) {
  const entries = Array.isArray(data?.entries)
    ? [...data.entries].sort((a, b) => String(b?.date || '').localeCompare(String(a?.date || '')))
    : [];
  const updatedAt = data?.last_updated || entries[0]?.date || '';

  els.updatedAt.textContent = formatDate(updatedAt);
  els.updatedAt.dateTime = updatedAt;
  els.count.textContent = entries.length.toLocaleString('zh-CN');
  els.list.innerHTML = entries.length
    ? entries.map(renderEntry).join('')
    : '<div class="changelog-empty"><h3>还没有公开记录</h3><p>后台发布更新日志后，会自动显示在这里。</p></div>';

  setVisible(els.loading, false);
  setVisible(els.error, false);
  setVisible(els.list, true);
}

async function loadChangelog() {
  try {
    const response = await fetch('./changelog.json', { cache: 'no-cache' });
    if (!response.ok) throw new Error('Changelog unavailable');
    renderChangelog(await response.json());
  } catch {
    setVisible(els.loading, false);
    setVisible(els.list, false);
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
loadChangelog();
loadRoadmap();
