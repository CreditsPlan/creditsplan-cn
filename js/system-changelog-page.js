import { initAppShell } from './app.js';
import { escapeHtml } from './render.js';

const kindLabels = {
  catalog: '套餐与品牌',
  data: '数据更新',
  feature: '站点功能',
};

const els = {
  count: document.getElementById('changelogEntryCount'),
  error: document.getElementById('changelogError'),
  list: document.getElementById('changelogList'),
  loading: document.getElementById('changelogLoading'),
  updatedAt: document.getElementById('changelogUpdatedAt'),
};

function formatDate(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(value || ''));
  return match ? `${match[1]}.${match[2]}.${match[3]}` : '—';
}

function renderEntry(entry) {
  const kind = Object.hasOwn(kindLabels, entry?.kind) ? entry.kind : 'data';
  const date = String(entry?.date || '');
  const items = Array.isArray(entry?.items) ? entry.items : [];

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
      </div>
    </article>`;
}

function setVisible(element, visible) {
  if (element) element.hidden = !visible;
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

initAppShell();
loadChangelog();
