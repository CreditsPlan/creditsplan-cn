export function renderFooter() {
  const root = document.getElementById('footer-root');
  if (!root) return;
  root.innerHTML = `
    <footer>
      <div class="footer-shell mx-auto flex flex-col gap-2 px-4 py-3 text-sm text-slate-500 dark:text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <nav class="flex flex-wrap items-center gap-x-3 gap-y-1" aria-label="页脚导航">
          <a class="focus-ring rounded hover:text-slate-900 dark:hover:text-white" href="/methodology.html">数据校对方法</a>
          <a class="focus-ring rounded hover:text-slate-900 dark:hover:text-white" href="mailto:feedback@creditsplan.cn">反馈邮箱：feedback@creditsplan.cn</a>
        </nav>
        <div class="flex flex-wrap items-center gap-x-4 gap-y-1">
          <a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank" rel="noopener noreferrer" class="focus-ring rounded hover:text-slate-900 dark:hover:text-white">湘ICP备2026019664号-1</a>
          <a href="https://beian.mps.gov.cn/#/query/webSearch?code=43062102000098" target="_blank" rel="noopener noreferrer" class="focus-ring rounded hover:text-slate-900 dark:hover:text-white inline-flex items-center gap-1"><img src="https://beian.mps.gov.cn/web/assets/logo01.6189a29f.png" alt="" class="h-3.5 w-auto">湘公网安备43062102000098号</a>
          <span>© 2026 CreditsPlan</span>
        </div>
      </div>
    </footer>`;
}
