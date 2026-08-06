import{a as $}from"./chunk.FAJ2OYSF.js";import{a as i}from"./chunk.XJPUQ4O3.js";var f={catalog:"\u5957\u9910\u4E0E\u54C1\u724C",data:"\u6570\u636E\u66F4\u65B0",feature:"\u7AD9\u70B9\u529F\u80FD"},b={in_progress:{label:"\u5F00\u53D1\u4E2D",cls:"progress"},planned:{label:"\u5DF2\u89C4\u5212",cls:"planned"},evaluating:{label:"\u8BC4\u4F30\u4E2D",cls:"evaluating"}},w=["in_progress","planned","evaluating"],_={monthly_price:"\u6708\u8D39",first_month_price:"\u9996\u6708\u4EF7",quarterly_price:"\u5B63\u8D39",yearly_price:"\u5E74\u8D39",annual_price:"\u6309\u5E74\u4EF7",monthly_currency:"\u5E01\u79CD",included_calls:"\u5305\u542B\u989D\u5EA6",token_limit:"Token \u4E0A\u9650",five_hours_requests:"5 \u5C0F\u65F6\u9650\u989D",weekly_requests:"\u6BCF\u5468\u9650\u989D",monthly_requests:"\u6BCF\u6708\u9650\u989D",benefits:"\u6743\u76CA",refund_policy:"\u9000\u6B3E\u653F\u7B56",billing_cycle:"\u8BA1\u8D39\u5468\u671F",credits_limit:"Credits \u4E0A\u9650",reset_rule:"\u91CD\u7F6E\u89C4\u5219",notes:"\u5907\u6CE8",url:"\u8D2D\u4E70\u94FE\u63A5",url_en:"\u8D2D\u4E70\u94FE\u63A5",sort_order:"\u6392\u5E8F",input_price:"\u8F93\u5165\u4EF7",output_price:"\u8F93\u51FA\u4EF7",cache_read_price:"\u7F13\u5B58\u8BFB\u4EF7",cache_write_price:"\u7F13\u5B58\u5199\u4EF7",currency:"\u5E01\u79CD",context_length:"\u4E0A\u4E0B\u6587\u957F\u5EA6",max_output:"\u6700\u5927\u8F93\u51FA",lifecycle_status:"\u751F\u547D\u5468\u671F\u72B6\u6001",release_date:"\u53D1\u5E03\u65E5\u671F"},o={count:document.getElementById("changelogEntryCount"),error:document.getElementById("changelogError"),list:document.getElementById("changelogList"),loading:document.getElementById("changelogLoading"),empty:document.getElementById("changelogEmpty"),changelogView:document.getElementById("changelogView"),roadmapList:document.getElementById("roadmapList"),roadmapView:document.getElementById("roadmapView"),roadmapEmpty:document.getElementById("roadmapEmpty"),updatedAt:document.getElementById("changelogUpdatedAt"),filterResult:document.getElementById("filterResult"),dateFilterList:document.getElementById("dateFilterList"),sidebarNav:document.getElementById("changelogSidebarNav"),chips:document.getElementById("changelogChips"),tabbar:document.getElementById("changelogTabbar"),searchInput:document.getElementById("changelogSearchInput")},r={view:"all",category:"",month:"",query:""},d=[],g=[],E=null;function y(t){let e=/^(\d{4})-(\d{2})-(\d{2})$/.exec(String(t||""));return e?`${e[1]}.${e[2]}.${e[3]}`:"\u2014"}function L(t){return t==null||String(t).trim()===""?"\u2014":String(t)}function C(t){let e=t?.scope==="model",a=t?.action==="create",n=e?t?.model_name||t?.canonical_id||"":t?.plan_name||t?.plan_id||"",s=`${a?"\u65B0\u589E":"\u66F4\u65B0"}${e?"\u6A21\u578B":"\u5957\u9910"}`,c=t?.changes&&typeof t.changes=="object"?Object.entries(t.changes):[];return`
    <li class="changelog-diff-item">
      <div class="changelog-diff-head">
        <span class="changelog-diff-action changelog-diff-action--${a?"create":"update"}">${i(s)}</span>
        ${t?.provider?`<span class="changelog-diff-provider">${i(t.provider)}</span>`:""}
        <span class="changelog-diff-subject">${i(n)}</span>
      </div>
      ${c.length?`
      <dl class="changelog-diff-fields">
        ${c.map(([p,m])=>`
        <div class="changelog-diff-field">
          <dt>${i(_[p]||p)}</dt>
          <dd><del>${i(L(m?.from))}</del><span class="changelog-diff-arrow" aria-hidden="true">\u2192</span><ins>${i(L(m?.to))}</ins></dd>
        </div>`).join("")}
      </dl>`:""}
    </li>`}function k(t){let e=Object.hasOwn(f,t?.kind)?t.kind:"data",a=String(t?.date||""),n=Array.isArray(t?.items)?t.items:[],s=Array.isArray(t?.change_items)?t.change_items:[];return`
    <article class="changelog-release" data-changelog-kind="${i(e)}">
      <div class="changelog-date">
        <time datetime="${i(a)}">${i(y(a))}</time>
        <span>${i(a.slice(0,4))}</span>
      </div>
      <div class="changelog-release-body">
        <div class="changelog-release-meta">
          <span>${i(t?.edition||y(a))}</span>
          <span class="changelog-kind changelog-kind--${i(e)}">${i(f[e])}</span>
        </div>
        <h3>${i(t?.title||"\u5185\u5BB9\u66F4\u65B0")}</h3>
        ${t?.summary?`<p class="changelog-release-summary">${i(t.summary)}</p>`:""}
        <ul>
          ${n.map(c=>`
            <li><span class="changelog-item-mark" aria-hidden="true"></span><span>${i(c)}</span></li>`).join("")}
        </ul>
        ${s.length?`
        <ul class="changelog-diff-list" aria-label="\u53D8\u66F4\u660E\u7EC6">
          ${s.map(C).join("")}
        </ul>`:""}
      </div>
    </article>`}function l(t,e){t&&(t.hidden=!e)}function I(t){let e=b[t?.status]||b.planned,a=Number(t?.votes)>0?Number(t.votes):0,n=Array.isArray(t?.users)?t.users.filter(Boolean):[],s=n.length?n.length>2?`${n[0]}\u3001${n[1]} \u7B49 ${n.length} \u4EBA`:n.join("\u3001"):"",c=[t?.platform?i(t.platform):"",s?i(s):"",t?.date?`${y(t.date)} \u63D0\u51FA`:""].filter(Boolean).join(" \xB7 ");return`
    <li class="roadmap-item roadmap-item--${e.cls}">
      <span class="roadmap-status">${e.label}</span>
      <div class="roadmap-body">
        <h3>${i(t?.title||"")}</h3>
        ${t?.note?`<p>${i(t.note)}</p>`:""}
        ${c?`<p class="roadmap-meta">${c}</p>`:""}
      </div>
      ${a?`<span class="roadmap-votes" title="\u7528\u6237\u8BC4\u8BBA\u63D0\u53CA\u6B21\u6570">${a} \u4EBA\u63D0\u53CA</span>`:""}
    </li>`}function S(t){if(g=Array.isArray(t)?t.filter(a=>a&&a.title):[],!o.roadmapList||!o.roadmapView)return;if(!g.length)o.roadmapList.innerHTML="",l(o.roadmapList,!1),l(o.roadmapEmpty,!0);else{let a=[...g].sort((n,s)=>{let c=p=>{let m=w.indexOf(p.status);return m===-1?w.length:m};return c(n)-c(s)||(Number(s.votes)||0)-(Number(n.votes)||0)});o.roadmapList.innerHTML=a.map(I).join(""),l(o.roadmapList,!0),l(o.roadmapEmpty,!1)}let e=document.getElementById("countRoadmap");e&&(e.textContent=g.length.toLocaleString("zh-CN"))}function A(t){d=Array.isArray(t?.entries)?[...t.entries].sort((n,s)=>String(s?.date||"").localeCompare(String(n?.date||""))):[];let e=t?.last_updated||d[0]?.date||"";o.updatedAt.textContent=y(e),o.updatedAt.dateTime=e,o.count.textContent=d.length.toLocaleString("zh-CN");let a=document.getElementById("countAll");a&&(a.textContent=d.length.toLocaleString("zh-CN")),B(),x(),h(),l(o.loading,!1),l(o.error,!1)}function B(){let t={catalog:0,data:0,feature:0};for(let a of d){let n=Object.hasOwn(f,a?.kind)?a.kind:"data";t[n]=(t[n]||0)+1}let e=(a,n)=>{let s=document.getElementById(a);s&&(s.textContent=n.toLocaleString("zh-CN"))};e("catAll",d.length),e("catCatalog",t.catalog),e("catData",t.data),e("catFeature",t.feature)}function x(){if(!o.dateFilterList)return;let t=new Map;for(let n of d){let s=/^(\d{4})-(\d{2})/.exec(n.date||"");if(s){let c=`${s[1]}.${s[2]}`;t.set(c,(t.get(c)||0)+1)}}let e=[...t.keys()].sort((n,s)=>s.localeCompare(n)),a='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>';o.dateFilterList.innerHTML=`
    <button type="button" class="aihot-nav-item aihot-cat-item is-active" data-month="">
      ${a}
      <span>\u5168\u90E8\u65E5\u671F</span>
      <span class="aihot-cat-count">${d.length.toLocaleString("zh-CN")}</span>
    </button>
    ${e.map(n=>`
    <button type="button" class="aihot-nav-item aihot-cat-item" data-month="${i(n)}">
      ${a}
      <span>${i(n)}</span>
      <span class="aihot-cat-count">${(t.get(n)||0).toLocaleString("zh-CN")}</span>
    </button>`).join("")}`}function h(){let t=r.query.trim().toLowerCase(),e=n=>Object.hasOwn(f,n?.kind)?n.kind:"data",a=d.filter(n=>!(r.category&&e(n)!==r.category||r.month&&(n.date||"").slice(0,7).replace("-",".")!==r.month||t&&![n.title,n.summary,...Array.isArray(n.items)?n.items:[]].filter(Boolean).join(" ").toLowerCase().includes(t)));o.list.innerHTML=a.length?a.map(k).join(""):"",l(o.list,a.length>0),l(o.empty,a.length===0),o.filterResult.textContent=a.length===d.length?"":`\u663E\u793A ${a.length.toLocaleString("zh-CN")} / \u5171 ${d.length.toLocaleString("zh-CN")} \u6761`}function v(){document.querySelectorAll("#changelogSidebarNav [data-category]").forEach(t=>{t.classList.toggle("is-active",t.dataset.category===r.category)}),document.querySelectorAll("#changelogSidebarNav [data-month]").forEach(t=>{t.classList.toggle("is-active",t.dataset.month===r.month)})}function u(t){r.view=t==="roadmap"?"roadmap":"all",document.querySelectorAll("#changelogSidebarNav [data-view], #changelogTabbar [data-view]").forEach(a=>{a.classList.toggle("is-active",a.dataset.view===r.view)}),document.querySelectorAll("#changelogChips [data-filter]").forEach(a=>{let n=a.dataset.filter===r.view;a.classList.toggle("is-active",n),a.setAttribute("aria-pressed",String(n))});let e=r.view==="roadmap";l(o.roadmapView,e),l(o.changelogView,!e),l(o.roadmapList,e&&g.length>0),l(o.roadmapEmpty,e&&g.length===0),e?(document.querySelectorAll("#changelogSidebarNav [data-category], #changelogSidebarNav [data-month]").forEach(a=>a.classList.remove("is-active")),o.filterResult&&(o.filterResult.textContent="")):(v(),l(o.loading,!1),l(o.error,d.length===0),h())}function j(t){r.category=t,r.view!=="all"&&u("all"),v(),h()}function N(t){r.month=t,r.view!=="all"&&u("all"),v(),h()}function q(){o.sidebarNav&&o.sidebarNav.addEventListener("click",t=>{let e=t.target.closest("[data-view]");if(e)return u(e.dataset.view);let a=t.target.closest("[data-category]");if(a)return j(a.dataset.category);let n=t.target.closest("[data-month]");if(n)return N(n.dataset.month)}),o.chips&&o.chips.addEventListener("click",t=>{let e=t.target.closest("[data-filter]");e&&u(e.dataset.filter)}),o.tabbar&&o.tabbar.addEventListener("click",t=>{let e=t.target.closest("[data-view]");e&&u(e.dataset.view)}),o.searchInput&&o.searchInput.addEventListener("input",()=>{clearTimeout(E),E=setTimeout(()=>{r.query=o.searchInput.value,r.view!=="all"&&u("all"),h()},200)})}async function T(){try{let t=await fetch("./changelog.json",{cache:"no-cache"});if(!t.ok)throw new Error("Changelog unavailable");A(await t.json())}catch{l(o.loading,!1),l(o.list,!1),l(o.empty,!1),l(o.error,!0)}}async function R(){try{let t=await fetch("./roadmap.json",{cache:"no-cache"});if(!t.ok)return;let e=await t.json();S(e?.items)}catch{}}$();q();T();R();
