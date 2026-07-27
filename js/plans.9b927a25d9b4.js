var rt="creditsplan-theme";function sn(){try{return localStorage.getItem(rt)}catch{return null}}function ln(e){try{localStorage.setItem(rt,e)}catch{}}function at(){let t=sn()||"light";ot(t)}function cn(){let t=document.documentElement.classList.contains("dark")?"light":"dark";ot(t),ln(t),st()}function ot(e){let t=e==="dark";document.documentElement.classList.toggle("dark",t),document.documentElement.style.colorScheme=t?"dark":"light",document.body&&document.body.classList.toggle("dark",t)}function st(){let e=document.documentElement.classList.contains("dark");document.querySelectorAll("[data-theme-toggle]").forEach(t=>{let n=t.querySelector(".theme-icon-sun"),r=t.querySelector(".theme-icon-moon");t.setAttribute("aria-pressed",String(e)),n&&(n.style.display=e?"none":"block"),r&&(r.style.display=e?"block":"none")})}function lt(){document.querySelectorAll("[data-theme-toggle]").forEach(e=>{e.addEventListener("click",cn)}),st()}var dn=[["index.html","/","\u5957\u9910"],["brands/","/brands/","\u54C1\u724C"],["model","/model","\u6A21\u578B"],["news.html","/news.html","AI\u52A8\u6001"],["changelog.html","/changelog.html","\u66F4\u65B0\u65E5\u5FD7"]];function it(e){return(e||"index.html").replace(/^\.\//,"").split("#")[0]||"index.html"}var un=`
  <button data-theme-toggle type="button" class="theme-toggle-btn" aria-label="\u5207\u6362\u4E3B\u9898" aria-pressed="false" title="\u5207\u6362\u6DF1\u8272/\u6D45\u8272\u6A21\u5F0F">
    <svg class="theme-icon-sun h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none">
      <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
    <svg class="theme-icon-moon h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  </button>`,pn=`
  <a href="https://github.com/creditsplan/creditsplan-cn" target="_blank" rel="noopener noreferrer" class="github-link-btn" aria-label="GitHub\u4EA4\u6D41" title="GitHub\u4EA4\u6D41">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
  </a>`,mn=`
  <a href="https://www.creditsplan.com/" target="_blank" rel="noopener noreferrer" class="intl-site-link" aria-label="\u524D\u5F80\u56FD\u9645\u7AD9\uFF08\u6D77\u5916\u5957\u9910 / \u7F8E\u5143\u7ED3\u7B97\uFF09" title="\u524D\u5F80\u56FD\u9645\u7AD9\uFF08\u6D77\u5916\u5957\u9910 / \u7F8E\u5143\u7ED3\u7B97\uFF09">\u524D\u5F80\u56FD\u9645\u7AD9 \u2192</a>`;function dt(e="index.html"){let t=document.getElementById("header-root");if(!t)return;let n=it(e),a=((globalThis.location?.pathname||"").replace(/\/+$/,"")||"/")==="/model"||new URLSearchParams(globalThis.location?.search||"").get("view")==="pricing",o=dn.map(([p,y,b])=>{let m;return p==="model"?m=n==="index.html"&&a:p==="index.html"?m=n==="index.html"&&!a:m=it(p)===n,`<li><a class="focus-ring${m?" is-current":""}" data-page-link="${p}" href="${y}"${m?' aria-current="page"':""}>${b}</a></li>`}).join("");t.innerHTML=`
    <header>
      <nav class="nav-bar" id="navbar" aria-label="\u4E3B\u5BFC\u822A">
        <a href="/" class="nav-logo">
          <div class="nav-logo-icon"><img class="nav-logo-img" src="https://creditsplan.oss-cn-hangzhou.aliyuncs.com/creditsplan-logo-original-arrow-600.webp" alt="CreditsPlan"/></div>
          <span>CreditsPlan</span>
        </a>
        <ul class="nav-links" id="primaryNav">
          ${o}
          <li class="nav-mobile-only"><a href="https://www.creditsplan.com/" target="_blank" rel="noopener noreferrer">\u524D\u5F80\u56FD\u9645\u7AD9\uFF08\u6D77\u5916\u5957\u9910\uFF09</a></li>
          <li class="nav-mobile-only"><a href="https://github.com/creditsplan/creditsplan-cn" target="_blank" rel="noopener noreferrer">\u524D\u5F80 GitHub</a></li>
        </ul>
        <div class="nav-actions">
          ${mn}
          ${pn}
          ${un}
          <button class="nav-toggle" id="navToggle" type="button" aria-label="\u6253\u5F00\u4E3B\u83DC\u5355" aria-controls="primaryNav" aria-expanded="false">\u83DC\u5355</button>
        </div>
      </nav>
    </header>`,lt();let s=t.querySelector("#navbar");s&&window.addEventListener("scroll",()=>{s.classList.toggle("scrolled",window.pageYOffset>50)},{passive:!0});let i=t.querySelector("#navToggle"),d=t.querySelector(".nav-links");i&&d&&(i.addEventListener("click",()=>{let p=d.classList.toggle("is-open");i.setAttribute("aria-expanded",String(p)),i.setAttribute("aria-label",p?"\u5173\u95ED\u4E3B\u83DC\u5355":"\u6253\u5F00\u4E3B\u83DC\u5355")}),d.querySelectorAll("a").forEach(p=>{p.addEventListener("click",()=>{d.classList.remove("is-open"),i.setAttribute("aria-expanded","false"),i.setAttribute("aria-label","\u6253\u5F00\u4E3B\u83DC\u5355")})}),document.addEventListener("keydown",p=>{p.key!=="Escape"||!d.classList.contains("is-open")||(d.classList.remove("is-open"),i.setAttribute("aria-expanded","false"),i.setAttribute("aria-label","\u6253\u5F00\u4E3B\u83DC\u5355"),i.focus())})),fn()}var ct=!1;function fn(){if(ct||!HTMLScriptElement.supports?.("speculationrules"))return;ct=!0;let e=document.createElement("script");e.type="speculationrules",e.textContent=JSON.stringify({prerender:[{source:"list",urls:["/","/brands/","/model","/news.html","/changelog.html"],eagerness:"immediate"}]}),document.head.appendChild(e)}function ut(){let e=document.getElementById("footer-root");e&&(e.innerHTML=`
    <footer>
      <div class="footer-shell mx-auto flex flex-col gap-2 px-4 py-3 text-sm text-slate-500 dark:text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <nav class="flex flex-wrap items-center gap-x-3 gap-y-1" aria-label="\u9875\u811A\u5BFC\u822A">
          <a class="focus-ring rounded hover:text-slate-900 dark:hover:text-white" href="/methodology.html">\u6570\u636E\u6821\u5BF9\u65B9\u6CD5</a>
          <a class="focus-ring rounded hover:text-slate-900 dark:hover:text-white" href="mailto:feedback@creditsplan.cn">\u53CD\u9988\u90AE\u7BB1\uFF1Afeedback@creditsplan.cn</a>
        </nav>
        <div class="flex flex-wrap items-center gap-x-4 gap-y-1">
          <a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank" rel="noopener noreferrer" class="focus-ring rounded hover:text-slate-900 dark:hover:text-white">\u6E58ICP\u59072026019664\u53F7-1</a>
          <a href="https://beian.mps.gov.cn/#/query/webSearch?code=43062102000098" target="_blank" rel="noopener noreferrer" class="focus-ring rounded hover:text-slate-900 dark:hover:text-white inline-flex items-center gap-1"><img src="https://beian.mps.gov.cn/web/assets/logo01.6189a29f.png" alt="" class="h-3.5 w-auto">\u6E58\u516C\u7F51\u5B89\u590743062102000098\u53F7</a>
          <span>\xA9 2026 CreditsPlan</span>
        </div>
      </div>
    </footer>`)}var bn="/b.gif",pt="creditsplan.analytics.visitor",hn=["baidu.com","bing.com","duckduckgo.com","shenma.com","sm.cn","so.com","sogou.com"];function bt(e){try{let t=new URLSearchParams(e).toString(),n=new window.Image;n.referrerPolicy="origin",n.src=`${bn}?${t}&_=${Date.now()}`}catch{}}function gn(){if(window.crypto?.randomUUID)return window.crypto.randomUUID();if(window.crypto?.getRandomValues){let e=window.crypto.getRandomValues(new Uint32Array(4));return Array.from(e,t=>t.toString(16).padStart(8,"0")).join("")}return`${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`}function yn(){try{let e=window.localStorage.getItem(pt);if(e)return e;let t=gn();return window.localStorage.setItem(pt,t),t}catch{return""}}function vn(e){let t=e.toLowerCase();return t==="google.com"||t.startsWith("google.")||t.includes(".google.")?!0:hn.some(n=>t===n||t.endsWith(`.${n}`))}function xn(){if(!document.referrer)return{channel:"direct",refHost:""};try{let e=new URL(document.referrer);return e.origin===window.location.origin?{channel:"internal",refHost:e.hostname}:{channel:vn(e.hostname)?"search":"referral",refHost:e.hostname}}catch{return{channel:"referral",refHost:""}}}var mt=!1;function Ue(){if(mt||typeof document>"u")return;if(document.prerendering){document.addEventListener("prerenderingchange",()=>Ue(),{once:!0});return}mt=!0;let e=xn();bt({event:"pageview",path:window.location.pathname||"/",channel:e.channel,ref_host:e.refHost,vid:yn()})}function wn(e){let t=e.target&&e.target.closest?e.target.closest('a[data-track="plan-out"]'):null;t&&bt({event:"outbound",planId:t.dataset.planId||"",brand:t.dataset.brand||"",src:window.location.pathname||""})}var ft=!1;function ht(){ft||typeof document>"u"||(document.addEventListener("click",wn,{capture:!0}),ft=!0)}ht();Ue();function Ne(){let e=document.body.dataset.page||$n();dt(e),ut(),at(),Pn(),_n(),kn()}function $n(){let e=location.pathname;return e.startsWith("/brands/")?"brands/":e.startsWith("/plans/")?"index.html":e.split("/").pop()||"index.html"}function kn(){document.addEventListener("error",e=>{let t=e.target;t?.tagName!=="IMG"||!t.classList.contains("brand-icon-img")||(t.classList.add("hidden"),t.nextElementSibling?.classList.remove("hidden"))},!0)}function Pn(){let e=document.querySelectorAll(".site-nav-link");if(!e.length)return;let t=location.pathname.split("/").pop(),n=t===""||t==="/"?"index.html":t,r=a=>(a||"index").replace(/\.html$/,"")||"index";e.forEach(a=>{let o=a.dataset.pageLink||"index.html",s=r(o)===r(n);a.classList.toggle("is-current",s)})}function _n(){if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;let e=document.querySelectorAll("[data-animate]");if(!e.length)return;let t=new IntersectionObserver(n=>{n.forEach(r=>{if(r.isIntersecting){let a=r.target,o=a.dataset.animateDelay||"0";a.style.animationDelay=`${o}ms`,a.classList.add("animate-in"),t.unobserve(a)}})},{threshold:.08,rootMargin:"0px 0px -40px 0px"});e.forEach(n=>t.observe(n))}document.getElementById("header-root")?.hasAttribute("data-auto-init")&&Ne();var U="https://creditsplan.oss-cn-hangzhou.aliyuncs.com/brands/",gt=[{names:["OpenAI"]},{names:["Anthropic","Claude"]},{names:["Google","Gemini"]},{names:["Meta"]},{names:["Mistral"]},{names:["Microsoft"]},{names:["xAI"]},{names:["Perplexity"]},{names:["Hugging Face"]},{id:"deepseek",label:"DeepSeek",names:["DeepSeek"],iconUrl:`${U}reference-deepseek.png`,planOrder:2},{id:"bailian",label:"\u963F\u91CC\u4E91",names:["\u963F\u91CC\u4E91","\u963F\u91CC\u4E91\u767E\u70BC","\u901A\u4E49\u5343\u95EE","\u901A\u4E49"],vendorNames:["\u963F\u91CC\u4E91","\u901A\u4E49\u5343\u95EE","\u901A\u4E49"],iconUrl:`${U}reference-bailian.png`,planOrder:5},{id:"volcano-agentplan",label:"\u706B\u5C71\u5F15\u64CE",names:["\u706B\u5C71\u65B9\u821F","\u706B\u5C71\u5F15\u64CE","\u8C46\u5305"],iconUrl:`${U}reference-volcano-agentplan.png`,planOrder:1},{id:"zhipu-glm",label:"\u667A\u8C31",names:["\u667A\u8C31 GLM","\u667A\u8C31","\u667A\u8C31 BigModel","\u667A\u8C31BigModel"],vendorNames:["\u667A\u8C31 GLM","\u667A\u8C31"],iconUrl:`${U}reference-zhipu-glm.png`,planOrder:3},{id:"zhipu-glm-en",label:"Z.ai",names:["Z.ai"],iconUrl:`${U}reference-zhipu-glm-en.png`,planOrder:4},{id:"minimax",label:"MiniMax",names:["MiniMax"],iconUrl:`${U}reference-minimax.png`,planOrder:6},{id:"baidu-qianfan",label:"\u767E\u5EA6\u5343\u5E06",names:["\u767E\u5EA6\u5343\u5E06","\u767E\u5EA6"],iconUrl:`${U}baidu-qianfan.ico`,planOrder:7},{id:"tencent-hunyuan",label:"\u817E\u8BAF\u6DF7\u5143",names:["\u817E\u8BAF\u6DF7\u5143","\u817E\u8BAF"],iconUrl:`${U}tencent-hunyuan-20260726.svg`,planOrder:8},{id:"siliconflow",label:"\u7845\u57FA\u6D41\u52A8",names:["\u7845\u57FA\u6D41\u52A8"],iconUrl:`${U}siliconflow.ico`,planOrder:9},{id:"stepfun",label:"\u9636\u8DC3\u661F\u8FB0",names:["\u9636\u8DC3\u661F\u8FB0"],iconUrl:`${U}stepfun.svg`,planOrder:10},{id:"qoder",label:"Qoder",names:["Qoder"],iconUrl:`${U}qoder.svg`,planOrder:12},{id:"opencode",label:"OpenCode",names:["OpenCode"],iconUrl:"",planOrder:15},{id:"byteplus",label:"BytePlus",names:["BytePlus"],iconUrl:`${U}byteplus.png`,planOrder:14},{id:"trae",label:"Trae",names:["Trae"],vendorNames:[],iconUrl:`${U}trae.png`,planOrder:11},{id:"qoder-cn",label:"Qoder CN",names:["Qoder CN"],vendorNames:[],iconUrl:`${U}qoder-cn.svg`,planOrder:13},{id:"codebuddy",label:"CodeBuddy",names:["CodeBuddy"],iconUrl:`${U}codebuddy.svg`,planOrder:16}],Ie=gt.filter(e=>Number.isInteger(e.planOrder)).sort((e,t)=>e.planOrder-t.planOrder).map(e=>({id:e.id,label:e.label,providers:e.names,iconUrl:e.iconUrl})),S=Object.fromEntries(Ie.flatMap(e=>e.providers.map(t=>[t,e.label])));function J(e){let t=String(e??"").trim();if(!t)return;let n=Ie.find(o=>o.providers.includes(t));if(n)return n;let r,a=-1;for(let o of Ie)for(let s of o.providers)t.includes(s)&&s.length>a&&(r=o,a=s.length);return r}var Sn=gt.flatMap(e=>e.vendorNames??e.names);var xt=new Set(["\u5F85\u66F4\u65B0","\u5F85\u786E\u8BA4","\u8BF7\u4EE5\u5B98\u7F51\u4E3A\u51C6"]),Ln={agent_plan:"agent",api_package:"api",coding_plan:"coding",credits_plan:"credits",token_plan:"token"},Tn={coding:["coding","code"]};function wt(e,t={},n={}){return String(F(e,t,n).seo_slug||"").trim()}function $t(e,t){let n=String(e?.id||"").trim().toLowerCase(),r=String(t||"").trim().toLowerCase();if(!n||!r)return"";if(n===r||n.startsWith(`${r}-`))return n;let a=String(e.modelId||e.model_id||"").trim().toLowerCase();if(!a||!n.startsWith(`${a}-`))return n;let o=n.slice(a.length+1),s=Ln[e.planType||e.plan_type]||"";for(let i of Tn[s]||[s])if(i&&o.startsWith(`${i}-`)){o=o.slice(i.length+1);break}return[r,s,o].filter(Boolean).join("-")}function M(e){let t=String(e||"").trim();if(!t||/[\s]/.test(t))return"";let n=t.toLowerCase(),r=/^data:image\/svg\+xml;base64,[a-z0-9+/]+=*$/i.test(t);return t.startsWith("/")||n.startsWith("https://")||n.startsWith("http://")||r?t:""}function F(e,t={},n={}){let r=String(e||"").trim(),a=n[r]||r;return t[a]||t[r]||{}}function V(e,t={},n={}){let r=F(e,t,n);return String(r.name||e||"")}function Z(e,t={},n={}){let r=F(e,t,n).sort_order;return typeof r=="number"?r:1/0}function yt(e){let t=e?.sortOrder;return typeof t=="number"&&Number.isFinite(t)?t:1/0}function ne(e){return e.map((t,n)=>({plan:t,index:n})).sort((t,n)=>yt(t.plan)-yt(n.plan)||t.index-n.index).map(t=>t.plan)}function ge(e){return[e.id,e.modelId,e.provider,e.name].map(t=>String(t||"").trim()).join("::")}function Re(e,t){return t&&e.find(n=>ge(n)===t)||null}function se(e){let t=String(e??"").trim();return t&&!xt.has(t)?t:""}function vt(e){if(!e)return!0;let t=String(e).trim();return t?(t.match(/\?/g)||[]).length>t.length*.3:!0}function kt(e){if(e.riskText&&!vt(e.riskText))return e.riskText;if(e.risk&&Array.isArray(e.risk.risks)){let t=e.risk.risks.filter(n=>n&&!vt(n));if(t.length)return t.join("\uFF1B")}return""}function ee(e){let t=String(e.supportedModels||"").split(/[,，;；、\n]/)[0].trim();return se(t)}function Cn(e){if(Number.isFinite(e.monthlyPriceValue))return e.monthlyPriceValue;let t=parseFloat(String(e.monthlyPrice).match(/[\d.]+/)?.[0]);return Number.isFinite(t)?t:null}function Oe(e){return e.filter(t=>Cn(t)===0)}function ye(e,t={},n={}){return e.filter(r=>{let a=String(r.provider||"").trim(),o=n[a]||a;return t[o]!=null||t[a]!=null})}function Pt(e){return e==="USD"?"$":"\xA5"}function ve(e){return e.toLocaleString("zh-CN",{maximumFractionDigits:2})}function I(e){return se(e)!==""}function re(e){let t=String(e??"").trim();return t&&!xt.has(t)?t:""}function Fe(e){let t=String(e.monthlyCurrency||"").toUpperCase();if(t&&t!=="CNY")return!0;let n=String(e.marketRegion||"").toLowerCase();return n==="international"||n==="domestic_international"}function c(e){return e==null?"":String(e).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t])}function xe(e){if(e==null||!String(e).trim())return"";try{let t=new URL(String(e).trim());return t.username||t.password?"":t.protocol==="http:"||t.protocol==="https:"?t.href:""}catch{return""}}var de={coding_plan:"Coding Plan",token_plan:"Token Plan",agent_plan:"Agent Plan",credits_plan:"Credits Plan",api_package:"\u6309\u91CF\u4ED8\u8D39"};function Be(e){let t=String(e.planId||e.plan_id||e.raw?.planId||e.raw?.plan_id||"").trim(),n=String(e.brand||e.brandSlug||e.brand_slug||e.raw?.brand||e.raw?.brand_slug||t.split(".")[0]||"").trim();return`data-track="plan-out" data-plan-id="${c(t)}" data-brand="${c(n)}"`}function k(e,t,n,r){let a=re(n);a&&e.push({label:t,value:a,keepInline:r||!1})}function En(e){let t=re(e.notes);if(!t)return"";let n=re(e.resetRule);if(n&&t.includes(n))return"";let r=[e.name,V(e.provider),ee(e),e.monthlyPrice,e.quarterlyPrice,e.quarterlyMonthlyPrice,e.annualPrice,e.annualMonthlyPrice,e.statusLabel,e.lastVerifiedAt];for(let a of r){let o=re(a);if(!o)continue;if(t.includes(o))return"";let s=o.replace(/[\s年月季约/]/g,"");if(s.length>=2&&t.includes(s))return""}return t}function _t(e){let t=I(e.monthlyPrice),n=I(e.quarterlyPrice),r=I(e.annualPrice);if(!t&&!n&&!r)return"";if(r){let a=I(e.annualMonthlyPrice)?e.annualMonthlyPrice:e.annualPrice,o=n?`<div class="plan-price-subline"><span>\u8FDE\u7EED\u5305\u5B63</span><strong>${c(e.quarterlyPrice)}</strong></div>`:"",s=t?`<span class="plan-price-original">${c(e.monthlyPrice)}</span>`:"",i=t?`<div class="plan-price-subline"><span>\u8FDE\u7EED\u5305\u6708</span><strong>${c(e.monthlyPrice)}</strong></div>`:"";return`
      <div class="plan-price-block">
        <div class="plan-price-mainline">
          <span class="plan-price-label">\u8FDE\u7EED\u5305\u5E74</span>
          <span class="plan-price-main">${c(a)}</span>
          ${s}
        </div>
        <div class="plan-price-subline"><span>\u6309\u5E74\u8BA1\u8D39</span><strong>${c(e.annualPrice)}</strong></div>
        ${o}
        ${i}
      </div>`}if(n){let a=I(e.quarterlyMonthlyPrice)?e.quarterlyMonthlyPrice:e.quarterlyPrice,o=t?`<span class="plan-price-original">${c(e.monthlyPrice)}</span>`:"",s=t?`<div class="plan-price-subline"><span>\u8FDE\u7EED\u5305\u6708</span><strong>${c(e.monthlyPrice)}</strong></div>`:"";return`
      <div class="plan-price-block">
        <div class="plan-price-mainline">
          <span class="plan-price-label">\u8FDE\u7EED\u5305\u5B63</span>
          <span class="plan-price-main">${c(a)}</span>
          ${o}
        </div>
        <div class="plan-price-subline"><span>\u6309\u5B63\u8BA1\u8D39</span><strong>${c(e.quarterlyPrice)}</strong></div>
        ${s}
      </div>`}return`
    <div class="plan-price-block">
      <div class="plan-price-mainline">
        <span class="plan-price-label">\u8FDE\u7EED\u5305\u6708</span>
        <span class="plan-price-main">${c(e.monthlyPrice)}</span>
      </div>
    </div>`}function He(e){if(!e)return"";let t=de[e.planType]||e.planType||"",n=[],r=e.rmbRecharge&&e.rmbRecharge!=="\u5F85\u786E\u8BA4"&&e.rmbRecharge!=="\u8BF7\u4EE5\u5B98\u7F51\u4E3A\u51C6",a=e.invoice&&e.invoice!=="\u5F85\u786E\u8BA4"&&e.invoice!=="\u8BF7\u4EE5\u5B98\u7F51\u4E3A\u51C6";if(k(n,"\u5957\u9910\u7C7B\u578B",t,!0),k(n,"\u652F\u6301\u6A21\u578B",(e.supportedModelNames||[]).join("\u3001"),!0),e.firstMonthPrice!=null){let b=Number(e.firstMonthPrice);k(n,"\u9996\u6708\u4EF7\u683C",Number.isFinite(b)?`${Pt(e.monthlyCurrency||"CNY")}${ve(b)}`:e.firstMonthPrice)}e.domesticPayment&&k(n,"\u56FD\u5185\u652F\u4ED8","\u652F\u6301",!0),k(n,"\u5305\u542B\u8C03\u7528\u91CF",e.includedCalls,!0);let o=re(e.fiveHoursRequests),s=re(e.weeklyRequests);if(o||s){let b=[o?`5\u5C0F\u65F6\u8BF7\u6C42 ${o}`:"",s?`\u5468\u8BF7\u6C42 ${s}`:""].filter(Boolean).join("  \xB7  ");k(n,"\u8BF7\u6C42\u9891\u7387",b)}k(n,"\u6708\u8BF7\u6C42",e.monthlyRequests),k(n,"5\u5C0F\u65F6\u5B9E\u6D4B Tokens",e.measuredFiveHoursTokens),k(n,"\u5468\u5B9E\u6D4B Tokens",e.measuredWeeklyTokens),k(n,"\u6708\u5B9E\u6D4B Tokens",e.measuredMonthlyTokens),k(n,"Token\u4E0A\u9650",e.tokenLimit),k(n,"\u6743\u76CA",e.benefits),k(n,"\u8F93\u5165\u4EF7\u683C",e.modelInputPrice),k(n,"\u8F93\u51FA\u4EF7\u683C",e.modelOutputPrice),e.monthlyCurrency==="USD"?k(n,"\u652F\u4ED8\u5E01\u79CD",e.monthlyCurrencyLabel||"\u7F8E\u5143"):r&&k(n,"\u4EBA\u6C11\u5E01\u5145\u503C",e.rmbRecharge),a&&k(n,"\u53D1\u7968\u652F\u6301",e.invoice),k(n,"Credits\u9650\u5236",e.creditsLimit,!0),k(n,"\u5E76\u53D1\u9650\u5236",e.concurrencyLimit),k(n,"\u5237\u65B0\u89C4\u5219",e.resetRule),k(n,"\u9000\u6B3E\u653F\u7B56",e.refundPolicy),k(n,"\u8BC4\u5206",e.rating),k(n,"\u6807\u7B7E",e.tags),k(n,"\u9002\u7528\u573A\u666F",e.suitableFor),k(n,"\u9002\u5408",e.recommendationText),k(n,"\u6CE8\u610F",kt(e)),k(n,"\u5907\u6CE8",En(e));let i=n.length?n.map(b=>{let m=b.value.length>40||b.label==="\u5237\u65B0\u89C4\u5219"||b.label==="\u5907\u6CE8"||b.label==="\u6CE8\u610F"||b.label==="\u9002\u5408";return`
    <div class="${b.keepInline?"plan-extra-item plan-extra-inline":m?"plan-extra-item plan-extra-wide":"plan-extra-item plan-extra-inline"}">
      <span class="plan-extra-label">${c(b.label)}</span>
      <span class="plan-extra-value">${c(b.value)}</span>
    </div>`}).join(""):'<p class="plan-extra-empty">\u6682\u65E0\u8868\u683C\u5916\u8865\u5145\u4FE1\u606F\u3002</p>',d=xe(e.url),p=e.lastVerifiedAt?`\u6570\u636E\u6765\u6E90\uFF1A${c(e.sourceType||"\u540E\u53F0\u7EF4\u62A4")} \xB7 \u6838\u5BF9\u65E5\u671F ${c(e.lastVerifiedAt)}`:"",y=p||d?`<div class="selected-plan-detail-footer">
        <span>${p}</span>
        ${d?`<a href="${c(d)}" target="_blank" rel="noopener noreferrer nofollow" ${Be(e)}>\u6253\u5F00\u5B98\u7F51</a>`:""}
       </div>`:"";return`
    <section class="selected-plan-detail" aria-live="polite">
      <div class="plan-detail-header selected-plan-detail-header"></div>
      <div class="selected-plan-detail-body">
        <div class="plan-extra-list">
          ${i}
        </div>
        ${y}
      </div>
    </section>
  `}var ke=[{key:"brand",label:"\u54C1\u724C"},{key:"name",label:"\u5957\u9910\u540D\u79F0"},{key:"planType",label:"\u5957\u9910\u7C7B\u578B"},{key:"monthlyPrice",label:"\u8FDE\u7EED\u5305\u6708"},{key:"quarterlyPrice",label:"\u8FDE\u7EED\u5305\u5B63"},{key:"annualPrice",label:"\u8FDE\u7EED\u5305\u5E74"},{key:"model",label:"\u4EE3\u8868\u6A21\u578B"},{key:"status",label:"\u72B6\u6001"},{key:"verifiedAt",label:"\u6838\u5BF9\u65E5\u671F"},{key:"url",label:"\u6765\u6E90\u94FE\u63A5"}],Mn=[14,30,12,12,12,12,34,10,12,42],Pe=[{key:"name",label:"\u6A21\u578B"},{key:"provider",label:"\u5382\u5546"},{key:"context",label:"\u4E0A\u4E0B\u6587"},{key:"inputPrice",label:"\u8F93\u5165\u4EF7\uFF08\xA5/\u767E\u4E07 tokens\uFF09"},{key:"outputPrice",label:"\u8F93\u51FA\u4EF7\uFF08\xA5/\u767E\u4E07 tokens\uFF09"},{key:"docsUrl",label:"\u5B98\u65B9\u6587\u6863"}],An=[28,14,12,22,22,42],Dn=["20%","12%","10%","14%","14%","30%"],Un=[.2,.12,.1,.14,.14,.3],Lt="\u56FD\u5185 AI \u6A21\u578B\u4EF7\u683C\u5BF9\u6BD4";function pe(e){if(e==null||e==="")return null;let t=Number(e);return Number.isFinite(t)?t:null}function Nn(e){let t=pe(e);return t==null?"":t>=1e6?`${(t/1e6).toLocaleString("zh-CN",{maximumFractionDigits:1})}M`:t>=1e3?`${(t/1e3).toLocaleString("zh-CN",{maximumFractionDigits:0})}K`:String(t)}function je(e){return e.filter(t=>pe(t.raw?.input_price)!=null||pe(t.raw?.output_price)!=null).map(t=>{let n=pe(t.raw?.input_price),r=pe(t.raw?.output_price);return{name:t.modelName||"",provider:S[t.vendor]||t.vendor||"",context:Nn(t.raw?.context_length),inputPrice:n!=null?`\xA5${n.toLocaleString("zh-CN",{maximumFractionDigits:4})}`:"",outputPrice:r!=null?`\xA5${r.toLocaleString("zh-CN",{maximumFractionDigits:4})}`:"",docsUrl:t.sourceUrl||""}})}function We(e,t){let n=new Map;for(let o of e){let s=String(o.provider||"").trim();n.has(s)||n.set(s,[]),n.get(s).push(o)}let r=[...n.keys()].sort((o,s)=>Z(o,t,S)-Z(s,t,S)),a=[];for(let o of r){let s=V(o,t,S),i=ne(n.get(o));for(let d of i)a.push({brand:s,name:d.name||"",planType:de[d.planType]||d.planType||"",monthlyPrice:qe(d.monthlyPrice),quarterlyPrice:qe(d.quarterlyPrice),annualPrice:qe(d.annualPrice),model:ee(d)||"",status:d.statusLabel||"",verifiedAt:d.lastVerifiedAt||"\u5F85\u6838\u5BF9",url:d.url||""})}return a}function qe(e){let t=String(e??"").trim();return!t||t==="\u5F85\u66F4\u65B0"||t==="\u5F85\u786E\u8BA4"||t==="\u8BF7\u4EE5\u5B98\u7F51\u4E3A\u51C6"?"":t}function le(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function ie(){let e=new Date,t=n=>String(n).padStart(2,"0");return`${e.getFullYear()}${t(e.getMonth()+1)}${t(e.getDate())}_${t(e.getHours())}${t(e.getMinutes())}`}function ce(e,t){let n=URL.createObjectURL(e),r=document.createElement("a");r.href=n,r.download=t,document.body.appendChild(r),r.click(),r.remove(),setTimeout(()=>URL.revokeObjectURL(n),5e3)}var In=(()=>{let e=new Uint32Array(256);for(let t=0;t<256;t++){let n=t;for(let r=0;r<8;r++)n=n&1?3988292384^n>>>1:n>>>1;e[t]=n>>>0}return e})();function Rn(e){let t=4294967295;for(let n=0;n<e.length;n++)t=In[(t^e[n])&255]^t>>>8;return(t^4294967295)>>>0}function On(e){let t="",n=e;for(;n>=0;)t=String.fromCharCode(65+n%26)+t,n=Math.floor(n/26)-1;return t}function Fn(e,t){let n=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">`;return t&&t.length&&(n+="<cols>",t.forEach((r,a)=>{n+=`<col min="${a+1}" max="${a+1}" width="${r}" customWidth="1"/>`}),n+="</cols>"),n+="<sheetData>",e.forEach((r,a)=>{n+=`<row r="${a+1}">`,r.forEach((o,s)=>{let i=On(s)+(a+1);n+=`<c r="${i}" t="inlineStr"><is><t xml:space="preserve">${le(String(o??""))}</t></is></c>`}),n+="</row>"}),`${n}</sheetData></worksheet>`}function Bn(e){let t=new TextEncoder,n=[],r=[],a=0;for(let y of e){let b=t.encode(y.name),m=t.encode(y.data),w=Rn(m),$=new Uint8Array(30+b.length+m.length),v=new DataView($.buffer);v.setUint32(0,67324752,!0),v.setUint16(4,20,!0),v.setUint16(6,2048,!0),v.setUint32(14,w,!0),v.setUint32(18,m.length,!0),v.setUint32(22,m.length,!0),v.setUint16(26,b.length,!0),$.set(b,30),$.set(m,30+b.length),n.push($);let P=new Uint8Array(46+b.length),h=new DataView(P.buffer);h.setUint32(0,33639248,!0),h.setUint16(4,20,!0),h.setUint16(6,20,!0),h.setUint16(8,2048,!0),h.setUint32(16,w,!0),h.setUint32(20,m.length,!0),h.setUint32(24,m.length,!0),h.setUint16(28,b.length,!0),h.setUint32(42,a,!0),P.set(b,46),r.push(P),a+=$.length}let o=r.reduce((y,b)=>y+b.length,0),s=new Uint8Array(22),i=new DataView(s.buffer);i.setUint32(0,101010256,!0),i.setUint16(8,e.length,!0),i.setUint16(10,e.length,!0),i.setUint32(12,o,!0),i.setUint32(16,a,!0);let d=new Uint8Array(a+o+22),p=0;for(let y of n)d.set(y,p),p+=y.length;for(let y of r)d.set(y,p),p+=y.length;return d.set(s,p),new Blob([d],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"})}function Tt(e,t,n){let r=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/></Types>`,a=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>`,o=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="${le(t)}" sheetId="1" r:id="rId1"/></sheets></workbook>`;return Bn([{name:"[Content_Types].xml",data:r},{name:"_rels/.rels",data:a},{name:"xl/workbook.xml",data:o},{name:"xl/_rels/workbook.xml.rels",data:`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/></Relationships>`},{name:"xl/worksheets/sheet1.xml",data:Fn(e,n)}])}function Ct(e,t){let n=We(e,t);if(!n.length)return!1;let r=[ke.map(o=>o.label),...n.map(o=>ke.map(s=>o[s.key]))],a=Tt(r,"\u5957\u9910\u6570\u636E",Mn);return ce(a,`creditsplan_\u5957\u9910\u6570\u636E_${ie()}.xlsx`),!0}function Et(e){let t=je(e);if(!t.length)return!1;let n=[Pe.map(a=>a.label),...t.map(a=>Pe.map(o=>a[o.key]))],r=Tt(n,"\u6A21\u578B\u4EF7\u683C",An);return ce(r,`creditsplan_\u6A21\u578B\u4EF7\u683C_${ie()}.xlsx`),!0}var Hn=["9%","15%","9%","8%","8%","8%","13%","6%","8%","16%"];function Mt(e,t,n,r){let a=t.map((i,d)=>`<th style="width:${n[d]}">${le(i.label)}</th>`).join(""),o=r.map(i=>`<tr>${t.map(d=>`<td>${le(i[d.key])}</td>`).join("")}</tr>`).join(`
`),s=new Date().toLocaleDateString("zh-CN");return`<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word">
<head><meta charset="UTF-8"><title>${le(e)}</title>
<!--[if gte mso 9]><xml><w:WordDocument><w:View>Print</w:View><w:Zoom>100</w:Zoom></w:WordDocument></xml><![endif]-->
<style>
@page WordSection1 {size: 841.9pt 595.3pt; mso-page-orientation: landscape; margin: 36pt 36pt 36pt 36pt;}
div.WordSection1 {page: WordSection1;}
body{font-family:"Microsoft YaHei","PingFang SC",sans-serif;font-size:11px;color:#1e293b;}
h1{font-size:18px;margin-bottom:4px;}
p.meta{color:#64748b;font-size:10px;margin-top:0;}
table{border-collapse:collapse;width:100%;table-layout:fixed;}
th,td{border:1px solid #cbd5e1;padding:4px 6px;text-align:left;vertical-align:top;word-wrap:break-word;word-break:break-all;}
th{background:#f1f5f9;font-weight:bold;white-space:nowrap;}
</style></head>
<body>
<div class="WordSection1">
<h1>${le(e)}</h1>
<p class="meta">\u6570\u636E\u6765\u6E90\uFF1Acreditsplan.cn \xB7 \u5BFC\u51FA\u65E5\u671F\uFF1A${s} \xB7 \u5171 ${r.length} \u6761\u8BB0\u5F55 \xB7 \u771F\u5B9E\u4EF7\u683C\u8BF7\u4EE5\u5382\u5546\u5B98\u7F51\u4E3A\u51C6</p>
<table><thead><tr>${a}</tr></thead><tbody>
${o}
</tbody></table>
</div>
</body></html>`}function At(e,t){let n=We(e,t);if(!n.length)return!1;let r=Mt("\u56FD\u5185 AI Coding \u5957\u9910\u5BF9\u6BD4\u6570\u636E",ke,Hn,n),a=new Blob(["\uFEFF",r],{type:"application/msword;charset=utf-8"});return ce(a,`creditsplan_\u5957\u9910\u6570\u636E_${ie()}.doc`),!0}function Dt(e){let t=je(e);if(!t.length)return!1;let n=Mt(Lt,Pe,Dn,t),r=new Blob(["\uFEFF",n],{type:"application/msword;charset=utf-8"});return ce(r,`creditsplan_\u6A21\u578B\u4EF7\u683C_${ie()}.doc`),!0}var $e=842,we=595,A=36,qn=52,Ve=14,St=5,ue=24,ze='11px "Microsoft YaHei","PingFang SC","Noto Sans SC",sans-serif',Vn='bold 11px "Microsoft YaHei","PingFang SC","Noto Sans SC",sans-serif',zn='bold 16px "Microsoft YaHei","PingFang SC","Noto Sans SC",sans-serif',jn=[.09,.15,.09,.08,.08,.08,.13,.06,.08,.16];function Wn(e){let t=$e-A*2;return e.map(n=>t*n)}function Gn(e,t,n){let r=String(t||"");if(!r)return[""];if(e.measureText(r).width<=n)return[r];let a=[],o="";for(let s of r)o&&e.measureText(o+s).width>n?(a.push(o),o=s):o+=s;return o&&a.push(o),a}function Ut(e,t,n,r){let a=Wn(r),o=$e-A*2,s=A+qn,i=we-A-24,d=document.createElement("canvas").getContext("2d");d.font=ze;let p=e.map(v=>{let P=n.map((E,L)=>Gn(d,v[E.key],a[L]-10)),h=Math.max(1,...P.map(E=>E.length));return{cells:P,height:h*Ve+St*2}}),y=[],b=[],m=0;for(let v of p)b.length&&m+v.height>i-s-ue&&(y.push(b),b=[],m=0),b.push(v),m+=v.height;b.length&&y.push(b);let w=y.length,$=[];for(let v=0;v<w;v++){let P=document.createElement("canvas");P.width=$e*2,P.height=we*2;let h=P.getContext("2d");h.scale(2,2),h.fillStyle="#ffffff",h.fillRect(0,0,$e,we),h.fillStyle="#0f172a",h.font=zn,h.fillText(t,A,A+18),h.font=ze,h.fillStyle="#64748b";let E=new Date().toLocaleDateString("zh-CN");h.fillText(`\u6570\u636E\u6765\u6E90\uFF1Acreditsplan.cn \xB7 \u5BFC\u51FA\u65E5\u671F\uFF1A${E} \xB7 \u7B2C ${v+1}/${w} \u9875`,A,A+38);let L=s;h.fillStyle="#f1f5f9",h.fillRect(A,L,o,ue),h.strokeStyle="#cbd5e1",h.lineWidth=.5,h.strokeRect(A,L,o,ue),h.font=Vn,h.fillStyle="#1e293b",h.textBaseline="middle";let D=A;for(let T=0;T<n.length;T++)h.fillText(n[T].label,D+5,L+ue/2),D+=a[T];L+=ue,h.font=ze;let q=y[v];for(let T=0;T<q.length;T++){let N=q[T];T%2===1&&(h.fillStyle="#f8fafc",h.fillRect(A,L,o,N.height)),h.strokeStyle="#e2e8f0",h.strokeRect(A,L,o,N.height),D=A,h.fillStyle="#334155";for(let R=0;R<n.length;R++){let K=N.cells[R];for(let X=0;X<K.length;X++)h.fillText(K[X],D+5,L+St+X*Ve+Ve/2);D+=a[R]}L+=N.height}for(let T=0;T<=n.length;T++){let N=A+a.slice(0,T).reduce((R,K)=>R+K,0);h.strokeStyle="#e2e8f0",h.beginPath(),h.moveTo(N,s),h.lineTo(N,L),h.stroke()}h.fillStyle="#94a3b8",h.font="10px sans-serif",h.textBaseline="alphabetic",h.fillText("\u771F\u5B9E\u4EF7\u683C\u8BF7\u4EE5\u5382\u5546\u5B98\u7F51\u4E3A\u51C6 \u2014 creditsplan.cn",A,we-16),$.push(P.toDataURL("image/jpeg",.92))}return $}function Nt(e){let t=[],n=[],r=1,a=r++,o=r++;for(let m of e){let w=atob(m.split(",")[1]),$=r++,v=r++;n.push(v),t.push({id:$,data:`<< /Type /XObject /Subtype /Image /Width 1684 /Height 1190 /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${w.length} >>
stream
${w}
endstream`}),t.push({id:v,data:`<< /Type /Page /Parent ${o} 0 R /MediaBox [0 0 842 595] /Contents ${r} 0 R /Resources << /XObject << /Im0 ${$} 0 R >> >> >>`});let P="q 842 0 0 595 0 0 cm /Im0 Do Q";t.push({id:r++,data:`<< /Length ${P.length} >>
stream
${P}
endstream`})}let s=n.map(m=>`${m} 0 R`).join(" ");t.unshift({id:o,data:`<< /Type /Pages /Kids [${s}] /Count ${n.length} >>`},{id:a,data:`<< /Type /Catalog /Pages ${o} 0 R >>`}),t.sort((m,w)=>m.id-w.id);let i=`%PDF-1.4
`,d=new Map;for(let m of t)d.set(m.id,i.length),i+=`${m.id} 0 obj
${m.data}
endobj
`;let p=i.length,y=t.length;i+=`xref
0 ${y+1}
0000000000 65535 f 
`;for(let m of t)i+=`${String(d.get(m.id)).padStart(10,"0")} 00000 n 
`;i+=`trailer
<< /Size ${y+1} /Root ${a} 0 R >>
startxref
${p}
%%EOF`;let b=new Uint8Array(i.length);for(let m=0;m<i.length;m++)b[m]=i.charCodeAt(m)&255;return new Blob([b],{type:"application/pdf"})}function It(e,t){let n=We(e,t);if(!n.length)return!1;let r=Ut(n,"\u56FD\u5185 AI Coding \u5957\u9910\u5BF9\u6BD4\u6570\u636E",ke,jn),a=Nt(r);return ce(a,`creditsplan_\u5957\u9910\u6570\u636E_${ie()}.pdf`),!0}function Rt(e){let t=je(e);if(!t.length)return!1;let n=Ut(t,Lt,Pe,Un),r=Nt(n);return ce(r,`creditsplan_\u6A21\u578B\u4EF7\u683C_${ie()}.pdf`),!0}var Yn=new Set(["\u5F85\u66F4\u65B0","\u5F85\u786E\u8BA4","\u8BF7\u4EE5\u5B98\u7F51\u4E3A\u51C6"]);function _e(e){let t=String(e??"").trim();return t&&!Yn.has(t)?t:"\u2014"}function me(e="",t=""){let n=String(t??"").trim();return{column:n?String(e??"").trim():"",value:n}}function Ge(e){return!!(e?.column&&e?.value)}function Ot(e,t,n){return Ge(t)?e.filter(r=>n(r,t.column)===t.value):e}var Ye=[{key:"provider",label:"\u54C1\u724C",value:e=>V(e.provider)||"\u2014"},{key:"name",label:"\u5957\u9910\u540D\u79F0",value:e=>se(e.name)||"\u2014"},{key:"monthlyPrice",label:"\u8FDE\u7EED\u5305\u6708",value:e=>_e(e.monthlyPrice)},{key:"quarterlyPrice",label:"\u8FDE\u7EED\u5305\u5B63",value:e=>_e(e.quarterlyPrice)},{key:"annualPrice",label:"\u8FDE\u7EED\u5305\u5E74",value:e=>_e(e.annualPrice)},{key:"model",label:"\u4EE3\u8868\u6A21\u578B",value:e=>ee(e)||"\u2014"},{key:"status",label:"\u72B6\u6001",value:e=>se(e.statusLabel)||"\u2014"},{key:"verifiedAt",label:"\u6838\u5BF9\u65E5\u671F",value:e=>se(e.lastVerifiedAt)||"\u5F85\u6838\u5BF9"},{key:"source",label:"\u6765\u6E90",value:e=>e.url?"\u5B98\u7F51":"\u2014"}],j=me(),Kn=new Intl.Collator("zh-CN",{numeric:!0,sensitivity:"base"});function Ke(e){return Ye.find(t=>t.key===e)}function Ft(e,t){let n=Ke(t);return n?String(n.value(e)||"").trim()||"\u2014":""}function Xe(){j=me()}function Le(){return Ge(j)&&!!Ke(j.column)}function Bt(e){return Le()?Ot(e,j,Ft):e}function Xn(e,t){let n=new Map;for(let r of e){let a=Ft(r,t.key);n.set(a,(n.get(a)||0)+1)}return Array.from(n.entries()).map(([r,a])=>({value:r,count:a})).sort((r,a)=>r.value==="\u2014"&&a.value!=="\u2014"?1:a.value==="\u2014"&&r.value!=="\u2014"?-1:Kn.compare(r.value,a.value))}function Ht(e,t){let n=j.column===e.key&&!!j.value,r=Xn(t,e);return`
    <th scope="col" class="plan-column-filter break-words px-3 py-3 text-left font-semibold text-slate-900 dark:text-white">
      <button type="button" class="plan-column-filter-trigger${n?" is-active":""}" data-plan-filter-column="${c(e.key)}" aria-haspopup="menu" aria-expanded="false" title="\u7B5B\u9009${c(e.label)}">
        <span class="plan-column-filter-label">${c(e.label)}</span>
        <span class="plan-column-filter-caret" aria-hidden="true"></span>
      </button>
      <div class="plan-column-filter-menu" data-plan-filter-menu="${c(e.key)}" role="menu" hidden>
        <button type="button" class="plan-column-filter-option${n?"":" is-active"}" data-plan-filter-value="">
          <span class="plan-column-filter-option-label">\u5168\u90E8</span>
          <span class="plan-column-filter-option-count">${t.length}</span>
        </button>
        ${r.map(a=>`
          <button type="button" class="plan-column-filter-option${n&&a.value===j.value?" is-active":""}" data-plan-filter-value="${c(a.value)}">
            <span class="plan-column-filter-option-label">${c(a.value)}</span>
            <span class="plan-column-filter-option-count">${a.count}</span>
          </button>
        `).join("")}
      </div>
    </th>
  `}function qt(e,t){if(!Le())return"";let n=Ke(j.column);return`
    <div class="plan-table-filter-summary">
      <span class="plan-table-filter-chip">
        <span>${c(n.label)}</span>
        <strong>${c(j.value)}</strong>
      </span>
      <span class="plan-table-filter-count">${e.length} / ${t.length} \u6761</span>
      <button type="button" class="plan-table-filter-clear" data-plan-filter-clear>\u6E05\u9664</button>
    </div>
  `}function Se(e){e&&(e.querySelectorAll(".plan-column-filter-menu").forEach(t=>{t.hidden=!0}),e.querySelectorAll("[data-plan-filter-column]").forEach(t=>{t.setAttribute("aria-expanded","false")}))}function Vt(e,t,n,r){e.addEventListener("click",a=>{let o=a.target.closest("[data-plan-filter-column]");if(o&&e.contains(o)){let p=o.closest(".plan-column-filter")?.querySelector(".plan-column-filter-menu");if(!p)return;let y=!p.hidden;Se(e),y||(p.hidden=!1,o.setAttribute("aria-expanded","true"));return}let s=a.target.closest("[data-plan-filter-value]");if(s&&e.contains(s)){let p=s.closest("[data-plan-filter-menu]"),y=s.dataset.planFilterValue||"";j=p&&y?me(p.dataset.planFilterMenu,y):me(),n();return}let i=a.target.closest("[data-plan-filter-clear]");if(i&&e.contains(i)){Xe(),n();return}let d=a.target.closest("[data-plan-key]");if(d&&e.contains(d)&&!a.target.closest("a")){let p=d.dataset.planKey||"";Re(t(),p)&&r(p);return}a.target.closest(".plan-column-filter")||Se(e)}),e.addEventListener("keydown",a=>{let o=a.target.closest("[data-plan-key]");if(!o||!e.contains(o)||a.target.closest("a")||a.key!=="Enter"&&a.key!==" ")return;a.preventDefault();let s=o.dataset.planKey||"";Re(t(),s)&&r(s)}),document.addEventListener("click",a=>{e.contains(a.target)||Se(e)}),document.addEventListener("keydown",a=>{a.key==="Escape"&&Se(e)})}var Te=2;function Qn(e,t){let n=wt(e.provider,t,S),r=$t(e,n);return r?`/plans/${encodeURIComponent(r)}/`:""}function Jn(e,t){let n=F(e,t,S),r=String(n.seo_slug||"").trim(),a=String(n.seo_intro||"").trim(),o=String(n.icon_url||"").trim();return r&&a&&o?`/brands/${encodeURIComponent(r)}/`:""}function Zn(e,t={}){let n=F(e.provider,t,S);return M(n.icon_url)||M(e.providerIconUrl)||M(J(e.provider)?.iconUrl)}function Y(e,t,n="brand-icon"){let r=M(e),a=String(t||"?").trim().slice(0,1).toUpperCase()||"?",o=r?"brand-icon-fallback hidden":"brand-icon-fallback";return`<span class="${n}" aria-hidden="true">
    ${r?`<img class="brand-icon-img" src="${c(r)}" alt="" loading="lazy" referrerpolicy="no-referrer">`:""}
    <span class="${o}">${c(a)}</span>
  </span>`}function jt(e,t){let n=new Map;for(let a of e){let o=n.get(a.provider);o||(o={provider:a.provider,label:V(a.provider,t,S),iconUrl:Zn(a,t),brandHref:Jn(a.provider,t),plans:[]},n.set(a.provider,o)),o.plans.push(a)}let r=[...n.values()];for(let a of r)a.plans=ne(a.plans);return r.sort((a,o)=>Z(a.provider,t,S)-Z(o.provider,t,S)),r}function er(e){return e.status==="available"||e.statusLabel==="\u53EF\u7528"||e.statusLabel==="\u53EF\u8D2D\u4E70"}function tr(e){let t=null;for(let n of e){let r=null;if(Number.isFinite(n.monthlyPriceValue))r=n.monthlyPriceValue;else{let a=String(n.monthlyPrice||"").match(/[\d.]+/),o=a?parseFloat(a[0]):NaN;Number.isFinite(o)&&(r=o)}r==null||r<0||(t==null||r<t)&&(t=r)}return t}function nr(e){let t=tr(e.plans),n=e.plans.filter(er).length,r=[];t!=null&&r.push(t===0?"\u514D\u8D39\u8D77":`\xA5${ve(t)} \u8D77`),n>0&&r.push(`${n} \u4E2A\u53EF\u7528`);let a=r.join(" \xB7 ");return`<span class="plan-table-group-summary">${c(a)}</span>`}function Wt(e){return e.status==="available"||e.statusLabel==="\u53EF\u7528"||e.statusLabel==="\u53EF\u8D2D\u4E70"?"bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300":e.status==="rush_sale"?"bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400":"bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"}function rr(e,t="",n="",r=!1){let a=Wt(e),o=e.includedCalls&&e.includedCalls.length>10&&(e.includedCalls.includes("\xA5")||e.includedCalls.includes("\u5143")||e.includedCalls.includes("\u767E\u4E07")),s=de[e.planType]||e.planType||"",i,d=_t(e);return d?i=d:o?i=`<span class="text-sm font-semibold text-slate-700 dark:text-slate-300">${c(e.includedCalls)}</span>`:e.includedCalls||e.planType!=="api-usage"?i='<span class="text-lg font-bold text-slate-500 dark:text-slate-400">\u8BF7\u4EE5\u5B98\u7F51\u4E3A\u51C6</span>':i='<span class="text-lg font-bold text-slate-400 dark:text-slate-500">\u6309\u91CF\u8BA1\u8D39</span>',`
    <div class="plan-card">
      <div class="plan-card-head">
        <div class="plan-card-title-row flex items-start justify-between gap-2">
          <div class="flex min-w-0 flex-1 items-start gap-2">
            ${t}
            <div class="min-w-0 flex-1">
              <p class="plan-card-title">${c(e.name)}</p>
            </div>
          </div>
          <div class="plan-card-meta flex shrink-0 flex-col items-end gap-1.5">
            <span class="whitespace-nowrap rounded-md px-2 py-0.5 text-xs font-medium ${a}">${c(e.statusLabel)}</span>
            ${n}
            ${s?`<span class="whitespace-nowrap rounded-md bg-brand-50 px-1.5 py-0.5 text-[10px] font-medium text-brand-600 dark:bg-brand-950/40 dark:text-brand-300">${c(s)}</span>`:""}
          </div>
          <span class="plan-card-disclosure" aria-hidden="true">
            <span>${r?"\u6536\u8D77\u8BE6\u60C5":"\u67E5\u770B\u8BE6\u60C5"}</span>
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="m6 8 4 4 4-4" />
            </svg>
          </span>
        </div>
        <div class="plan-card-price-row mt-3 flex items-baseline gap-1.5">
          ${i}
        </div>
      </div>
    </div>
  `}function ar(e,t,n,r,a){return e.length?jt(e,n).map(o=>{let s=a||r.has(o.provider),d=(s?o.plans:o.plans.slice(0,Te)).map(m=>{let w=ge(m),$=w===t,v=m.confidenceScore,P="trust-dot--yellow";v&&v>=.8?P="trust-dot--high":v&&v<.5&&(P="trust-dot--red");let h=[m.domesticPayment?'<span class="plan-card-badge">\u652F\u6301\u56FD\u5185\u652F\u4ED8</span>':"",Fe(m)?`<span class="plan-card-badge plan-card-badge--intl" title="\u56FD\u9645\u7AD9\u5957\u9910\uFF0C\u4EE5\u7F8E\u5143\u7ED3\u7B97\uFF0C\u8BF7\u8DF3\u8F6C creditsplan.com \u67E5\u770B">\u56FD\u9645 \xB7 ${c(String(m.monthlyCurrency||"USD").toUpperCase())}</span>`:""].filter(Boolean).join(""),E=`<span class="trust-dot ${P}" title="\u53EF\u4FE1\u5EA6: ${v!=null?Math.round(v*100)+"%":"\u672A\u77E5"}"></span>`;return`
        <article class="plan-card-mobile${$?" is-selected":""}">
          <div class="plan-card-toggle" role="button" tabindex="0" data-plan-key="${c(w)}" aria-expanded="${$?"true":"false"}">
            ${rr(m,E,h,$)}
          </div>
          ${$?He(m):""}
        </article>`}).join(""),p=Math.max(0,o.plans.length-Te),y=!a&&p>0?`<button type="button" class="plan-group-toggle" data-plan-group-toggle="${c(o.provider)}" aria-expanded="${s?"true":"false"}">${s?"\u6536\u8D77\u591A\u4F59\u5957\u9910":`\u67E5\u770B\u5176\u4F59 ${p} \u4E2A\u5957\u9910`}</button>`:"",b=`${Y(o.iconUrl,o.label,"brand-icon brand-icon--section")}
          <h3 class="text-sm font-bold text-brand-800 dark:text-brand-200">${c(o.label)}</h3>`;return`
      <section class="plan-card-group">
        <div class="mb-2 flex items-center gap-2">
          ${o.brandHref?`<a href="${c(o.brandHref)}" class="plan-group-brand-link">${b}</a>`:b}
          <span class="rounded-full bg-brand-100 px-1.5 py-0.5 text-xs font-medium text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">${o.plans.length}</span>
        </div>
        <div class="plan-card-grid">
          ${d}
        </div>
        ${y}
      </section>`}).join(""):""}function zt(e,t,n,r,a=Te){let o=n?e.plans:e.plans.slice(0,a);return o.length?o.map(s=>{let i=ge(s),d=i===t,p=Wt(s),y=I(s.monthlyPrice)?c(s.monthlyPrice):'<span class="text-slate-400">\u2014</span>',b=I(s.quarterlyPrice)?`<div>${c(s.quarterlyPrice)}</div>${I(s.quarterlyMonthlyPrice)?`<div class="plan-table-price-sub">\u7EA6 ${c(s.quarterlyMonthlyPrice)}</div>`:""}`:'<span class="text-slate-400">\u2014</span>',m=I(s.annualPrice)?`<div>${c(s.annualPrice)}</div>${I(s.annualMonthlyPrice)?`<div class="plan-table-price-sub">\u7EA6 ${c(s.annualMonthlyPrice)}</div>`:""}`:'<span class="text-slate-400">\u2014</span>',w=s.lastVerifiedAt?`<span class="text-xs text-slate-600 dark:text-slate-400">${c(s.lastVerifiedAt)}</span>`:'<span class="text-xs text-slate-400">\u5F85\u6838\u5BF9</span>',$=xe(s.url),v=$?`<a href="${c($)}" target="_blank" rel="noopener noreferrer nofollow" ${Be(s)} class="text-sm font-medium text-brand-600 hover:text-brand-800 dark:text-brand-400 dark:hover:text-brand-300">\u5B98\u7F51 \u2192</a>`:'<span class="text-slate-400">\u2014</span>',P=d?`<tr class="plan-detail-row">
          <td colspan="9" class="plan-inline-detail-cell">
            ${He(s)}
          </td>
        </tr>`:"",h=Qn(s,r),E=c(s.name),L=Fe(s)?` <span class="plan-intl-tag" title="\u56FD\u9645\u7AD9\u5957\u9910\uFF0C\u4EE5\u7F8E\u5143\u7ED3\u7B97\uFF0C\u8BF7\u8DF3\u8F6C creditsplan.com \u67E5\u770B">\u56FD\u9645 \xB7 ${c(String(s.monthlyCurrency||"USD").toUpperCase())}</span>`:"",D=(h?`<a href="${c(h)}" class="font-medium text-brand-700 hover:text-brand-900 hover:underline dark:text-brand-300 dark:hover:text-brand-200">${E}</a>`:E)+L,q=`${Y(e.iconUrl,e.label,"brand-icon brand-icon--table")}<span>${c(e.label)}</span>`,T=e.brandHref?`<a href="${c(e.brandHref)}" class="plan-provider-cell plan-provider-cell--link">${q}</a>`:`<div class="plan-provider-cell">${q}</div>`;return`
      <tr class="plan-select-row${d?" is-selected":""}" data-plan-key="${c(i)}" tabindex="0" aria-selected="${d?"true":"false"}">
        <td class="px-3 py-3 font-medium text-slate-900 dark:text-white">${T}</td>
        <td class="break-words px-3 py-3 text-slate-900 dark:text-white">${D}</td>
        <td class="break-words px-3 py-3 text-slate-900 dark:text-white">${y}</td>
        <td class="break-words px-3 py-3 text-slate-900 dark:text-white">${b}</td>
        <td class="break-words px-3 py-3 text-slate-900 dark:text-white">${m}</td>
        <td class="break-words px-3 py-3 text-slate-600 dark:text-slate-300">${c(ee(s)||"\u2014")}</td>
        <td class="plan-table-nowrap px-3 py-3"><span class="rounded-md px-2 py-0.5 text-xs font-medium ${p}">${c(s.statusLabel)}</span></td>
        <td class="plan-table-nowrap px-3 py-3">${w}</td>
        <td class="plan-table-nowrap px-3 py-3">${v}</td>
      </tr>
      ${P}`}).join(""):""}function or(e,t,n,r,a,o){let s=t.length?jt(t,r).map(i=>{if(i.plans.length===1)return zt(i,n,!0,r);let d=!o&&i.plans.length>Te,p=o||!d||a.has(i.provider),y=nr(i),b=`${Y(i.iconUrl,i.label,"brand-icon brand-icon--section")}
              <span class="text-sm font-bold text-brand-800 dark:text-brand-200">${c(i.label)}</span>`,m=`
              ${i.brandHref?`<a href="${c(i.brandHref)}" class="plan-table-group-brand">${b}</a>`:b}
              <span class="rounded-full bg-brand-100 px-1.5 py-0.5 text-xs font-medium text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">${i.plans.length}</span>
              <span class="plan-table-group-right">
                ${y}
                ${d?'<svg class="plan-table-group-chevron" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m6 8 4 4 4-4"/></svg>':""}
              </span>`;return`
        <tr class="border-y border-slate-200 dark:border-slate-700">
          <td colspan="9" class="bg-brand-50/70 p-0 dark:bg-brand-950/20">
            ${d?`<div class="plan-table-group-toggle" role="button" tabindex="0" data-plan-group-toggle="${c(i.provider)}" aria-expanded="${p?"true":"false"}" aria-label="${p?"\u6536\u8D77":"\u5C55\u5F00"}${c(i.label)}\u5957\u9910">${m}</div>`:`<div class="plan-table-group-toggle plan-table-group-toggle--static">${m}</div>`}
          </td>
        </tr>
        ${zt(i,n,p,r)}`}).join(""):`<tr>
        <td colspan="9" class="px-3 py-10 text-center text-sm text-slate-500 dark:text-slate-400">\u6682\u65E0\u5339\u914D\u5957\u9910\u8BB0\u5F55</td>
      </tr>`;return`
    <div class="plan-table-wrap">
      <table class="w-full table-fixed text-sm">
        <caption class="sr-only">\u56FD\u5185 AI Coding \u5957\u9910\u5BF9\u6BD4</caption>
        <colgroup>
          <col style="width: 10%">
          <col style="width: 17%">
          <col style="width: 10%">
          <col style="width: 10%">
          <col style="width: 11%">
          <col style="width: 13%">
          <col style="width: 7%">
          <col style="width: 8%">
          <col style="width: 6%">
        </colgroup>
        <thead>
          <tr>
            ${Ye.map(i=>Ht(i,e)).join("")}
          </tr>
        </thead>
        <tbody>
          ${s}
        </tbody>
      </table>
    </div>`}function Qe(e,t="",n={},r=new Set,a=!1){if(!e.length)return'<p class="text-sm text-slate-500 dark:text-slate-400">\u540E\u53F0\u6682\u65E0\u5957\u9910\u8BB0\u5F55\u3002</p>';let o=ye(e,n,S);if(!o.length)return'<p class="text-sm text-slate-500 dark:text-slate-400">\u540E\u53F0\u6682\u65E0\u5957\u9910\u8BB0\u5F55\u3002</p>';let s=Bt(o),i=a||Le();return`
    <div>
      ${qt(s,o)}
      <div class="plan-view-cards">
        ${ar(s,t,n,r,i)}
      </div>
      <div class="plan-view-table">
        ${or(o,s,t,n,r,i)}
      </div>
    </div>`}var Gt=2,sr=new Set(["claude-opus-4-8","claude-sonnet-4-6","claude-opus-4-7","claude-opus-4-6","claude-sonnet-4-5","claude-opus-4-5","claude-opus-4-1"]);function H(e){if(e==null||e==="")return null;let t=Number(e);return Number.isFinite(t)?t:null}function Ce(e,t){let n=H(e);return n==null?"\u5F85\u66F4\u65B0":`${t==="USD"?"$":"\xA5"}${n.toLocaleString("zh-CN",{maximumFractionDigits:4})}`}function Kt(e){let t=H(e);return t==null?"\u2014":t>=1e6?`${(t/1e6).toLocaleString("zh-CN",{maximumFractionDigits:1})}M`:t>=1e3?`${(t/1e3).toLocaleString("zh-CN",{maximumFractionDigits:0})}K`:t.toLocaleString("zh-CN")}function B(e){return S[e]||e||"\u672A\u77E5"}var Xt={};function Qt(e){let t=F(e,Xt,S),n=String(t.seo_slug||"").trim(),r=String(t.seo_intro||"").trim(),a=String(t.icon_url||"").trim();return n&&r&&a?`/brands/${encodeURIComponent(n)}/`:""}function Je(e,t){let n=J(e),r=t||n?.iconUrl||"";return Y(r,B(e),"brand-icon brand-icon--tab")}function fe(e){let t=String(e.raw?.lifecycle_status||"").trim().toLowerCase();if(t)return t==="legacy";if(String(e.vendor||"").trim().toLowerCase()!=="anthropic")return!1;let n=String(e.raw?.model_id||e.raw?.id||e.id||"").trim().toLowerCase().replace(/[._]/g,"-");return sr.has(n)}function Ze(e){let t=String(e.raw?.release_date||"").trim();if(!t)return null;let n=Date.parse(t);return Number.isFinite(n)?n:null}var be={release:{numeric:!0,raw:Ze},name:{label:"\u6A21\u578B",numeric:!1},provider:{label:"\u54C1\u724C",numeric:!1},context:{label:"\u4E0A\u4E0B\u6587",numeric:!0,raw:e=>H(e.raw?.context_length)},input:{label:"\u8F93\u5165\uFF08\u5B98\u65B9\u4EF7\uFF09",numeric:!0,raw:e=>H(e.raw?.input_price)},output:{label:"\u8F93\u51FA\uFF08\u5B98\u65B9\u4EF7\uFF09",numeric:!0,raw:e=>H(e.raw?.output_price)}};function lr(e,t,n){let r=be[t];if(!r)return e;let a=[...e];return a.sort((o,s)=>{if(t==="release"){let d=Number(fe(o))-Number(fe(s));if(d!==0)return d}let i=0;if(r.numeric){let d=r.raw(o),p=r.raw(s);if(d==null||p==null)return d==null&&p==null?0:d==null?1:-1;i=d-p}else t==="name"?i=(o.modelName||"").localeCompare(s.modelName||"","zh-CN"):t==="provider"&&(i=B(o.vendor).localeCompare(B(s.vendor),"zh-CN"));return n==="desc"?-i:i}),a}function ir(e){let t=new Map;for(let n of e){let r=B(n.vendor),a=t.get(r);a||(a={name:r,vendor:n.vendor,icon:n.providerIconUrl,models:[]},t.set(r,a)),a.models.push(n)}return[...t.values()]}function cr(e,t){let n=Number(fe(t))-Number(fe(e));if(n!==0)return n>0;let r=Ze(e),a=Ze(t);return r!=null&&a!=null?r>a:r!=null&&a==null}function dr(e){let t=new Map;for(let n of e){let r=B(n.vendor),a=t.get(r);(!a||cr(n,a))&&t.set(r,n)}return[...t.values()]}function ur(e){let t=null;for(let n of e){let r=H(n.raw?.input_price);r==null||r<0||(!t||r<t.value)&&(t={value:r,currency:n.raw?.currency})}return t}function pr(e){let t=ur(e.models),n=[];if(t){let r=t.currency==="USD"?"$":"\xA5";n.push(`\u8F93\u5165 ${r}${t.value.toLocaleString("zh-CN",{maximumFractionDigits:4})} \u8D77`)}return n.push(`${e.models.length} \u4E2A\u6A21\u578B`),`<span class="plan-table-group-summary">${c(n.join(" \xB7 "))}</span>`}var Jt={name:e=>String(e.modelName||"").trim()||"\u2014",provider:e=>B(e.vendor),context:e=>Kt(e.raw?.context_length),input:e=>Ce(e.raw?.input_price,e.raw?.currency),output:e=>Ce(e.raw?.output_price,e.raw?.currency)},Yt=new Set(["\u2014","\u5F85\u66F4\u65B0"]),mr=new Intl.Collator("zh-CN",{numeric:!0,sensitivity:"base"});function Zt(e,t){let n=Jt[t];return n?String(n(e)||"").trim()||"\u2014":""}function fr(e,t){let n=new Map;for(let r of e){let a=Zt(r,t);n.set(a,(n.get(a)||0)+1)}return Array.from(n.entries()).map(([r,a])=>({value:r,count:a})).sort((r,a)=>{let o=Yt.has(r.value),s=Yt.has(a.value);return o!==s?o?1:-1:mr.compare(r.value,a.value)})}function br(e,t,n){return e!==t?'<svg class="model-price-sort-icon model-price-sort-icon--idle" viewBox="0 0 12 12" aria-hidden="true"><path d="M6 2l2.5 3h-5zM6 10l-2.5-3h5z" fill="currentColor"/></svg>':`<svg class="model-price-sort-icon" viewBox="0 0 12 12" aria-hidden="true"><path d="${n==="asc"?"M6 2l3 4H3z":"M6 10L3 6h6z"}" fill="currentColor"/></svg>`}function hr(e,t,n){let r=be[e],a=t.column===e&&!!t.value,o=fr(n,e);return`<button type="button" class="plan-column-filter-trigger model-price-filter-trigger${a?" is-active":""}" data-model-filter-column="${e}" aria-haspopup="menu" aria-expanded="false" title="\u7B5B\u9009${c(r.label)}">
      <span class="plan-column-filter-caret" aria-hidden="true"></span>
    </button>
    <div class="plan-column-filter-menu" data-model-filter-menu="${e}" role="menu" hidden>
      <button type="button" class="plan-column-filter-option${a?"":" is-active"}" data-model-filter-value="">
        <span class="plan-column-filter-option-label">\u5168\u90E8</span>
        <span class="plan-column-filter-option-count">${n.length}</span>
      </button>
      ${o.map(s=>`
        <button type="button" class="plan-column-filter-option${a&&s.value===t.value?" is-active":""}" data-model-filter-value="${c(s.value)}">
          <span class="plan-column-filter-option-label">${c(s.value)}</span>
          <span class="plan-column-filter-option-count">${s.count}</span>
        </button>
      `).join("")}
    </div>`}function gr(e,t,n,r){let a=(o,s="")=>{let i=be[o];return`<th class="model-price-th plan-column-filter ${s}" data-sort-key="${o}" role="columnheader" aria-sort="${o===e?t==="asc"?"ascending":"descending":"none"}" tabindex="0">
      <span class="model-price-th-inner">${i.label}${br(o,e,t)}</span>
      ${hr(o,n,r)}
    </th>`};return`<thead class="model-price-thead">
    <tr>
      ${a("name")}
      ${a("provider","model-price-col-provider")}
      ${a("context")}
      ${a("input")}
      ${a("output")}
    </tr>
  </thead>`}function yr(e){let t=H(e.raw?.input_price),n=H(e.raw?.output_price),r=H(e.raw?.context_length),a=e.raw?.currency,o=Ce(t,a),s=Ce(n,a),i=Kt(r),d=B(e.vendor),p=e.sourceUrl||e.raw?.docs_url||"",y=fe(e)?'<span class="model-price-legacy-badge">\u65E7\u7248</span>':"",b=p?`<a class="model-price-name-link" href="${c(p)}" target="_blank" rel="noopener noreferrer nofollow">${c(e.modelName)}</a>`:`<span>${c(e.modelName)}</span>`,m=Qt(e.vendor),w=`${Je(e.vendor,e.providerIconUrl)}<span>${c(d)}</span>`,$=m?`<a href="${c(m)}" class="model-price-provider plan-provider-cell--link">${w}</a>`:`<span class="model-price-provider">${w}</span>`;return`<tr class="model-price-row">
    <td class="model-price-td model-price-td--name">
      <span class="model-price-model-name">${b}${y}</span>
    </td>
    <td class="model-price-td model-price-td--provider model-price-col-provider">
      ${$}
    </td>
    <td class="model-price-td model-price-td--context">${c(i)}</td>
    <td class="model-price-td model-price-td--price">
      <span class="model-price-value${t==null?" model-price-value--empty":""}">${c(o)}</span>
      ${t!=null?'<span class="model-price-unit">/\u767E\u4E07tokens</span>':""}
    </td>
    <td class="model-price-td model-price-td--price">
      <span class="model-price-value${n==null?" model-price-value--empty":""}">${c(s)}</span>
      ${n!=null?'<span class="model-price-unit">/\u767E\u4E07tokens</span>':""}
    </td>
  </tr>`}function en(e,t,n={}){Xt=n||{};let r=t.filter(u=>H(u.raw?.input_price)!=null||H(u.raw?.output_price)!=null),a=new Map;for(let u of r){let l=B(u.vendor);a.has(l)||a.set(l,{name:l,icon:u.providerIconUrl,vendor:u.vendor})}let o=[...a.values()].sort((u,l)=>u.name.localeCompare(l.name,"zh-CN")),s="all",i="release",d="desc",p="brand",y="all",b="",m="",w="",$=new Set;function v(){return!!(m&&w&&Jt[m])}function P(){return p==="model"?y==="all"?r:r.filter(u=>(u.modelName||"")===y):s==="all"?r:r.filter(u=>B(u.vendor)===s)}function h(){let u=P(),l=b.toLowerCase();return l&&(u=u.filter(f=>String(f.modelName||"").toLowerCase().includes(l)||B(f.vendor).toLowerCase().includes(l))),u}function E(u){let l=u;return v()&&(l=l.filter(f=>Zt(f,m)===w)),lr(l,i,d)}function L(){return p==="model"?D():q()}function D(){let u=dr(r).sort((x,_)=>(x.modelName||"").localeCompare(_.modelName||"","zh-CN")),l=`<button type="button" class="brand-tab${y==="all"?" is-active":""}" data-model-tab="all">
      <span>\u5168\u90E8</span><span class="brand-count">${r.length}</span>
    </button>`,f=u.map(x=>{let _=x.modelName||"";return`<button type="button" class="brand-tab${y===_?" is-active":""}" data-model-tab="${c(_)}">
        ${Je(x.vendor,x.providerIconUrl)}
        <span>${c(_)}</span>
      </button>`}).join("");return`<div class="brand-tab-list model-price-tabs">${l}<span class="brand-divider"></span>${f}</div>`}function q(){let u=`<button type="button" class="brand-tab${s==="all"?" is-active":""}" data-provider="all">
      <span>\u5168\u90E8</span><span class="brand-count">${r.length}</span>
    </button>`,l=o.map(f=>{let x=r.filter(_=>B(_.vendor)===f.name).length;return`<button type="button" class="brand-tab${s===f.name?" is-active":""}" data-provider="${c(f.name)}">
        ${Je(f.vendor,f.icon)}
        <span>${c(f.name)}</span>
        <span class="brand-count">${x}</span>
      </button>`}).join("");return`<div class="brand-tab-list model-price-tabs">${u}<span class="brand-divider"></span>${l}</div>`}function T(u,l){let f=!l&&u.models.length>Gt,x=l||!f||$.has(u.name),_=x?u.models:u.models.slice(0,Gt),G=Qt(u.vendor),te=`${Y(u.icon||J(u.vendor)?.iconUrl||"",u.name,"brand-icon brand-icon--section")}
            <span class="text-sm font-bold text-brand-800 dark:text-brand-200">${c(u.name)}</span>`,he=`
            ${G?`<a href="${c(G)}" class="plan-table-group-brand">${te}</a>`:te}
            <span class="rounded-full bg-brand-100 px-1.5 py-0.5 text-xs font-medium text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">${u.models.length}</span>
            <span class="plan-table-group-right">
              ${pr(u)}
              ${f?'<svg class="plan-table-group-chevron" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m6 8 4 4 4-4"/></svg>':""}
            </span>`;return`
      <tr class="border-y border-slate-200 dark:border-slate-700">
        <td colspan="5" class="bg-brand-50/70 p-0 dark:bg-brand-950/20">
          ${f?`<div class="plan-table-group-toggle" role="button" tabindex="0" data-model-group-toggle="${c(u.name)}" aria-expanded="${x?"true":"false"}" aria-label="${x?"\u6536\u8D77":"\u5C55\u5F00"}${c(u.name)}\u6A21\u578B">${he}</div>`:`<div class="plan-table-group-toggle plan-table-group-toggle--static">${he}</div>`}
        </td>
      </tr>
      ${_.map(yr).join("")}`}function N(u,l){return v()?`<div class="plan-table-filter-summary">
      <span class="plan-table-filter-chip">
        <span>${c(be[m].label)}</span>
        <strong>${c(w)}</strong>
      </span>
      <span class="plan-table-filter-count">${u} / ${l} \u4E2A\u6A21\u578B</span>
      <button type="button" class="plan-table-filter-clear" data-model-filter-clear>\u6E05\u9664</button>
    </div>`:""}function R(){let u=h();if(!u.length)return`<p class="model-price-empty">${b?"\u6682\u65E0\u5339\u914D\u7684\u6A21\u578B":"\u6682\u65E0\u8BE5\u5382\u5546\u7684\u6A21\u578B\u4EF7\u683C\u6570\u636E"}</p>`;let l=E(u),f=s!=="all"||y!=="all"||v()||!!b,x=l.length?ir(l).map(_=>T(_,f)).join(""):`<tr>
          <td colspan="5" class="px-3 py-10 text-center text-sm text-slate-500 dark:text-slate-400">\u6682\u65E0\u5339\u914D\u7684\u6A21\u578B</td>
        </tr>`;return`${N(l.length,u.length)}
    <div class="model-price-table-wrap">
      <table class="model-price-table" role="grid" aria-label="\u6A21\u578B\u4EF7\u683C\u5BF9\u6BD4\u8868">
        ${gr(i,d,{column:m,value:w},u)}
        <tbody class="model-price-tbody">
          ${x}
        </tbody>
      </table>
    </div>
        <p class="model-price-footnote">\u4EF7\u683C\u5355\u4F4D\uFF1A\u8868\u5185\u7B26\u53F7\u6240\u793A\u5E01\u79CD\uFF08\xA5 \u4EBA\u6C11\u5E01 / $ \u7F8E\u5143\uFF0C\u6309\u5382\u5546\u5B98\u65B9\u8BA1\u4EF7\uFF09/ \u767E\u4E07 tokens \xB7 \u6570\u636E\u6765\u6E90\u4E3A\u5404\u5382\u5546\u5B98\u65B9\u5B9A\u4EF7\u9875\uFF0C\u771F\u5B9E\u4EF7\u683C\u8BF7\u4EE5\u5B98\u7F51\u4E3A\u51C6</p>`}function K(){return`<div class="brand-filter-row model-price-toolbar">
      <div class="brand-tab-list">
        <button type="button" data-model-dimension="brand" class="brand-tab${p==="brand"?" is-active":""}"><span>\u6309\u54C1\u724C</span></button>
        <button type="button" data-model-dimension="model" class="brand-tab${p==="model"?" is-active":""}"><span>\u6309\u6A21\u578B</span></button>
      </div>
      <div class="brand-search-box">
        <svg class="brand-search-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="8.5" cy="8.5" r="5.5"/><path d="M13 13l4 4" stroke-linecap="round"/></svg>
        <input type="search" class="brand-search-input" data-model-search placeholder="\u641C\u7D22\u6A21\u578B\u2026" autocomplete="off" aria-label="\u641C\u7D22\u6A21\u578B" value="${c(b)}">
      </div>
    </div>`}function X(){e.innerHTML=`
      <div class="model-price-view">
        ${K()}
        <div class="model-price-content" data-model-price-content></div>
      </div>`,Q(),O()}function O(){let u=e.querySelector("[data-model-price-content]");u&&(u.innerHTML=`${L()}${R()}`,Ae())}function Q(){e.querySelectorAll("[data-model-dimension]").forEach(l=>{l.addEventListener("click",()=>{let f=l.dataset.modelDimension;if(f===p)return;p=f,s="all",y="all",b="";let x=e.querySelector("[data-model-search]");x&&(x.value=""),e.querySelectorAll("[data-model-dimension]").forEach(_=>{_.classList.toggle("is-active",_.dataset.modelDimension===f)}),O()})});let u=e.querySelector("[data-model-search]");u?.addEventListener("input",()=>{b=u.value.trim(),O()})}function oe(){e.querySelectorAll(".plan-column-filter-menu").forEach(u=>{u.hidden=!0}),e.querySelectorAll("[data-model-filter-column]").forEach(u=>u.setAttribute("aria-expanded","false"))}function Ae(){e.querySelectorAll(".model-price-tabs .brand-tab").forEach(u=>{u.addEventListener("click",()=>{u.dataset.modelTab!=null?y=u.dataset.modelTab:s=u.dataset.provider,O()})}),e.querySelectorAll("[data-model-group-toggle]").forEach(u=>{let l=f=>{if(f?.target?.closest?.("a"))return;let x=u.dataset.modelGroupToggle;$.has(x)?$.delete(x):$.add(x),O()};u.addEventListener("click",l),u.addEventListener("keydown",f=>{(f.key==="Enter"||f.key===" ")&&(f.preventDefault(),l(f))})}),e.querySelectorAll("[data-model-filter-column]").forEach(u=>{u.addEventListener("click",l=>{l.stopPropagation();let f=u.closest(".plan-column-filter")?.querySelector(".plan-column-filter-menu");if(!f)return;let x=!f.hidden;oe(),x||(f.hidden=!1,u.setAttribute("aria-expanded","true"))}),u.addEventListener("keydown",l=>{(l.key==="Enter"||l.key===" ")&&(l.preventDefault(),l.stopPropagation(),u.click())})}),e.querySelectorAll("[data-model-filter-menu]").forEach(u=>{u.addEventListener("click",l=>{l.stopPropagation();let f=l.target.closest("[data-model-filter-value]");if(!f)return;let x=f.dataset.modelFilterValue||"";m=x?u.dataset.modelFilterMenu:"",w=x,O()})}),e.querySelectorAll("[data-model-filter-clear]").forEach(u=>{u.addEventListener("click",()=>{m="",w="",O()})}),e.querySelectorAll(".model-price-th[data-sort-key]").forEach(u=>{let l=f=>{if(f?.target?.closest?.(".plan-column-filter-trigger, .plan-column-filter-menu"))return;let x=u.dataset.sortKey;i===x?d=d==="asc"?"desc":"asc":(i=x,d=(be[x]?.numeric,"asc")),O()};u.addEventListener("click",l),u.addEventListener("keydown",f=>{(f.key==="Enter"||f.key===" ")&&(f.preventDefault(),l(f))})})}e._modelFilterDocClose&&(document.removeEventListener("click",e._modelFilterDocClose),document.removeEventListener("keydown",e._modelFilterDocKey)),e._modelFilterDocClose=u=>{e.contains(u.target)||oe()},e._modelFilterDocKey=u=>{u.key==="Escape"&&oe()},document.addEventListener("click",e._modelFilterDocClose),document.addEventListener("keydown",e._modelFilterDocKey),X()}var vr=new Set(["localhost","127.0.0.1","::1"]);function et(e=globalThis.location?.hostname||""){let t=String(e).trim().toLowerCase().replace(/^\[|\]$/g,"");return vr.has(t)||t.endsWith(".localhost")}function tn(e=globalThis.location?.hostname||""){return et(e)?"/api/models":"/data.json"}async function xr(){let t=et()?"backend":"static",n=await kr(tn());return{...wr(n,t),dataUnavailable:!n}}async function an(){let e=await xr(),t=e.models.flatMap(a=>_r(a)),n=e.modelCatalog||[],r=new Map(n.map(a=>[a.id,a.name]));for(let a of t)a.supportedModelNames=(a.modelIds||[]).map(o=>r.get(o)).filter(Boolean);return{...e,plans:t,providerInfo:e.providerInfo||{},modelCatalog:n}}function wr(e,t){if(e&&Array.isArray(e.models)){let n=e.models.map(r=>Pr(r,t));if(n.length)return{source:t,lastUpdated:e.last_updated||Mr(n.map(r=>r.updatedAt)),models:n,rawModels:e.models,providerInfo:e.provider_info||{},modelCatalog:$r(e.model_catalog)}}return{source:t,lastUpdated:e?.last_updated||"unknown",models:[],rawModels:[],providerInfo:e?.provider_info||{},modelCatalog:[]}}function $r(e){return Array.isArray(e)?e.map(t=>({id:g(t.id),name:g(t.name,t.id||""),provider:g(t.provider,""),providerIconUrl:g(t.provider_icon_url,""),logoUrl:g(t.logo_url,""),sortOrder:W(t.sort_order),marketRegion:g(t.market_region,"")})).filter(t=>t.id):[]}async function kr(e){try{let t=await fetch(e,{headers:{Accept:"application/json"}});return t.ok?await t.json():null}catch{return null}}function Pr(e,t){let n=Array.isArray(e.capabilities)?e.capabilities:[],r=W(e.input_price),a=W(e.context_length),o=Ee(e.plan_summary,e.access_notes,e.notes),s=Sr(e,r,a,n);return{id:g(e.id),vendor:g(e.provider,"\u5F85\u66F4\u65B0"),providerIconUrl:g(e.provider_icon_url,e.icon_url||""),modelName:g(e.name,"\u5F85\u66F4\u65B0"),inputPrice:rn(e.input_price,e.currency),outputPrice:rn(e.output_price,e.currency),contextLength:Er(e.context_length),multimodal:n.includes("vision")?"\u652F\u6301":"\u5F85\u786E\u8BA4",apiSupport:"\u652F\u6301",rmbRecharge:g(e.rmb_recharge_support,"\u8BF7\u4EE5\u5B98\u7F51\u4E3A\u51C6"),invoice:g(e.invoice_support,"\u8BF7\u4EE5\u5B98\u7F51\u4E3A\u51C6"),rmbRechargeRaw:e.rmb_recharge_support??null,invoiceRaw:e.invoice_support??null,accessLevel:g(e.access_level,""),marketRegion:g(e.market_region,""),marketRegionLabel:g(e.market_region_label,""),scenarios:s,suitableFor:g(e.suitable_for,o||"\u8BF7\u4EE5\u5B98\u7F51\u4E3A\u51C6"),updatedAt:g(e.last_updated,e.release_date||"\u5F85\u66F4\u65B0"),sourceUrl:g(e.docs_url,e.plan_url||""),packagePlans:Array.isArray(e.package_plans)?e.package_plans:[],source:t,raw:e}}function _r(e){return(e.packagePlans||[]).filter(n=>n.status!=="discontinued").map(n=>{let r=W(n.monthly_price),a=W(n.quarterly_price),o=W(n.annual_price),s=Cr(n,e);return{id:g(n.id,`${e.id}-plan`),planId:g(n.planId,n.plan_id||""),brand:g(n.brand,n.brand_slug||""),name:g(n.name,"\u5F85\u66F4\u65B0\u5957\u9910"),provider:g(n.provider,e.vendor),providerIconUrl:g(n.provider_icon_url,n.icon_url,e.providerIconUrl),modelName:e.modelName,modelId:g(n.model_id,e.id),modelIds:Array.isArray(n.model_ids)?n.model_ids.map(i=>String(i||"").trim()).filter(Boolean):[],status:g(n.status,"unknown"),statusLabel:g(n.status_label,"\u5F85\u786E\u8BA4"),url:g(n.url,""),monthlyPrice:tt(n.monthly_price,s),monthlyPriceValue:r,monthlyCurrency:s,monthlyCurrencyLabel:s==="USD"?"\u7F8E\u5143":"\u4EBA\u6C11\u5E01",quarterlyPrice:nt(n.quarterly_price,s,"\u5B63"),quarterlyPriceValue:a,quarterlyMonthlyPrice:a!=null?tt(a/3,s):"",quarterlyMonthlyPriceValue:a!=null?a/3:null,annualPrice:nt(n.annual_price,s,"\u5E74"),annualPriceValue:o,annualMonthlyPrice:o!=null?tt(o/12,s):"",annualMonthlyPriceValue:o!=null?o/12:null,includedCalls:g(n.included_calls,""),notes:g(n.notes,""),planType:g(n.plan_type,nn(n,e)),category:nn(n,e),rmbRecharge:e.rmbRecharge,invoice:e.invoice,rmbRechargeRaw:e.rmbRechargeRaw,invoiceRaw:e.invoiceRaw,accessLevel:e.accessLevel,marketRegion:e.marketRegion,marketRegionLabel:e.marketRegionLabel,firstMonthPrice:n.first_month_price!=null?n.first_month_price:null,fiveHoursRequests:g(n.five_hours_requests,""),weeklyRequests:g(n.weekly_requests,""),monthlyRequests:g(n.monthly_requests,""),measuredFiveHoursTokens:g(n.measured_five_hours_tokens,""),measuredWeeklyTokens:g(n.measured_weekly_tokens,""),measuredMonthlyTokens:g(n.measured_monthly_tokens,""),tokenLimit:g(n.token_limit,""),supportedModels:g(n.supported_models,""),benefits:g(n.benefits,""),rating:g(n.rating,""),tags:g(n.tags,""),sourceUrl:g(n.source_url,""),lastVerifiedAt:g(n.last_verified_at,""),refundPolicy:g(n.refund_policy,""),billingCycle:g(n.billing_cycle,""),creditsLimit:g(n.credits_limit,""),concurrencyLimit:g(n.concurrency_limit,""),resetRule:g(n.reset_rule,""),limitType:g(n.limit_type,Lr(n)),dataStatus:g(n.data_status,Tr(n)),confidenceScore:n.confidence_score!=null?n.confidence_score:null,sourceType:g(n.source_type,""),toolCompatibility:ae(n.tool_compatibility_json,{}),modelMultiplier:ae(n.model_multiplier_json,{}),derivedMetrics:ae(n.derived_metrics_json,{}),measuredMetrics:ae(n.measured_metrics_json,{}),risk:ae(n.risk_json,{}),recommendation:ae(n.recommendation_json,{}),changeSummary:ae(n.change_summary_json,{}),linkType:g(n.link_type,"official"),domesticPayment:n.domestic_payment===!0||n.domestic_payment===1,hasFirstMonthDiscount:n.has_first_month_discount===!0||n.has_first_month_discount===1,recommendationText:g(n.recommendation_text,""),riskText:g(n.risk_text,""),sortOrder:W(n.sort_order),raw:n}})}function Sr(e,t,n,r){let a=Ee(e.name,e.provider,e.notes,e.plan_summary,e.access_notes).toLowerCase(),o=new Set(["enterprise-api"]);return t!=null&&t<=2&&o.add("low-cost"),n!=null&&n>=2e5&&o.add("long-context"),r.includes("vision")&&o.add("multimodal"),/个人|会员|订阅|聊天|kimi|豆包/.test(a)&&o.add("personal-use"),Array.from(o)}function ae(e,t){if(!e||typeof e!="string")return e||t;try{return JSON.parse(e)}catch{return t}}function Lr(e){return e.five_hours_requests?"five_hours":e.weekly_requests?"weekly":e.monthly_requests?"monthly":e.token_limit?"token":e.credits_limit?"credits":"undisclosed"}function Tr(e){return e.last_verified_at?"verified":e.measured_monthly_tokens||e.measured_weekly_tokens?"measured":"pending"}function nn(e,t){let n=Ee(e.name,e.provider,e.notes,t.vendor,t.modelName).toLowerCase();return/聚合|路由|硅基|siliconflow/.test(n)?"aggregated_router":/会员|订阅|chat|清言|kimi|豆包/.test(n)?"personal_subscription":/maas|百炼|千帆|腾讯云|火山方舟|企业/.test(n)?"enterprise_maas":/开源|部署|私有化/.test(n)?"open_source_deploy":(/coding|qoder|claude code|cursor|trae/.test(n),"coding_plan")}function Cr(e,t){let n=g(e.monthly_currency).toUpperCase();if(n==="USD"||n==="CNY")return n;let r=g(e.provider,t.vendor),a=r.toLowerCase();if(a==="qoder"||a==="qoder cn"||a==="byteplus"||a==="z.ai")return"USD";let o=Ee(e.name,r,e.url,e.included_calls,e.notes).toLowerCase();return/\$|usd|美元|trae\.ai/.test(o)?"USD":"CNY"}function g(...e){let t=e.find(n=>n!=null&&String(n).trim());return t==null?"":String(t).trim()}function W(e){if(e==null||e==="")return null;let t=Number(e);return Number.isFinite(t)?t:null}function rn(e,t){let n=W(e);return n==null?g(e,"\u5F85\u66F4\u65B0"):`${t==="USD"?"$":"\xA5"}${n.toLocaleString("zh-CN",{maximumFractionDigits:4})}/\u767E\u4E07 tokens`}function tt(e,t="CNY"){return nt(e,t,"\u6708")}function nt(e,t="CNY",n="\u6708"){let r=W(e);return r==null?"\u8BF7\u4EE5\u5B98\u7F51\u4E3A\u51C6":`${t==="USD"?"$":"\xA5"}${r.toLocaleString("zh-CN",{maximumFractionDigits:2})}/${n}`}function Er(e){let t=W(e);return t==null?g(e,"\u8BF7\u4EE5\u5B98\u7F51\u4E3A\u51C6"):t>=1e6?`${(t/1e6).toLocaleString("zh-CN",{maximumFractionDigits:1})}M tokens`:t>=1e3?`${(t/1e3).toLocaleString("zh-CN",{maximumFractionDigits:0})}K tokens`:`${t.toLocaleString("zh-CN")} tokens`}function Ee(...e){return e.filter(t=>t!=null&&String(t).trim()).join(" ")}function Mr(e){return e.find(t=>t&&t!=="\u5F85\u66F4\u65B0")||"\u5F85\u66F4\u65B0"}var Ar=[{id:"all",label:"\u5168\u90E8"},{id:"free",label:"\u514D\u8D39"}],Me={plans:{title:"\u56FD\u5185 AI Coding \u5957\u9910\u5BF9\u6BD4\u4E0E\u51B3\u7B56",summary:"\u7ED3\u6784\u5316\u6BD4\u8F83\u4EF7\u683C\u3001\u989D\u5EA6\u3001\u6A21\u578B\u4E0E\u56FD\u5185\u4F7F\u7528\u6761\u4EF6\uFF1B\u8FFD\u8E2A\u4EF7\u683C\u53D8\u5316\uFF0C\u4FDD\u7559\u5B98\u65B9\u6765\u6E90\u548C\u6838\u5BF9\u65E5\u671F\uFF0C\u5E2E\u4F60\u66F4\u5FEB\u5B8C\u6210\u5DE5\u5177\u9009\u578B\u4E0E\u6210\u672C\u51B3\u7B56\u3002\u771F\u5B9E\u4EF7\u683C\u8BF7\u4EE5\u5382\u5546\u5B98\u7F51\u4E3A\u51C6\u3002"},pricing:{title:"\u56FD\u5185 AI \u6A21\u578B\u4EF7\u683C\u5BF9\u6BD4",summary:"\u5BF9\u6BD4\u56FD\u5185\u4E3B\u6D41\u6A21\u578B\u7684\u5B98\u65B9 API \u5355\u4EF7\uFF08\u8F93\u5165/\u8F93\u51FA\uFF0C\xA5/\u767E\u4E07 tokens\uFF09\u4E0E\u4E0A\u4E0B\u6587\u957F\u5EA6\uFF0C\u6570\u636E\u6765\u81EA\u5382\u5546\u5B98\u65B9\u5B9A\u4EF7\u9875\u3002\u771F\u5B9E\u4EF7\u683C\u8BF7\u4EE5\u5382\u5546\u5B98\u7F51\u4E3A\u51C6\u3002"}};function Dr(e){let t=e.raw?.input_price,n=e.raw?.output_price;return t!=null&&t!==""||n!=null&&n!==""}var C={codingPlanOverview:document.getElementById("codingPlanOverview")};function on(){C.codingPlanOverview&&(C.codingPlanOverview.classList.remove("plans-loading-shell"),C.codingPlanOverview.setAttribute("aria-busy","false"))}function Ur(e,t){let n=new Map;for(let r of e){let a=J(r.provider),o=String(r.provider||"").trim(),s=S[o]||o;if(!s)continue;let i=F(o,t,S),d=a?.id||s,p=n.get(d);p?p.iconUrl||(p.iconUrl=M(i.icon_url)||M(r.providerIconUrl)||M(a?.iconUrl)):(p={id:d,provider:o,label:V(o,t,S),iconUrl:M(i.icon_url)||M(r.providerIconUrl)||M(a?.iconUrl),sortOrder:Z(o,t,S),plans:[]},n.set(d,p)),p.plans.push(r)}for(let r of n.values())r.plans=ne(r.plans);return n}function Nr(e,t,n={}){let r=new Map;for(let a of t){let o=e.filter(d=>Array.isArray(d.modelIds)&&d.modelIds.includes(a.id));if(!o.length)continue;let s=F(a.provider,n,S),i=M(a.logoUrl)||M(s.icon_url)||M(a.providerIconUrl)||M(J(a.provider)?.iconUrl);r.set(`model:${a.id}`,{id:`model:${a.id}`,label:a.name||a.id,iconUrl:i,sortOrder:Number.isFinite(a.sortOrder)?a.sortOrder:99,plans:ne(o)})}return r}function Ir(){return`
    <div class="cn-hero-banner" role="complementary" aria-label="\u56FD\u5185\u7AD9\u4EF7\u503C\u4E3B\u5F20">
      <div class="cn-hero-banner__points">
        <span class="cn-hero-point"><span aria-hidden="true">\xA5</span>\u4EBA\u6C11\u5E01\u5145\u503C</span>
        <span class="cn-hero-point"><span aria-hidden="true">\u25A1</span>\u53EF\u5F00\u53D1\u7968</span>
        <span class="cn-hero-point"><span aria-hidden="true">\u25C8</span>\u56FD\u5185\u7F51\u7EDC\u76F4\u8FDE</span>
      </div>
      <a class="cn-hero-banner__intl" href="https://www.creditsplan.com/" target="_blank" rel="noopener noreferrer">\u6D77\u5916\u5957\u9910\uFF1F\u524D\u5F80 creditsplan.com \u2192</a>
    </div>
  `}function Rr(e){let t=C.codingPlanOverview.querySelector("#plansBackTop");if(!t||!e)return;let n=()=>{let r=e.getBoundingClientRect();t.classList.toggle("is-visible",r.top<-160&&r.bottom>160)};t.addEventListener("click",()=>{let r=window.matchMedia("(prefers-reduced-motion: reduce)").matches;e.scrollIntoView({behavior:r?"auto":"smooth",block:"start"})}),window.addEventListener("scroll",n,{passive:!0}),window.addEventListener("resize",n),n()}function Or(){return`
    <div class="plans-export" id="plansExport">
      <button type="button" class="plans-export-trigger" id="plansExportTrigger" aria-haspopup="menu" aria-expanded="false" title="\u5BFC\u51FA\u5F53\u524D\u5957\u9910\u6570\u636E">
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
          <path d="M10 3v10m0 0 3.5-3.5M10 13 6.5 9.5M4 15.5h12" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>\u5BFC\u51FA\u6570\u636E</span>
      </button>
      <div class="plans-export-menu" id="plansExportMenu" role="menu" hidden>
        <button type="button" class="plans-export-option" role="menuitem" data-export-format="excel">
          <span class="plans-export-option-icon plans-export-option-icon--excel" aria-hidden="true">X</span>
          <span class="plans-export-option-text"><strong>Excel</strong><small>\u8868\u683C\u6587\u4EF6\uFF0C\u9002\u5408\u6570\u636E\u5206\u6790</small></span>
        </button>
        <button type="button" class="plans-export-option" role="menuitem" data-export-format="word">
          <span class="plans-export-option-icon plans-export-option-icon--word" aria-hidden="true">W</span>
          <span class="plans-export-option-text"><strong>Word</strong><small>\u6587\u6863\u6587\u4EF6\uFF0C\u9002\u5408\u62A5\u544A\u5F15\u7528</small></span>
        </button>
        <button type="button" class="plans-export-option" role="menuitem" data-export-format="pdf">
          <span class="plans-export-option-icon plans-export-option-icon--pdf" aria-hidden="true">P</span>
          <span class="plans-export-option-text"><strong>PDF</strong><small>\u56FA\u5B9A\u7248\u5F0F\uFF0C\u9002\u5408\u5206\u4EAB\u5B58\u6863</small></span>
        </button>
      </div>
    </div>
  `}function Fr(e,t,n,r=()=>"plans",a=()=>[]){let o=e.querySelector("#plansExportTrigger"),s=e.querySelector("#plansExportMenu");if(!o||!s)return;let i=()=>{s.hidden=!0,o.setAttribute("aria-expanded","false")};o.addEventListener("click",()=>{let d=s.hidden;s.hidden=!d,o.setAttribute("aria-expanded",String(d))}),document.addEventListener("click",d=>{e.querySelector("#plansExport")?.contains(d.target)||i()}),document.addEventListener("keydown",d=>{d.key==="Escape"&&i()}),s.addEventListener("click",d=>{let p=d.target.closest("[data-export-format]");if(!p)return;i();let y=p.dataset.exportFormat;if(r()==="pricing"){let m=a();y==="excel"?Et(m):y==="word"?Dt(m):y==="pdf"&&Rt(m);return}let b=t();y==="excel"?Ct(b,n):y==="word"?At(b,n):y==="pdf"&&It(b,n)})}function Br(e,t={},n=[],r=[]){if(!C.codingPlanOverview)return;let a=ye(e,t,S),o=Ur(a,t),s=[...o.values()].sort((l,f)=>l.sortOrder-f.sortOrder),i=Nr(a,n,t),d=[...i.values()].sort((l,f)=>l.sortOrder-f.sortOrder||l.label.localeCompare(f.label,"zh-CN")),p={all:a.length,free:Oe(a).length};C.codingPlanOverview.innerHTML=`
    <section class="plans-workbench" aria-labelledby="codingPlanTitle">
      <div class="workbench-head">
        <div class="workbench-intro">
          <p class="workbench-kicker">AI \u5F00\u53D1\u8005\u8BA2\u9605\u51B3\u7B56\u5E73\u53F0</p>
          <h1 id="codingPlanTitle" class="workbench-title">${c(Me.plans.title)}</h1>
          <p id="workbenchSummary" class="workbench-summary">${c(Me.plans.summary)}</p>
        </div>
        <div class="workbench-meta">
          <span id="workbenchStats">
            <span>${a.length} \u6761\u8BB0\u5F55</span>
            <span>${s.length} \u4E2A\u54C1\u724C</span>
            <span>${d.length} \u4E2A\u6A21\u578B</span>
          </span>
          ${Or()}
        </div>
      </div>
      ${Ir()}
      <div class="workbench-body">
        <div id="brandFilterBar" class="brand-filter-bar">
          <div class="brand-filter-row">
            <div id="dimensionSwitch" class="brand-tab-list">
              <button type="button" data-dimension="brand" class="brand-tab is-active"><span>\u6309\u54C1\u724C</span></button>
              <button type="button" data-dimension="model" class="brand-tab"><span>\u6309\u6A21\u578B</span></button>
            </div>
            <div class="brand-search-box">
              <svg class="brand-search-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="8.5" cy="8.5" r="5.5"/><path d="M13 13l4 4" stroke-linecap="round"/></svg>
              <input id="brandSearchInput" type="search" class="brand-search-input" placeholder="\u641C\u7D22\u54C1\u724C\u2026" autocomplete="off" aria-label="\u641C\u7D22\u54C1\u724C\u6216\u6A21\u578B">
            </div>
          </div>
          <div id="brandTabs" class="brand-tab-list">
            ${Ar.map(l=>`
              <button type="button" data-brand="${l.id}" data-brand-label="${c(l.label)}" class="brand-tab${l.id==="all"?" is-active":""}">
                <span>${c(l.label)}</span>
                ${p[l.id]>0?`<span class="brand-count">${p[l.id]}</span>`:""}
              </button>
            `).join("")}
            <span class="brand-divider"></span>
            ${s.map(l=>`<button type="button" data-brand="${c(l.id)}" data-brand-label="${c(l.label)}" class="brand-tab">
                ${Y(l.iconUrl,l.label,"brand-icon brand-icon--tab")}
                <span>${c(l.label)}</span>
                <span class="brand-count">${l.plans.length}</span>
              </button>`).join("")}
          </div>
          <div id="modelTabs" class="brand-tab-list" hidden>
            <button type="button" data-brand="all" data-brand-label="\u5168\u90E8" class="brand-tab is-active">
              <span>\u5168\u90E8</span>
              ${p.all>0?`<span class="brand-count">${p.all}</span>`:""}
            </button>
            <span class="brand-divider"></span>
            ${d.map(l=>`<button type="button" data-brand="${c(l.id)}" data-brand-label="${c(l.label)}" class="brand-tab">
                ${Y(l.iconUrl,l.label,"brand-icon brand-icon--tab")}
                <span>${c(l.label)}</span>
                <span class="brand-count">${l.plans.length}</span>
              </button>`).join("")}
          </div>
        </div>
        <div id="brandDetail" class="brand-detail">
          ${Qe(a,"",t)}
        </div>
      </div>
    </section>
    <button id="plansBackTop" class="plans-back-top" type="button" aria-label="\u8FD4\u56DE\u5957\u9910\u5217\u8868\u9876\u90E8" title="\u8FD4\u56DE\u9876\u90E8">
      <span aria-hidden="true">\u2191</span>
    </button>
  `,on();let y=C.codingPlanOverview.querySelector(".plans-workbench"),b=C.codingPlanOverview.querySelector("#brandFilterBar"),m=C.codingPlanOverview.querySelector("#brandTabs"),w=C.codingPlanOverview.querySelector("#modelTabs"),$=C.codingPlanOverview.querySelector("#brandDetail");Rr(y);let v=a,P="all",h="brand";Fr(C.codingPlanOverview,()=>v,t,()=>h,()=>r);let E="",L=new Set,D=()=>{if(h==="pricing"){en($,r,t);return}$.innerHTML=Qe(v,E,t,L,P!=="all")},q=()=>{Xe(),E="",L.clear()};Vt($,()=>v,()=>{L.clear(),D()},l=>{E=E===l?"":l,D()});let N=l=>{L.has(l)?L.delete(l):L.add(l),D()};$.addEventListener("click",l=>{if(l.target.closest("a"))return;let f=l.target.closest("[data-plan-group-toggle]");f&&N(f.dataset.planGroupToggle)}),$.addEventListener("keydown",l=>{if(l.key!=="Enter"&&l.key!==" ")return;let f=l.target.closest("[data-plan-group-toggle]");!f||f.tagName==="BUTTON"||l.target.closest("a")||(l.preventDefault(),N(f.dataset.planGroupToggle))});let R=()=>{[m,w].forEach(l=>{l.querySelectorAll(".brand-tab").forEach(f=>f.classList.remove("is-active"))})},K=l=>{l==="all"?v=a:l==="free"?v=Oe(a):o.has(l)?v=o.get(l).plans:i.has(l)&&(v=i.get(l).plans)},X=l=>{let f=l==="pricing"?Me.pricing:Me.plans,x=C.codingPlanOverview.querySelector("#codingPlanTitle"),_=C.codingPlanOverview.querySelector("#workbenchSummary"),G=C.codingPlanOverview.querySelector("#workbenchStats");if(x&&(x.textContent=f.title),_&&(_.textContent=f.summary),!!G)if(l==="pricing"){let te=r.filter(Dr),he=new Set(te.map(De=>S[De.vendor]||De.vendor)).size;G.innerHTML=`<span>${te.length} \u4E2A\u6A21\u578B</span><span>${he} \u4E2A\u5382\u5546</span>`}else G.innerHTML=`<span>${a.length} \u6761\u8BB0\u5F55</span><span>${s.length} \u4E2A\u54C1\u724C</span><span>${d.length} \u4E2A\u6A21\u578B</span>`},O=l=>{l!==h&&(h=l,b.querySelectorAll("[data-dimension]").forEach(f=>{f.classList.toggle("is-active",f.dataset.dimension===l)}),m.hidden=l!=="brand",w.hidden=l!=="model",Q&&(Q.placeholder=l==="brand"?"\u641C\u7D22\u54C1\u724C\u2026":"\u641C\u7D22\u6A21\u578B\u2026"),q(),P="all",v=a,R(),l==="pricing"?b.hidden=!0:(b.hidden=!1,(l==="brand"?m:w).querySelector('[data-brand="all"]')?.classList.add("is-active")),Q&&(Q.value=""),oe(),X(l),Hr(l),D())},Q=C.codingPlanOverview.querySelector("#brandSearchInput"),oe=()=>{let l=(Q?.value||"").trim().toLowerCase(),f=h==="brand"?m:w;f.querySelectorAll(".brand-tab[data-brand]").forEach(_=>{let G=_.dataset.brand;if(G==="all"||G==="free"){_.hidden=!1;return}let te=(_.dataset.brandLabel||"").toLowerCase();_.hidden=l?!te.includes(l):!1});let x=f.querySelector(".brand-divider");x&&(x.hidden=!1)};Q?.addEventListener("input",oe),b.addEventListener("click",l=>{let f=l.target.closest("[data-dimension]");if(f){O(f.dataset.dimension);return}let x=l.target.closest(".brand-tab");if(!x||!m.contains(x)&&!w.contains(x))return;let _=x.dataset.brand;q(),P=_,R(),x.classList.add("is-active"),K(_),D()});let Ae=(globalThis.location?.pathname||"").replace(/\/+$/,"")||"/",u=new URLSearchParams(globalThis.location?.search||"").get("view")==="pricing";(Ae==="/model"||u)&&O("pricing")}function Hr(e){if(typeof globalThis.history?.replaceState=="function")try{let t=new URL(globalThis.location.href);t.searchParams.delete("view");let n=e==="pricing"?"/model":"/";globalThis.history.replaceState(null,"",`${n}${t.searchParams.toString()?`?${t.searchParams.toString()}`:""}${t.hash}`)}catch{}}function qr(e){if(!C.codingPlanOverview)return;let t=e==="backend"?"\u672C\u5730\u6570\u636E\u5E93\u63A5\u53E3 /api/models \u5F53\u524D\u4E0D\u53EF\u7528\uFF0C\u8BF7\u786E\u8BA4 public-api \u5DF2\u542F\u52A8\u5E76\u8FDE\u63A5\u6570\u636E\u5E93\u3002":"\u90E8\u7F72\u5305\u4E2D\u7684 data.json \u5F53\u524D\u4E0D\u53EF\u7528\uFF0C\u8BF7\u91CD\u65B0\u5BFC\u51FA\u6570\u636E\u5E93\u5FEB\u7167\u5E76\u90E8\u7F72\u3002";C.codingPlanOverview.innerHTML=`
    <section class="plans-workbench" aria-labelledby="codingPlanTitle">
      <div class="workbench-head">
        <div>
          <span id="codingPlanTitle" style="font-weight:bold">\u5957\u9910\u6570\u636E\u6682\u4E0D\u53EF\u7528</span>
        </div>
      </div>
      <div class="workbench-body">
        <p class="text-sm text-slate-600 dark:text-slate-300">${t}</p>
      </div>
    </section>
  `,on()}async function Vr(){Ne();let e=await an();if(e.dataUnavailable){qr(e.source);return}Br(e.plans,e.providerInfo||{},e.modelCatalog||[],e.models||[])}Vr();
