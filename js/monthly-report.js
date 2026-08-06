/**
 * monthly-report.js — 月度价格报告交互增强
 * 为静态 SEO 表格添加：表头吸顶、点击表头排序、点击表头筛选
 * 复用 plans-table 同一套 CSS 类（plan-table-wrap / plan-column-filter 等）保持风格一致
 */
import { escapeHtml } from './render.js';

// ---- 列定义 ----
const COLUMNS = [
  { key: 'date', label: '日期', sortable: true, filterable: true },
  { key: 'plan', label: '套餐', sortable: true, filterable: true },
  { key: 'field', label: '价格档位', sortable: true, filterable: true },
  { key: 'price', label: '价格', sortable: true, filterable: true, numeric: true },
  { key: 'change', label: '变动', sortable: true, filterable: true }
];

// ---- 状态 ----
let sortColumn = 'date';
let sortAsc = false;
const activeFilters = {};

// ---- 数据读取 ----
function readRows(table) {
  const tbody = table.querySelector('tbody');
  if (!tbody) return [];
  return [...tbody.querySelectorAll('tr')].map(tr => {
    const cells = {};
    tr.querySelectorAll('td').forEach(td => {
      const key = td.dataset.reportCol;
      if (key) cells[key] = td.dataset.sortValue || td.textContent.trim();
    });
    return { tr, cells };
  });
}

// ---- 排序 ----
function compareRows(a, b, col) {
  const def = COLUMNS.find(c => c.key === col);
  if (!def) return 0;
  const va = a.cells[col] || '';
  const vb = b.cells[col] || '';
  if (def.numeric) {
    const na = parseFloat(va.replace(/[^\d.\-]/g, ''));
    const nb = parseFloat(vb.replace(/[^\d.\-]/g, ''));
    const aEmpty = isNaN(na);
    const bEmpty = isNaN(nb);
    if (aEmpty && bEmpty) return 0;
    if (aEmpty) return 1;
    if (bEmpty) return -1;
    return na - nb;
  }
  return va.localeCompare(vb, 'zh-CN');
}

// ---- 筛选 ----
function passesFilter(row) {
  return Object.entries(activeFilters).every(([key, value]) => {
    if (!value) return true;
    return (row.cells[key] || '') === value;
  });
}

