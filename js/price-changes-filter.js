// /price-changes/ 全站价格变动时间线的品牌/套餐/价格变化筛选。
// 构建期由 build-seo-pages.mjs 输出筛选控件（#priceChangesFilter）与事件行标记
// （li[data-brand][data-plan][data-change-type] / 合并行 li[data-brand][data-plans]），
// 本模块只做纯客户端过滤：隐藏不匹配的行与空日期分组，无 JS 时页面完整可读。
export function initPriceChangesFilter() {
  const root = document.getElementById('priceChangesFilter');
  const container = document.getElementById('priceChangesContainer');
  if (!root || !container) return;
  const brandSel = document.getElementById('pcFilterBrand');
  const planSel = document.getElementById('pcFilterPlan');
  const countEl = document.getElementById('pcFilterCount');
  const changedBtn = document.getElementById('pcFilterChanged');
  if (!brandSel || !planSel || !countEl) return;

  // 「价格变化」= 涨价/降价/取消公开定价；首次收录与币种/信息调整不算。
  const CHANGED_TYPES = new Set(['increase', 'decrease', 'delisted']);
  let changedOnly = false;

  const rows = Array.from(container.querySelectorAll('li[data-brand]')).map(li => ({
    li,
    brand: li.dataset.brand,
    plans: (li.dataset.plans || li.dataset.plan || '').split(/\s+/).filter(Boolean),
    changeType: li.dataset.changeType || ''
  }));

  function applyFilter() {
    const brand = brandSel.value;
    const plan = planSel.value;
    let visible = 0;
    for (const row of rows) {
      const show = (!brand || row.brand === brand)
        && (!plan || row.plans.includes(plan))
        && (!changedOnly || CHANGED_TYPES.has(row.changeType));
      row.li.classList.toggle('hidden', !show);
      if (show) visible += 1;
    }
    // 隐藏没有可见行的日期分组，保留时间线语义。
    for (const section of container.querySelectorAll(':scope > section')) {
      const hasVisible = Array.from(section.querySelectorAll('li')).some(li => !li.classList.contains('hidden'));
      section.classList.toggle('hidden', !hasVisible);
    }
    if (!brand && !plan && !changedOnly) {
      countEl.textContent = '';
      countEl.classList.add('hidden');
    } else {
      countEl.textContent = `共 ${visible} 条匹配`;
      countEl.classList.remove('hidden');
    }
  }

  // 品牌变更时按 data-brand 重建套餐下拉（保留「全部套餐」），避免跨品牌选项噪音。
  brandSel.addEventListener('change', () => {
    const brand = brandSel.value;
    const keep = Array.from(planSel.options).filter(option => !option.value || option.dataset.brand === brand);
    planSel.replaceChildren();
    keep.forEach(option => planSel.appendChild(option));
    applyFilter();
  });
  planSel.addEventListener('change', applyFilter);

  // 「价格变化」快捷筛选：只保留涨价/降价/取消公开定价的事件行。
  // 激活态样式由 aria-pressed 驱动（styles.css），可与其他筛选条件叠加。
  if (changedBtn) {
    changedBtn.addEventListener('click', () => {
      changedOnly = !changedOnly;
      changedBtn.setAttribute('aria-pressed', String(changedOnly));
      applyFilter();
    });
  }
}
