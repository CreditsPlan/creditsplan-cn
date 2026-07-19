import { bindThemeToggle } from './theme.js';

const pages = [
  ['index.html', '/', '模型套餐'],
  ['brands/', '/brands/', '品牌'],
  ['news.html', '/news.html', 'AI动态'],
  ['changelog.html', '/changelog.html', '更新日志']
];

function normalized(page) {
  const value = (page || 'index.html').replace(/^\.\//, '').split('#')[0] || 'index.html';
  return value;
}

// 主题切换按钮 SVG 图标（太阳 = 浅色模式显示，月亮 = 深色模式显示）
const themeToggleBtn = `
  <button data-theme-toggle type="button" class="theme-toggle-btn" aria-label="切换主题" aria-pressed="false" title="切换深色/浅色模式">
    <svg class="theme-icon-sun h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none">
      <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
    <svg class="theme-icon-moon h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  </button>`;

// GitHub 跳转按钮
const githubLink = `
  <a href="https://github.com/creditsplan/creditsplan-cn" target="_blank" rel="noopener noreferrer" class="github-link-btn" aria-label="GitHub交流" title="GitHub交流">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
  </a>`;

// 前往国际站按钮（海外套餐 / 美元结算）
const intlLink = `
  <a href="https://www.creditsplan.com/" target="_blank" rel="noopener noreferrer" class="intl-site-link" aria-label="前往国际站（海外套餐 / 美元结算）" title="前往国际站（海外套餐 / 美元结算）">前往国际站 →</a>`;

export function renderHeader(currentPage = 'index.html') {
  const root = document.getElementById('header-root');
  if (!root) return;
  const current = normalized(currentPage);
  const nav = pages.map(([page, href, label]) => {
    const active = normalized(page) === current;
    return `<li><a class="focus-ring${active ? ' is-current' : ''}" data-page-link="${page}" href="${href}"${active ? ' aria-current="page"' : ''}>${label}</a></li>`;
  }).join('');

  root.innerHTML = `
    <header>
      <nav class="nav-bar" id="navbar" aria-label="主导航">
        <a href="/" class="nav-logo">
          <div class="nav-logo-icon"><img class="nav-logo-img" src="/logo.png" alt="CreditsPlan"/></div>
          <span>CreditsPlan</span>
        </a>
        <ul class="nav-links" id="primaryNav">
          ${nav}
          <li class="nav-mobile-only"><a href="https://www.creditsplan.com/" target="_blank" rel="noopener noreferrer">前往国际站（海外套餐）</a></li>
          <li class="nav-mobile-only"><a href="https://github.com/creditsplan/creditsplan-cn" target="_blank" rel="noopener noreferrer">前往 GitHub</a></li>
        </ul>
        <div class="nav-actions">
          ${intlLink}
          ${githubLink}
          ${themeToggleBtn}
          <button class="nav-toggle" id="navToggle" type="button" aria-label="打开主菜单" aria-controls="primaryNav" aria-expanded="false">菜单</button>
        </div>
      </nav>
    </header>`;

  // 渲染完成后绑定主题切换事件
  bindThemeToggle();

  const navbar = root.querySelector('#navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.pageYOffset > 50);
    }, { passive: true });
  }

  const navToggle = root.querySelector('#navToggle');
  const navLinks = root.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.setAttribute('aria-label', isOpen ? '关闭主菜单' : '打开主菜单');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', '打开主菜单');
      });
    });
    document.addEventListener('keydown', event => {
      if (event.key !== 'Escape' || !navLinks.classList.contains('is-open')) return;
      navLinks.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', '打开主菜单');
      navToggle.focus();
    });
  }
}
