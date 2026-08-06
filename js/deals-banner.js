// deals-banner.js —— 全站公告条：展示进行中官方活动（最多 3 条）。
// 数据源 deals.json（export:data 从 /api/promotions 导出，含 active/upcoming/ended 状态）。
// 与 build-seo-pages.mjs 的 renderDealsBannerHtml 使用同一数据口径（status=active），
// header.js 动态覆盖 header-root 后调用本模块重渲染；无活动或加载失败时静默隐藏。
// 自适应截断：最多 3 条上限不变；按容器实际宽度只保留能完整放下的条目（最少 1 条完整，不截断）。
// 可关闭：X 按钮移除公告条并记 localStorage（当天不再显示，次日恢复）；
// 偏移补偿均由 body:has(.deals-banner) 驱动，banner 移除后表格头/内容 padding 自动恢复原状。
import { escapeHtml, safeExternalUrl } from './render.js';

const DISMISS_KEY = 'dealsBannerDismissedAt';

// 当天是否已关闭（避免新活动被永久屏蔽：只记住关闭日期，次日重新出现）
function isDismissedToday() {
  try {
    return localStorage.getItem(DISMISS_KEY) === new Date().toISOString().slice(0, 10);
  } catch {
    return false;
  }
}

// 全局关闭（静态 SEO 页初始 HTML 与动态渲染共用；移除 DOM 后 :has 补偿自动恢复）
export function dismissDealsBanner(banner) {
  if (!banner) return;
  try {
    localStorage.setItem(DISMISS_KEY, new Date().toISOString().slice(0, 10));
  } catch { /* localStorage 不可用时仅本次会话关闭 */ }
  banner.remove();
}

// 事件委托：X 按钮可能来自静态 SEO 页初始 HTML，也可能来自动态渲染，统一在此处理
document.addEventListener('click', e => {
  const btn = e.target.closest('.deals-banner-close');
  if (btn) dismissDealsBanner(btn.closest('.deals-banner'));
});

export async function renderDealsBanner(container) {
  if (!container) return;
  // 活动页本身就是公告目的地，不重复展示公告条
  if ((globalThis.location?.pathname || '').startsWith('/deals')) return;
  if (isDismissedToday()) return; // 用户今天已关闭，不再展示
  try {
    // 用绝对路径：相对路径在 /deals/、/brands/* 等子页面会解析到错误位置（404）。
    const response = await fetch('/deals.json', { cache: 'no-cache' });
    if (!response.ok) return;
    const data = await response.json();
    const deals = Array.isArray(data.deals) ? data.deals : [];
    const active = deals.filter(deal => deal.status === 'active').slice(0, 3);
    if (!active.length) return;

    const items = active.map(deal => {
      const url = safeExternalUrl(deal.url);
      const title = escapeHtml(deal.title);
      const provider = escapeHtml(deal.provider);
      const link = url
        ? `<a class="deals-banner-link" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${title}</a>`
        : `<span class="deals-banner-title">${title}</span>`;
      return `<span class="deals-banner-item">${provider}：${link}</span>`;
    }).join('');

    container.innerHTML = `
      <div class="deals-banner" role="note">
        <span class="deals-banner-fire" aria-hidden="true">🔥</span>
        <span class="deals-banner-label">官方活动</span>
        <span class="deals-banner-items">${items}</span>
        <a class="deals-banner-more" href="/deals/">查看全部 →</a>
        <button type="button" class="deals-banner-close" aria-label="关闭活动公告">✕</button>
      </div>`;
    fitBannerItems(container.querySelector('.deals-banner'));
  } catch {
    // 公告条为增强内容，deals.json 缺失/解析失败时静默隐藏
  }
}

// 按可用宽度裁剪条目：只保留能完整放下的条目（从前往后累加，放不下即隐藏该条及后续），
// 最少保留 1 条完整（不截断）；窗口 resize 时重新计算
function fitBannerItems(banner) {
  if (!banner) return;
  const itemsWrap = banner.querySelector('.deals-banner-items');
  if (!itemsWrap) return;
  const items = Array.from(itemsWrap.querySelectorAll('.deals-banner-item'));
  if (!items.length) return;
  // 固定元素宽度（🔥 / 标签 / 查看全部 / 关闭按钮）
  const fixed = ['.deals-banner-fire', '.deals-banner-label', '.deals-banner-more', '.deals-banner-close']
    .reduce((sum, sel) => sum + (banner.querySelector(sel)?.offsetWidth || 0), 0);
  const gap = parseInt(getComputedStyle(itemsWrap).gap, 10) || 0;
  const available = banner.clientWidth - fixed - gap;
  let used = 0;
  let visibleCount = 0;
  items.forEach((item, i) => {
    const width = item.scrollWidth; // 内容完整宽度（忽略父容器溢出压缩）
    if (i === 0) {
      item.style.display = ''; // 至少保留第一条完整
      used = width + gap;
      visibleCount = 1;
      return;
    }
    if (used + width > available) {
      item.style.display = 'none'; // 放不下：隐藏该条及后续（第一条不受限）
    } else {
      item.style.display = '';
      used += width + gap;
      visibleCount += 1;
    }
  });
  // 分隔符（::before 圆点）只出现在可见条目的非首条：给可见的第一条打标记，隐藏条目不参与
  let firstVisibleFound = false;
  items.forEach(item => {
    const visible = item.style.display !== 'none';
    const isFirst = visible && !firstVisibleFound;
    if (isFirst) firstVisibleFound = true;
    item.classList.toggle('deals-banner-item--first', isFirst || !visible);
  });
  return visibleCount;
}

// 窗口尺寸变化时重新裁剪（去抖，避免频繁重算）
let fitTimer = null;
window.addEventListener('resize', () => {
  clearTimeout(fitTimer);
  fitTimer = setTimeout(() => {
    document.querySelectorAll('.deals-banner').forEach(fitBannerItems);
  }, 150);
});