function getFilterOptions(rows, col) {
  const counts = new Map();
  for (const row of rows) {
    const val = row.cells[col.key] || '';
    if (!val) continue;
    counts.set(val, (counts.get(val) || 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => a[0].localeCompare(b[0], 'zh-CN'))
    .map(([value, count]) => ({ value, count }));
}

// ---- 渲染 ----
function renderTable(wrap, allRows) {
  const filtered = allRows.filter(r => passesFilter(r));
  filtered.sort((a, b) => {
    const result = compareRows(a, b, sortColumn);
    return sortAsc ? result : -result;
  });

  const table = wrap.querySelector('table');

  // 重渲染 thead
  const thead = table.querySelector('thead');
  thead.innerHTML = `<tr>${COLUMNS.map(col => renderHeaderCell(col, allRows)).join('')}</tr>`;

  // 重渲染 tbody
  const tbody = table.querySelector('tbody');
  tbody.innerHTML = filtered.map(row => {
    // 保留原始 HTML（含链接/徽标）——从原始 tr 读取
    const origTds = row.tr.querySelectorAll('td');
    const tdMap = {};
    origTds.forEach(td => {
      const key = td.dataset.reportCol;
      if (key) tdMap[key] = td;
    });

    return `<tr>
      <td data-report-col="date" data-sort-value="${escapeHtml(row.cells.date)}" class="whitespace-nowrap py-2.5 pr-3 tabular-nums text-xs text-slate-400 dark:text-slate-500">${tdMap.date ? tdMap.date.innerHTML : escapeHtml(row.cells.date || '')}</td>
      <td data-report-col="plan" data-sort-value="${escapeHtml(row.cells.plan)}" class="py-2.5 pr-3">${tdMap.plan ? tdMap.plan.innerHTML : escapeHtml(row.cells.plan || '')}</td>
      <td data-report-col="field" data-sort-value="${escapeHtml(row.cells.field)}" class="whitespace-nowrap py-2.5 pr-3 text-slate-500 dark:text-slate-400">${tdMap.field ? tdMap.field.innerHTML : escapeHtml(row.cells.field || '')}</td>
      <td data-report-col="price" data-sort-value="${escapeHtml(row.cells.price)}" class="whitespace-nowrap py-2.5 pr-3 tabular-nums text-slate-700 dark:text-slate-200">${tdMap.price ? tdMap.price.innerHTML : escapeHtml(row.cells.price || '')}</td>
      <td data-report-col="change" data-sort-value="${escapeHtml(row.cells.change)}" class="whitespace-nowrap py-2.5 text-right">${tdMap.change ? tdMap.change.innerHTML : escapeHtml(row.cells.change || '')}</td>
    </tr>`;
  }).join('');

  // 更新筛选计数
  const countEl = wrap.parentElement?.querySelector('[data-report-count]');
  if (countEl) {
    countEl.textContent = `显示 ${filtered.length} / ${allRows.length} 条记录`;
  }
}

function renderHeaderCell(col, allRows) {
  const isActive = sortColumn === col.key;
  const hasFilter = !!activeFilters[col.key];
  const sortIcon = isActive ? (sortAsc ? ' ↑' : ' ↓') : '';

  let filterMenu = '';
  if (col.filterable) {
    const options = getFilterOptions(allRows, col);
    filterMenu = `
      <div class="plan-column-filter-menu" data-report-menu="${col.key}" role="menu" hidden>
        <button type="button" class="plan-column-filter-option${!hasFilter ? ' is-active' : ''}" data-report-filter-value="">
          <span class="plan-column-filter-option-label">全部</span>
          <span class="plan-column-filter-option-count">${allRows.length}</span>
        </button>
        ${options.map(opt => `
        <button type="button" class="plan-column-filter-option${hasFilter && activeFilters[col.key] === opt.value ? ' is-active' : ''}" data-report-filter-value="${escapeHtml(opt.value)}">
          <span class="plan-column-filter-option-label">${escapeHtml(opt.value)}</span>
          <span class="plan-column-filter-option-count">${opt.count}</span>
        </button>`).join('')}
      </div>`;
  }

  return `
    <th scope="col" class="plan-column-filter px-3 py-3 text-left font-semibold text-slate-900 dark:text-white">
      <button type="button" class="plan-column-filter-trigger${isActive || hasFilter ? ' is-active' : ''}" data-report-sort="${col.key}" title="点击排序${col.filterable ? '，点击下拉箭头筛选' : ''}">
        <span class="plan-column-filter-label">${escapeHtml(col.label)}${sortIcon}</span>
        ${col.filterable ? '<span class="plan-column-filter-caret" aria-hidden="true"></span>' : ''}
      </button>
      ${filterMenu}
    </th>`;
}

// ---- 事件绑定 ----
function bindEvents(wrap, allRows) {
  wrap.addEventListener('click', e => {
    // 下拉箭头优先开筛选菜单；点击表头主体排序
    const caret = e.target.closest('.plan-column-filter-caret');
    if (caret) {
      const trigger = caret.closest('.plan-column-filter-trigger');
      const th = trigger?.closest('th');
      const menu = th?.querySelector('.plan-column-filter-menu');
      if (menu) {
        const wasHidden = menu.hidden;
        // 关闭其他菜单
        wrap.querySelectorAll('.plan-column-filter-menu').forEach(m => { m.hidden = true; });
        wrap.querySelectorAll('.plan-column-filter-trigger').forEach(t => t.setAttribute('aria-expanded', 'false'));
        if (wasHidden) {
          menu.hidden = false;
          trigger.setAttribute('aria-expanded', 'true');
        }
        e.stopPropagation();
      }
      return;
    }

    // 排序
    const sortBtn = e.target.closest('[data-report-sort]');
    if (sortBtn) {
      const col = sortBtn.dataset.reportSort;
      const colDef = COLUMNS.find(c => c.key === col);
      if (colDef?.sortable) {
        if (sortColumn === col) {
          sortAsc = !sortAsc;
        } else {
          sortColumn = col;
          sortAsc = true;
        }
        renderTable(wrap, allRows);
      }
      return;
    }

    // 筛选菜单切换
    const trigger = e.target.closest('.plan-column-filter-trigger');
    if (trigger) {
      const th = trigger.closest('th');
      const menu = th?.querySelector('.plan-column-filter-menu');
      if (menu) {
        const wasHidden = menu.hidden;
        // 关闭其他菜单
        wrap.querySelectorAll('.plan-column-filter-menu').forEach(m => { m.hidden = true; });
        wrap.querySelectorAll('.plan-column-filter-trigger').forEach(t => t.setAttribute('aria-expanded', 'false'));
        if (wasHidden) {
          menu.hidden = false;
          trigger.setAttribute('aria-expanded', 'true');
        }
        e.stopPropagation();
      }
      return;
    }

    // 筛选选项
    const filterOpt = e.target.closest('[data-report-filter-value]');
    if (filterOpt) {
      const menu = filterOpt.closest('.plan-column-filter-menu');
      const col = menu?.dataset.reportMenu;
      const value = filterOpt.dataset.reportFilterValue;
      if (col) {
        if (value) {
          activeFilters[col] = value;
        } else {
          delete activeFilters[col];
        }
        renderTable(wrap, allRows);
      }
      return;
    }
  });

  // 点击外部关闭菜单
  document.addEventListener('click', e => {
    if (!e.target.closest('.plan-table-wrap[data-monthly-report]')) {
      wrap.querySelectorAll('.plan-column-filter-menu').forEach(m => { m.hidden = true; });
      wrap.querySelectorAll('.plan-column-filter-trigger').forEach(t => t.setAttribute('aria-expanded', 'false'));
    }
  });
}

// ---- 表头吸顶（复用 plan-table-sticky 的 fixed 浮条方案） ----
function initStickyHeader(wrap) {
  const BAR_CLASS = 'plan-table-sticky-bar';
  const table = wrap.querySelector('table');
  if (!table) return;

  let bar = null;
  let barInner = null;
  let barTable = null;
  let rafId = 0;

  const headerOffset = () => {
    const header = document.getElementById('header-root');
    if (header) {
      const bottom = header.getBoundingClientRect().bottom;
      if (Number.isFinite(bottom) && bottom > 0) return bottom;
    }
    const raw = window.getComputedStyle(document.documentElement).getPropertyValue('--header-height');
    const value = parseFloat(raw);
    return Number.isFinite(value) && value > 0 ? value : 64;
  };

  const ensureBar = () => {
    if (bar) return;
    bar = document.createElement('div');
    bar.className = BAR_CLASS;
    bar.setAttribute('aria-hidden', 'true');
    barInner = document.createElement('div');
    barInner.className = `${BAR_CLASS}__inner`;
    barTable = document.createElement('table');
    barInner.appendChild(barTable);
    bar.appendChild(barInner);
    document.body.appendChild(bar);
  };

  const rebuildClone = () => {
    const thead = table.querySelector('thead');
    if (!thead) return false;
    barTable.className = table.className;
    barTable.innerHTML = '';
    // 按当前真实列宽生成 colgroup
    const cols = [...thead.querySelectorAll('th')];
    if (cols.length) {
      const cg = document.createElement('colgroup');
      cols.forEach(th => {
        const col = document.createElement('col');
        const width = th.getBoundingClientRect().width;
        if (width > 0) col.style.width = `${width}px`;
        cg.appendChild(col);
      });
      barTable.appendChild(cg);
    }
    barTable.appendChild(thead.cloneNode(true));
    return true;
  };

  const update = () => {
    rafId = 0;
    // 横向滚动遮罩状态
    wrap.classList.toggle('can-scroll', wrap.scrollWidth > wrap.clientWidth + 1);
    wrap.classList.toggle('is-scrolled-end', wrap.scrollLeft >= wrap.scrollWidth - wrap.clientWidth - 1);

    const offset = headerOffset();
    const wrapRect = wrap.getBoundingClientRect();
    const tableRect = table.getBoundingClientRect();
    const thead = table.querySelector('thead');
    const theadHeight = thead ? thead.getBoundingClientRect().height : 0;

    if (wrapRect.top > offset || tableRect.bottom <= offset + theadHeight) {
      if (bar) bar.classList.remove('is-docked');
      return;
    }

    ensureBar();
    rebuildClone();
    bar.style.top = `${offset}px`;
    bar.style.left = `${wrapRect.left}px`;
    bar.style.width = `${wrapRect.width}px`;
    barInner.style.width = `${table.offsetWidth}px`;
    barInner.style.transform = `translateX(${-wrap.scrollLeft}px)`;
    bar.classList.add('is-docked');
  };

  const schedule = () => {
    if (rafId) return;
    rafId = requestAnimationFrame(update);
  };

  // 表格内容变化时（排序/筛选后）重新计算列宽
  const observer = new MutationObserver(() => schedule());
  observer.observe(table.querySelector('thead'), { childList: true, subtree: true });

  wrap.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  schedule();
}

// ---- 初始化 ----
function init() {
  const wrap = document.querySelector('.plan-table-wrap[data-monthly-report]');
  if (!wrap) return;
  const table = wrap.querySelector('table');
  if (!table) return;

  const allRows = readRows(table);
  if (!allRows.length) return;

  // 绑定事件
  bindEvents(wrap, allRows);

  // 初始渲染（默认按日期倒序，最新在前）
  renderTable(wrap, allRows);

  // 初始化吸顶表头
  initStickyHeader(wrap);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
