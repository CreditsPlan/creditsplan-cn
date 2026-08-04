import{a as me,b as be,c as fe,d as ve,e as he,f as z,g as re,i as ge,j as ye}from"./chunk.5DINVE4W.js";import{a as ie}from"./chunk.EVWXKJNP.js";import{a as A,b as V,e as N,f as G,i as ce,j as de,k as ne,p as ae,q as ue,v as pe}from"./chunk.SYMMVBIG.js";import{a as p}from"./chunk.XJPUQ4O3.js";var we=2,Oe=new Set(["claude-opus-4-8","claude-sonnet-4-6","claude-opus-4-7","claude-opus-4-6","claude-sonnet-4-5","claude-opus-4-5","claude-opus-4-1"]);function B(e){if(e==null||e==="")return null;let t=Number(e);return Number.isFinite(t)?t:null}function J(e,t){let n=B(e);return n==null?"\u5F85\u66F4\u65B0":`${t==="USD"?"$":"\xA5"}${n.toLocaleString("zh-CN",{maximumFractionDigits:4})}`}function xe(e){let t=B(e);return t==null?"\u2014":t>=1e6?`${(t/1e6).toLocaleString("zh-CN",{maximumFractionDigits:1})}M`:t>=1e3?`${(t/1e3).toLocaleString("zh-CN",{maximumFractionDigits:0})}K`:t.toLocaleString("zh-CN")}function q(e){return A[e]||e||"\u672A\u77E5"}var Se={};function Pe(e){let t=G(e,Se,A),n=String(t.seo_slug||"").trim(),a=String(t.seo_intro||"").trim(),o=String(t.icon_url||"").trim();return n&&a&&o?`/brands/${encodeURIComponent(n)}/`:""}function le(e,t){let n=V(e),a=t||n?.iconUrl||"";return z(a,q(e),"brand-icon brand-icon--tab")}function W(e){let t=String(e.raw?.lifecycle_status||"").trim().toLowerCase();if(t)return t==="legacy";if(String(e.vendor||"").trim().toLowerCase()!=="anthropic")return!1;let n=String(e.raw?.model_id||e.raw?.id||e.id||"").trim().toLowerCase().replace(/[._]/g,"-");return Oe.has(n)}function oe(e){let t=String(e.raw?.release_date||"").trim();if(!t)return null;let n=Date.parse(t);return Number.isFinite(n)?n:null}var Y={release:{numeric:!0,raw:oe},name:{label:"\u6A21\u578B",numeric:!1},provider:{label:"\u54C1\u724C",numeric:!1},context:{label:"\u4E0A\u4E0B\u6587",numeric:!0,raw:e=>B(e.raw?.context_length)},input:{label:"\u8F93\u5165\uFF08\u5B98\u65B9\u4EF7\uFF09",numeric:!0,raw:e=>B(e.raw?.input_price)},output:{label:"\u8F93\u51FA\uFF08\u5B98\u65B9\u4EF7\uFF09",numeric:!0,raw:e=>B(e.raw?.output_price)}};function Ae(e,t,n){let a=Y[t];if(!a)return e;let o=[...e];return o.sort((c,d)=>{if(t==="release"){let u=Number(W(c))-Number(W(d));if(u!==0)return u}let f=0;if(a.numeric){let u=a.raw(c),b=a.raw(d);if(u==null||b==null)return u==null&&b==null?0:u==null?1:-1;f=u-b}else t==="name"?f=(c.modelName||"").localeCompare(d.modelName||"","zh-CN"):t==="provider"&&(f=q(c.vendor).localeCompare(q(d.vendor),"zh-CN"));return n==="desc"?-f:f}),o}function Ne(e){let t=new Map;for(let n of e){let a=q(n.vendor),o=t.get(a);o||(o={name:a,vendor:n.vendor,icon:n.providerIconUrl,models:[]},t.set(a,o)),o.models.push(n)}return[...t.values()]}function qe(e,t){let n=Number(W(t))-Number(W(e));if(n!==0)return n>0;let a=oe(e),o=oe(t);return a!=null&&o!=null?a>o:a!=null&&o==null}function Be(e){let t=new Map;for(let n of e){let a=q(n.vendor),o=t.get(a);(!o||qe(n,o))&&t.set(a,n)}return[...t.values()]}function Fe(e){let t=null;for(let n of e){let a=B(n.raw?.input_price);a==null||a<0||(!t||a<t.value)&&(t={value:a,currency:n.raw?.currency})}return t}function De(e){let t=Fe(e.models),n=[];if(t){let a=t.currency==="USD"?"$":"\xA5";n.push(`\u8F93\u5165 ${a}${t.value.toLocaleString("zh-CN",{maximumFractionDigits:4})} \u8D77`)}return n.push(`${e.models.length} \u4E2A\u6A21\u578B`),`<span class="plan-table-group-summary">${p(n.join(" \xB7 "))}</span>`}var ke={name:e=>String(e.modelName||"").trim()||"\u2014",provider:e=>q(e.vendor),context:e=>xe(e.raw?.context_length),input:e=>J(e.raw?.input_price,e.raw?.currency),output:e=>J(e.raw?.output_price,e.raw?.currency)},$e=new Set(["\u2014","\u5F85\u66F4\u65B0"]),Ie=new Intl.Collator("zh-CN",{numeric:!0,sensitivity:"base"});function Ee(e,t){let n=ke[t];return n?String(n(e)||"").trim()||"\u2014":""}function Ue(e,t){let n=new Map;for(let a of e){let o=Ee(a,t);n.set(o,(n.get(o)||0)+1)}return Array.from(n.entries()).map(([a,o])=>({value:a,count:o})).sort((a,o)=>{let c=$e.has(a.value),d=$e.has(o.value);return c!==d?c?1:-1:Ie.compare(a.value,o.value)})}function Re(e,t,n){return e!==t?'<svg class="model-price-sort-icon model-price-sort-icon--idle" viewBox="0 0 12 12" aria-hidden="true"><path d="M6 2l2.5 3h-5zM6 10l-2.5-3h5z" fill="currentColor"/></svg>':`<svg class="model-price-sort-icon" viewBox="0 0 12 12" aria-hidden="true"><path d="${n==="asc"?"M6 2l3 4H3z":"M6 10L3 6h6z"}" fill="currentColor"/></svg>`}function He(e,t,n){let a=Y[e],o=t.column===e&&!!t.value,c=Ue(n,e);return`<button type="button" class="plan-column-filter-trigger model-price-filter-trigger${o?" is-active":""}" data-model-filter-column="${e}" aria-haspopup="menu" aria-expanded="false" title="\u7B5B\u9009${p(a.label)}">
      <span class="plan-column-filter-caret" aria-hidden="true"></span>
    </button>
    <div class="plan-column-filter-menu" data-model-filter-menu="${e}" role="menu" hidden>
      <button type="button" class="plan-column-filter-option${o?"":" is-active"}" data-model-filter-value="">
        <span class="plan-column-filter-option-label">\u5168\u90E8</span>
        <span class="plan-column-filter-option-count">${n.length}</span>
      </button>
      ${c.map(d=>`
        <button type="button" class="plan-column-filter-option${o&&d.value===t.value?" is-active":""}" data-model-filter-value="${p(d.value)}">
          <span class="plan-column-filter-option-label">${p(d.value)}</span>
          <span class="plan-column-filter-option-count">${d.count}</span>
        </button>
      `).join("")}
    </div>`}function Ve(e,t,n,a){let o=(c,d="")=>{let f=Y[c];return`<th class="model-price-th plan-column-filter ${d}" data-sort-key="${c}" role="columnheader" aria-sort="${c===e?t==="asc"?"ascending":"descending":"none"}" tabindex="0">
      <span class="model-price-th-inner">${f.label}${Re(c,e,t)}</span>
      ${He(c,n,a)}
    </th>`};return`<thead class="model-price-thead">
    <tr>
      ${o("name")}
      ${o("provider","model-price-col-provider")}
      ${o("context")}
      ${o("input")}
      ${o("output")}
    </tr>
  </thead>`}function ze(e){let t=B(e.raw?.input_price),n=B(e.raw?.output_price),a=B(e.raw?.context_length),o=e.raw?.currency,c=J(t,o),d=J(n,o),f=xe(a),u=q(e.vendor),b=e.sourceUrl||e.raw?.docs_url||"",g=W(e)?'<span class="model-price-legacy-badge">\u65E7\u7248</span>':"",x=b?`<a class="model-price-name-link" href="${p(b)}" target="_blank" rel="noopener noreferrer nofollow">${p(e.modelName)}</a>`:`<span>${p(e.modelName)}</span>`,y=Pe(e.vendor),S=`${le(e.vendor,e.providerIconUrl)}<span>${p(u)}</span>`,w=y?`<a href="${p(y)}" class="model-price-provider plan-provider-cell--link">${S}</a>`:`<span class="model-price-provider">${S}</span>`;return`<tr class="model-price-row">
    <td class="model-price-td model-price-td--name">
      <span class="model-price-model-name">${x}${g}</span>
    </td>
    <td class="model-price-td model-price-td--provider model-price-col-provider">
      ${w}
    </td>
    <td class="model-price-td model-price-td--context">${p(f)}</td>
    <td class="model-price-td model-price-td--price">
      <span class="model-price-value${t==null?" model-price-value--empty":""}">${p(c)}</span>
      ${t!=null?'<span class="model-price-unit">/\u767E\u4E07tokens</span>':""}
    </td>
    <td class="model-price-td model-price-td--price">
      <span class="model-price-value${n==null?" model-price-value--empty":""}">${p(d)}</span>
      ${n!=null?'<span class="model-price-unit">/\u767E\u4E07tokens</span>':""}
    </td>
  </tr>`}function Ce(e,t,n={}){Se=n||{};let a=t.filter(r=>B(r.raw?.input_price)!=null||B(r.raw?.output_price)!=null),o=new Map;for(let r of a){let s=q(r.vendor);o.has(s)||o.set(s,{name:s,icon:r.providerIconUrl,vendor:r.vendor})}let c=[...o.values()].sort((r,s)=>r.name.localeCompare(s.name,"zh-CN")),d="all",f="release",u="desc",b="brand",g="all",x="",y="",S="",w=new Set;function h(){return!!(y&&S&&ke[y])}function $(){return b==="model"?g==="all"?a:a.filter(r=>(r.modelName||"")===g):d==="all"?a:a.filter(r=>q(r.vendor)===d)}function E(){let r=$(),s=x.toLowerCase();return s&&(r=r.filter(i=>String(i.modelName||"").toLowerCase().includes(s)||q(i.vendor).toLowerCase().includes(s))),r}function _(r){let s=r;return h()&&(s=s.filter(i=>Ee(i,y)===S)),Ae(s,f,u)}function C(){return b==="model"?T():M()}function T(){let r=Be(a).sort((m,k)=>(m.modelName||"").localeCompare(k.modelName||"","zh-CN")),s=`<button type="button" class="brand-tab${g==="all"?" is-active":""}" data-model-tab="all">
      <span>\u5168\u90E8</span><span class="brand-count">${a.length}</span>
    </button>`,i=r.map(m=>{let k=m.modelName||"";return`<button type="button" class="brand-tab${g===k?" is-active":""}" data-model-tab="${p(k)}">
        ${le(m.vendor,m.providerIconUrl)}
        <span>${p(k)}</span>
      </button>`}).join("");return`<div class="brand-tab-list model-price-tabs">${s}<span class="brand-divider"></span>${i}</div>`}function M(){let r=`<button type="button" class="brand-tab${d==="all"?" is-active":""}" data-provider="all">
      <span>\u5168\u90E8</span><span class="brand-count">${a.length}</span>
    </button>`,s=c.map(i=>{let m=a.filter(k=>q(k.vendor)===i.name).length;return`<button type="button" class="brand-tab${d===i.name?" is-active":""}" data-provider="${p(i.name)}">
        ${le(i.vendor,i.icon)}
        <span>${p(i.name)}</span>
        <span class="brand-count">${m}</span>
      </button>`}).join("");return`<div class="brand-tab-list model-price-tabs">${r}<span class="brand-divider"></span>${s}</div>`}function I(r,s){let i=!s&&r.models.length>we,m=s||!i||w.has(r.name),k=m?r.models:r.models.slice(0,we),te=Pe(r.vendor),l=`${z(r.icon||V(r.vendor)?.iconUrl||"",r.name,"brand-icon brand-icon--section")}
            <span class="text-sm font-bold text-brand-800 dark:text-brand-200">${p(r.name)}</span>`,v=`
            ${te?`<a href="${p(te)}" class="plan-table-group-brand">${l}</a>`:l}
            <span class="rounded-full bg-brand-100 px-1.5 py-0.5 text-xs font-medium text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">${r.models.length}</span>
            <span class="plan-table-group-right">
              ${De(r)}
              ${i?'<svg class="plan-table-group-chevron" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m6 8 4 4 4-4"/></svg>':""}
            </span>`;return`
      <tr class="border-y border-slate-200 dark:border-slate-700">
        <td colspan="5" class="bg-brand-50/70 p-0 dark:bg-brand-950/20">
          ${i?`<div class="plan-table-group-toggle" role="button" tabindex="0" data-model-group-toggle="${p(r.name)}" aria-expanded="${m?"true":"false"}" aria-label="${m?"\u6536\u8D77":"\u5C55\u5F00"}${p(r.name)}\u6A21\u578B">${v}</div>`:`<div class="plan-table-group-toggle plan-table-group-toggle--static">${v}</div>`}
        </td>
      </tr>
      ${k.map(ze).join("")}`}function U(r,s){return h()?`<div class="plan-table-filter-summary">
      <span class="plan-table-filter-chip">
        <span>${p(Y[y].label)}</span>
        <strong>${p(S)}</strong>
      </span>
      <span class="plan-table-filter-count">${r} / ${s} \u4E2A\u6A21\u578B</span>
      <button type="button" class="plan-table-filter-clear" data-model-filter-clear>\u6E05\u9664</button>
    </div>`:""}function j(){let r=E();if(!r.length)return`<p class="model-price-empty">${x?"\u6682\u65E0\u5339\u914D\u7684\u6A21\u578B":"\u6682\u65E0\u8BE5\u5382\u5546\u7684\u6A21\u578B\u4EF7\u683C\u6570\u636E"}</p>`;let s=_(r),i=d!=="all"||g!=="all"||h()||!!x,m=s.length?Ne(s).map(k=>I(k,i)).join(""):`<tr>
          <td colspan="5" class="px-3 py-10 text-center text-sm text-slate-500 dark:text-slate-400">\u6682\u65E0\u5339\u914D\u7684\u6A21\u578B</td>
        </tr>`;return`${U(s.length,r.length)}
    <div class="model-price-table-wrap">
      <table class="model-price-table" role="grid" aria-label="\u6A21\u578B\u4EF7\u683C\u5BF9\u6BD4\u8868">
        ${Ve(f,u,{column:y,value:S},r)}
        <tbody class="model-price-tbody">
          ${m}
        </tbody>
      </table>
    </div>
        <p class="model-price-footnote">\u4EF7\u683C\u5355\u4F4D\uFF1A\u8868\u5185\u7B26\u53F7\u6240\u793A\u5E01\u79CD\uFF08\xA5 \u4EBA\u6C11\u5E01 / $ \u7F8E\u5143\uFF0C\u6309\u5382\u5546\u5B98\u65B9\u8BA1\u4EF7\uFF09/ \u767E\u4E07 tokens \xB7 \u6570\u636E\u6765\u6E90\u4E3A\u5404\u5382\u5546\u5B98\u65B9\u5B9A\u4EF7\u9875\uFF0C\u771F\u5B9E\u4EF7\u683C\u8BF7\u4EE5\u5B98\u7F51\u4E3A\u51C6</p>`}function ee(){return`<div class="brand-filter-row model-price-toolbar">
      <div class="brand-tab-list">
        <button type="button" data-model-dimension="brand" class="brand-tab${b==="brand"?" is-active":""}"><span>\u6309\u54C1\u724C</span></button>
        <button type="button" data-model-dimension="model" class="brand-tab${b==="model"?" is-active":""}"><span>\u6309\u6A21\u578B</span></button>
      </div>
      <div class="brand-search-box">
        <svg class="brand-search-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="8.5" cy="8.5" r="5.5"/><path d="M13 13l4 4" stroke-linecap="round"/></svg>
        <input type="search" class="brand-search-input" data-model-search placeholder="\u641C\u7D22\u6A21\u578B\uFF0C\u5982 GPT-5\u3001Claude\u2026" autocomplete="off" aria-label="\u641C\u7D22\u6A21\u578B" value="${p(x)}">
      </div>
    </div>`}function R(){e.innerHTML=`
      <div class="model-price-view">
        ${ee()}
        <div class="model-price-content" data-model-price-content></div>
      </div>`,K(),O()}function O(){let r=e.querySelector("[data-model-price-content]");r&&(r.innerHTML=`${C()}${j()}`,Q())}function K(){e.querySelectorAll("[data-model-dimension]").forEach(s=>{s.addEventListener("click",()=>{let i=s.dataset.modelDimension;if(i===b)return;b=i,d="all",g="all",x="";let m=e.querySelector("[data-model-search]");m&&(m.value=""),e.querySelectorAll("[data-model-dimension]").forEach(k=>{k.classList.toggle("is-active",k.dataset.modelDimension===i)}),O()})});let r=e.querySelector("[data-model-search]");r?.addEventListener("input",()=>{x=r.value.trim(),O()})}function H(){e.querySelectorAll(".plan-column-filter-menu").forEach(r=>{r.hidden=!0}),e.querySelectorAll("[data-model-filter-column]").forEach(r=>r.setAttribute("aria-expanded","false"))}function Q(){e.querySelectorAll(".model-price-tabs .brand-tab").forEach(r=>{r.addEventListener("click",()=>{r.dataset.modelTab!=null?g=r.dataset.modelTab:d=r.dataset.provider,O()})}),e.querySelectorAll("[data-model-group-toggle]").forEach(r=>{let s=i=>{if(i?.target?.closest?.("a"))return;let m=r.dataset.modelGroupToggle;w.has(m)?w.delete(m):w.add(m),O()};r.addEventListener("click",s),r.addEventListener("keydown",i=>{(i.key==="Enter"||i.key===" ")&&(i.preventDefault(),s(i))})}),e.querySelectorAll("[data-model-filter-column]").forEach(r=>{r.addEventListener("click",s=>{s.stopPropagation();let i=r.closest(".plan-column-filter")?.querySelector(".plan-column-filter-menu");if(!i)return;let m=!i.hidden;H(),m||(i.hidden=!1,r.setAttribute("aria-expanded","true"))}),r.addEventListener("keydown",s=>{(s.key==="Enter"||s.key===" ")&&(s.preventDefault(),s.stopPropagation(),r.click())})}),e.querySelectorAll("[data-model-filter-menu]").forEach(r=>{r.addEventListener("click",s=>{s.stopPropagation();let i=s.target.closest("[data-model-filter-value]");if(!i)return;let m=i.dataset.modelFilterValue||"";y=m?r.dataset.modelFilterMenu:"",S=m,O()})}),e.querySelectorAll("[data-model-filter-clear]").forEach(r=>{r.addEventListener("click",()=>{y="",S="",O()})}),e.querySelectorAll(".model-price-th[data-sort-key]").forEach(r=>{let s=i=>{if(i?.target?.closest?.(".plan-column-filter-trigger, .plan-column-filter-menu"))return;let m=r.dataset.sortKey;f===m?u=u==="asc"?"desc":"asc":(f=m,u=(Y[m]?.numeric,"asc")),O()};r.addEventListener("click",s),r.addEventListener("keydown",i=>{(i.key==="Enter"||i.key===" ")&&(i.preventDefault(),s(i))})})}e._modelFilterDocClose&&(document.removeEventListener("click",e._modelFilterDocClose),document.removeEventListener("keydown",e._modelFilterDocKey)),e._modelFilterDocClose=r=>{e.contains(r.target)||H()},e._modelFilterDocKey=r=>{r.key==="Escape"&&H()},document.addEventListener("click",e._modelFilterDocClose),document.addEventListener("keydown",e._modelFilterDocKey),R()}var Le="plan-table-sticky-bar",je=[".plan-table-wrap",".model-price-table-wrap"];function Te(e){if(!e)return;let t=null,n=null,a=null,o=null,c=null,d=0,f=()=>{let w=document.getElementById("header-root");if(w){let E=w.getBoundingClientRect().bottom;if(Number.isFinite(E)&&E>0)return E}let h=window.getComputedStyle(document.documentElement).getPropertyValue("--header-height"),$=parseFloat(h);return Number.isFinite($)&&$>0?$:64},u=()=>{t||(t=document.createElement("div"),t.className=Le,t.setAttribute("aria-hidden","true"),n=document.createElement("div"),n.className=`${Le}__inner`,a=document.createElement("table"),n.appendChild(a),t.appendChild(n),document.body.appendChild(t))},b=w=>{let h=w.querySelector("thead");if(!h)return!1;let $=w.querySelector("colgroup");if(a.className=w.className,a.innerHTML="",$)a.appendChild($.cloneNode(!0));else{let E=[...h.querySelectorAll("th")];if(E.length){let _=document.createElement("colgroup");E.forEach(C=>{let T=document.createElement("col"),M=C.getBoundingClientRect().width;M>0&&(T.style.width=`${M}px`),_.appendChild(T)}),a.appendChild(_)}}return a.appendChild(h.cloneNode(!0)),c=h,!0},g=()=>{t&&t.classList.remove("is-docked")},x=()=>{d=0;let w=e.querySelector(".plan-view-table"),h=je.map(I=>e.querySelector(I)).find(Boolean),$=h?.querySelector("table");if(!h||!$||w&&window.getComputedStyle(w).display==="none"){g();return}o!==h&&(o=h,h.addEventListener("scroll",y,{passive:!0}));let E=f(),_=h.getBoundingClientRect(),C=$.getBoundingClientRect(),T=$.querySelector("thead"),M=T?T.getBoundingClientRect().height:0;if(_.top>E||C.bottom<=E+M){g();return}if(u(),c!==T&&!b($)){g();return}t.style.top=`${E}px`,t.style.left=`${_.left}px`,t.style.width=`${_.width}px`,n.style.width=`${$.offsetWidth}px`,n.style.transform=`translateX(${-h.scrollLeft}px)`,t.classList.add("is-docked")},y=()=>{d||(d=requestAnimationFrame(x))};new MutationObserver(()=>{c=null,y()}).observe(e,{childList:!0,subtree:!0}),window.addEventListener("scroll",y,{passive:!0}),window.addEventListener("resize",y),y()}var Ge=[{id:"all",label:"\u5168\u90E8"},{id:"free",label:"\u514D\u8D39"}],Z={plans:{title:"\u56FD\u5185 AI Coding \u5957\u9910\u5BF9\u6BD4\u4E0E\u51B3\u7B56",summary:"\u7ED3\u6784\u5316\u6BD4\u8F83\u4EF7\u683C\u3001\u989D\u5EA6\u3001\u6A21\u578B\u4E0E\u56FD\u5185\u4F7F\u7528\u6761\u4EF6\uFF1B\u8FFD\u8E2A\u4EF7\u683C\u53D8\u5316\uFF0C\u4FDD\u7559\u5B98\u65B9\u6765\u6E90\u548C\u6838\u5BF9\u65E5\u671F\uFF0C\u5E2E\u4F60\u66F4\u5FEB\u5B8C\u6210\u5DE5\u5177\u9009\u578B\u4E0E\u6210\u672C\u51B3\u7B56\u3002\u771F\u5B9E\u4EF7\u683C\u8BF7\u4EE5\u5382\u5546\u5B98\u7F51\u4E3A\u51C6\u3002"},pricing:{title:"\u56FD\u5185 AI \u6A21\u578B\u4EF7\u683C\u5BF9\u6BD4",summary:"\u5BF9\u6BD4\u56FD\u5185\u4E3B\u6D41\u6A21\u578B\u7684\u5B98\u65B9 API \u5355\u4EF7\uFF08\u8F93\u5165/\u8F93\u51FA\uFF0C\xA5/\u767E\u4E07 tokens\uFF09\u4E0E\u4E0A\u4E0B\u6587\u957F\u5EA6\uFF0C\u6570\u636E\u6765\u81EA\u5382\u5546\u5B98\u65B9\u5B9A\u4EF7\u9875\u3002\u771F\u5B9E\u4EF7\u683C\u8BF7\u4EE5\u5382\u5546\u5B98\u7F51\u4E3A\u51C6\u3002"}};function We(e){let t=e.raw?.input_price,n=e.raw?.output_price;return t!=null&&t!==""||n!=null&&n!==""}function Ye(e){let t=e.filter(n=>(n.monthlyCurrency||"CNY")==="CNY").map(n=>n.monthlyPriceValue).filter(n=>Number.isFinite(n)&&n>0);return t.length?t.reduce((n,a)=>n+a,0)/t.length:null}var P={codingPlanOverview:document.getElementById("codingPlanOverview")};function Me(){P.codingPlanOverview&&(P.codingPlanOverview.classList.remove("plans-loading-shell"),P.codingPlanOverview.setAttribute("aria-busy","false"))}function Ke(e,t){let n=new Map;for(let a of e){let o=V(a.provider),c=String(a.provider||"").trim(),d=A[c]||c;if(!d)continue;let f=G(c,t,A),u=o?.id||d,b=n.get(u);b?b.iconUrl||(b.iconUrl=N(f.icon_url)||N(a.providerIconUrl)||N(o?.iconUrl)):(b={id:u,provider:c,label:ce(c,t,A),iconUrl:N(f.icon_url)||N(a.providerIconUrl)||N(o?.iconUrl),sortOrder:de(c,t,A),plans:[]},n.set(u,b)),b.plans.push(a)}for(let a of n.values())a.plans=ne(a.plans);return n}function Qe(e,t,n={}){let a=new Map;for(let o of t){let c=e.filter(u=>Array.isArray(u.modelIds)&&u.modelIds.includes(o.id));if(!c.length)continue;let d=G(o.provider,n,A),f=N(o.logoUrl)||N(d.icon_url)||N(o.providerIconUrl)||N(V(o.provider)?.iconUrl);a.set(`model:${o.id}`,{id:`model:${o.id}`,label:o.name||o.id,iconUrl:f,sortOrder:Number.isFinite(o.sortOrder)?o.sortOrder:99,plans:ne(c)})}return a}function Xe(e){let t=pe(e);if(t.state!=="ok")return"";let n=t.hours<24?`\u6570\u636E\u66F4\u65B0\u4E8E ${t.hours} \u5C0F\u65F6\u524D`:t.days<60?`\u6570\u636E\u66F4\u65B0\u4E8E ${t.days} \u5929\u524D`:`\u6570\u636E\u66F4\u65B0\u4E8E ${t.date}`,a=`\u6700\u8FD1\u4E00\u6B21\u5B98\u65B9\u9875\u6838\u9A8C\uFF1A${t.date} \xB7 ${t.verifiedCount}/${t.total} \u4E2A\u5957\u9910\u6709\u6838\u9A8C\u8BB0\u5F55`;return`<span id="dataFreshness" class="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-300" title="${p(a)}">
    <span class="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true"></span>
    ${p(n)}
  </span>`}function Je(){return`
    <div class="cn-hero-banner" role="complementary" aria-label="\u56FD\u5185\u7AD9\u4EF7\u503C\u4E3B\u5F20">
      <div class="cn-hero-banner__points">
        <span class="cn-hero-point"><span aria-hidden="true">\xA5</span>\u4EBA\u6C11\u5E01\u5145\u503C</span>
        <span class="cn-hero-point"><span aria-hidden="true">\u25A1</span>\u53EF\u5F00\u53D1\u7968</span>
        <span class="cn-hero-point"><span aria-hidden="true">\u25C8</span>\u56FD\u5185\u7F51\u7EDC\u76F4\u8FDE</span>
      </div>
      <a class="cn-hero-banner__intl" href="https://www.creditsplan.com/" target="_blank" rel="noopener noreferrer">\u6D77\u5916\u5957\u9910\uFF1F\u524D\u5F80 creditsplan.com \u2192</a>
    </div>
  `}function Ze(e){let t=P.codingPlanOverview.querySelector("#plansBackTop");if(!t||!e)return;let n=()=>{let a=e.getBoundingClientRect();t.classList.toggle("is-visible",a.top<-160&&a.bottom>160)};t.addEventListener("click",()=>{let a=window.matchMedia("(prefers-reduced-motion: reduce)").matches;e.scrollIntoView({behavior:a?"auto":"smooth",block:"start"})}),window.addEventListener("scroll",n,{passive:!0}),window.addEventListener("resize",n),n()}function et(){return`
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
  `}function tt(e,t,n,a=()=>"plans",o=()=>[]){let c=e.querySelector("#plansExportTrigger"),d=e.querySelector("#plansExportMenu");if(!c||!d)return;let f=()=>{d.hidden=!0,c.setAttribute("aria-expanded","false")};c.addEventListener("click",()=>{let u=d.hidden;d.hidden=!u,c.setAttribute("aria-expanded",String(u))}),document.addEventListener("click",u=>{e.querySelector("#plansExport")?.contains(u.target)||f()}),document.addEventListener("keydown",u=>{u.key==="Escape"&&f()}),d.addEventListener("click",async u=>{let b=u.target.closest("[data-export-format]");if(!b)return;f();let g=b.dataset.exportFormat,x=await import("./chunk.OOKX6GLW.js");if(a()==="pricing"){let S=o();g==="excel"?x.exportModelPricesExcel(S):g==="word"?x.exportModelPricesWord(S):g==="pdf"&&x.exportModelPricesPdf(S);return}let y=t();g==="excel"?x.exportPlansExcel(y,n):g==="word"?x.exportPlansWord(y,n):g==="pdf"&&x.exportPlansPdf(y,n)})}function nt(e,t={},n=[],a=[]){if(!P.codingPlanOverview)return;let o=ue(e,t,A),c=Ke(o,t),d=[...c.values()].sort((l,v)=>l.sortOrder-v.sortOrder),f=Qe(o,n,t),u=[...f.values()].sort((l,v)=>l.sortOrder-v.sortOrder||l.label.localeCompare(v.label,"zh-CN")),b={all:o.length,free:ae(o).length},g=Ye(o),x=`
            ${g!=null?`<span class="workbench-stat workbench-stat--primary" title="\u4EBA\u6C11\u5E01\u8BA1\u4EF7\u4E14\u6709\u6708\u4EF7\u7684\u5957\u9910\u5747\u503C">
              <span class="workbench-stat-value">\xA5${Math.round(g)}</span>
              <span class="workbench-stat-label">\u5E73\u5747\u6708\u4ED8</span>
            </span>`:""}
            <span class="workbench-stat"><strong>${o.length}</strong> \u6761\u8BB0\u5F55</span>
            <span class="workbench-stat"><strong>${d.length}</strong> \u4E2A\u54C1\u724C</span>
            <span class="workbench-stat"><strong>${u.length}</strong> \u4E2A\u6A21\u578B</span>`;P.codingPlanOverview.innerHTML=`
    <section class="plans-workbench" aria-labelledby="codingPlanTitle">
      <div class="workbench-head">
        <div class="workbench-intro">
          <p class="workbench-kicker">AI \u5F00\u53D1\u8005\u8BA2\u9605\u51B3\u7B56\u5E73\u53F0</p>
          <h1 id="codingPlanTitle" class="workbench-title">${p(Z.plans.title)}</h1>
          <p id="workbenchSummary" class="workbench-summary">${p(Z.plans.summary)}</p>
        </div>
        <div class="workbench-meta">
          <span id="workbenchStats">${x}
          </span>
          ${Xe(o)}
          ${et()}
        </div>
      </div>
      ${Je()}
      <div class="workbench-body">
        <div id="brandFilterBar" class="brand-filter-bar">
          <div class="brand-filter-row">
            <div id="dimensionSwitch" class="brand-tab-list">
              <button type="button" data-dimension="brand" class="brand-tab is-active"><span>\u6309\u54C1\u724C</span></button>
              <button type="button" data-dimension="model" class="brand-tab"><span>\u6309\u6A21\u578B</span></button>
            </div>
            <button type="button" class="plan-quick-filter" data-plan-available-toggle aria-pressed="false">
              <span class="plan-quick-filter-mark" aria-hidden="true">\u2713</span>\u53EA\u770B\u53EF\u8D2D\u4E70
            </button>
            <div class="brand-search-box">
              <svg class="brand-search-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="8.5" cy="8.5" r="5.5"/><path d="M13 13l4 4" stroke-linecap="round"/></svg>
              <input id="brandSearchInput" type="search" class="brand-search-input" placeholder="\u641C\u7D22\u54C1\u724C\u6216\u6A21\u578B\uFF0C\u5982 Qoder\u3001Claude\u2026" autocomplete="off" aria-label="\u641C\u7D22\u54C1\u724C\u6216\u6A21\u578B">
            </div>
          </div>
          <div id="brandTabs" class="brand-tab-list">
            ${Ge.map(l=>`
              <button type="button" data-brand="${l.id}" data-brand-label="${p(l.label)}" class="brand-tab${l.id==="all"?" is-active":""}">
                <span>${p(l.label)}</span>
                ${b[l.id]>0?`<span class="brand-count">${b[l.id]}</span>`:""}
              </button>
            `).join("")}
            <span class="brand-divider"></span>
            ${d.map(l=>`<button type="button" data-brand="${p(l.id)}" data-brand-label="${p(l.label)}" class="brand-tab">
                ${z(l.iconUrl,l.label,"brand-icon brand-icon--tab")}
                <span>${p(l.label)}</span>
                <span class="brand-count">${l.plans.length}</span>
              </button>`).join("")}
          </div>
          <div id="modelTabs" class="brand-tab-list" hidden>
            <button type="button" data-brand="all" data-brand-label="\u5168\u90E8" class="brand-tab is-active">
              <span>\u5168\u90E8</span>
              ${b.all>0?`<span class="brand-count">${b.all}</span>`:""}
            </button>
            <span class="brand-divider"></span>
            ${u.map(l=>`<button type="button" data-brand="${p(l.id)}" data-brand-label="${p(l.label)}" class="brand-tab">
                ${z(l.iconUrl,l.label,"brand-icon brand-icon--tab")}
                <span>${p(l.label)}</span>
                <span class="brand-count">${l.plans.length}</span>
              </button>`).join("")}
          </div>
        </div>
        <div id="brandDetail" class="brand-detail">
          ${re(o,"",t)}
        </div>
      </div>
    </section>
    <button id="plansBackTop" class="plans-back-top" type="button" aria-label="\u8FD4\u56DE\u5957\u9910\u5217\u8868\u9876\u90E8" title="\u8FD4\u56DE\u9876\u90E8">
      <span aria-hidden="true">\u2191</span>
    </button>
    <button id="planAdvisorFab" class="plan-advisor-fab" type="button" aria-label="\u6253\u5F00\u5957\u9910\u6027\u4EF7\u6BD4\u8BA1\u7B97\u5668" title="\u54EA\u4E2A\u5957\u9910\u6700\u5212\u7B97\uFF1F">
      <span aria-hidden="true">\xA5</span>
      <span>\u5E2E\u6211\u9009\u5957\u9910</span>
    </button>
  `,Me();let y=P.codingPlanOverview.querySelector(".plans-workbench"),S=P.codingPlanOverview.querySelector("#brandFilterBar"),w=P.codingPlanOverview.querySelector("#brandTabs"),h=P.codingPlanOverview.querySelector("#modelTabs"),$=P.codingPlanOverview.querySelector("#brandDetail");Ze(y),Te($);let E=P.codingPlanOverview.querySelector("#planAdvisorFab"),_=ge({plans:o,providerInfo:t,modelCatalog:n,fab:E});_&&location.hash==="#advisor"&&_.open();let C=o,T="all",M="brand";tt(P.codingPlanOverview,()=>ve(C),t,()=>M,()=>a);let I="",U=new Set,j=S.querySelector("[data-plan-available-toggle]"),ee=()=>{if(!j)return;let l=me();j.classList.toggle("is-active",l),j.setAttribute("aria-pressed",String(l))},R=()=>{if(ee(),M==="pricing"){Ce($,a,t);return}$.innerHTML=re(C,I,t,U,T!=="all")},O=()=>{fe(),I="",U.clear()},K=()=>{U.clear(),R()};he($,()=>C,K,l=>{I=I===l?"":l,R()});let H=l=>{U.has(l)?U.delete(l):U.add(l),R()};$.addEventListener("click",l=>{if(l.target.closest("a"))return;let v=l.target.closest("[data-plan-group-toggle]");v&&H(v.dataset.planGroupToggle)}),$.addEventListener("keydown",l=>{if(l.key!=="Enter"&&l.key!==" ")return;let v=l.target.closest("[data-plan-group-toggle]");!v||v.tagName==="BUTTON"||l.target.closest("a")||(l.preventDefault(),H(v.dataset.planGroupToggle))});let Q=()=>{[w,h].forEach(l=>{l.querySelectorAll(".brand-tab").forEach(v=>v.classList.remove("is-active"))})},r=l=>{l==="all"?C=o:l==="free"?C=ae(o):c.has(l)?C=c.get(l).plans:f.has(l)&&(C=f.get(l).plans)},s=l=>{let v=l==="pricing"?Z.pricing:Z.plans,F=P.codingPlanOverview.querySelector("#codingPlanTitle"),L=P.codingPlanOverview.querySelector("#workbenchSummary"),D=P.codingPlanOverview.querySelector("#workbenchStats");if(F&&(F.textContent=v.title),L&&(L.textContent=v.summary),!!D)if(l==="pricing"){let X=a.filter(We),_e=new Set(X.map(se=>A[se.vendor]||se.vendor)).size;D.innerHTML=`<span><strong>${X.length}</strong> \u4E2A\u6A21\u578B</span><span><strong>${_e}</strong> \u4E2A\u5382\u5546</span>`}else D.innerHTML=x},i=l=>{l!==M&&(M=l,S.querySelectorAll("[data-dimension]").forEach(v=>{v.classList.toggle("is-active",v.dataset.dimension===l)}),w.hidden=l!=="brand",h.hidden=l!=="model",m&&(m.placeholder=l==="brand"?"\u641C\u7D22\u54C1\u724C\u2026":"\u641C\u7D22\u6A21\u578B\u2026"),O(),T="all",C=o,Q(),l==="pricing"?S.hidden=!0:(S.hidden=!1,(l==="brand"?w:h).querySelector('[data-brand="all"]')?.classList.add("is-active")),E&&(E.hidden=l==="pricing"),m&&(m.value=""),k(),s(l),at(l),R())},m=P.codingPlanOverview.querySelector("#brandSearchInput"),k=()=>{let l=(m?.value||"").trim().toLowerCase(),v=M==="brand"?w:h;v.querySelectorAll(".brand-tab[data-brand]").forEach(L=>{let D=L.dataset.brand;if(D==="all"||D==="free"){L.hidden=!1;return}let X=(L.dataset.brandLabel||"").toLowerCase();L.hidden=l?!X.includes(l):!1});let F=v.querySelector(".brand-divider");F&&(F.hidden=!1)};m?.addEventListener("input",k),S.addEventListener("click",l=>{if(l.target.closest("[data-plan-available-toggle]")){be(),K();return}let F=l.target.closest("[data-dimension]");if(F){i(F.dataset.dimension);return}let L=l.target.closest(".brand-tab");if(!L||!w.contains(L)&&!h.contains(L))return;let D=L.dataset.brand;O(),T=D,Q(),L.classList.add("is-active"),r(D),R()}),((globalThis.location?.pathname||"").replace(/\/+$/,"")||"/")==="/model"&&i("pricing")}function at(e){if(typeof globalThis.history?.replaceState=="function")try{let t=new URL(globalThis.location.href),n=e==="pricing"?"/model":"/";globalThis.history.replaceState(null,"",`${n}${t.searchParams.toString()?`?${t.searchParams.toString()}`:""}${t.hash}`)}catch{}}function rt(e){if(!P.codingPlanOverview)return;let t=e==="backend"?"\u672C\u5730\u6570\u636E\u5E93\u63A5\u53E3 /api/models \u5F53\u524D\u4E0D\u53EF\u7528\uFF0C\u8BF7\u786E\u8BA4 public-api \u5DF2\u542F\u52A8\u5E76\u8FDE\u63A5\u6570\u636E\u5E93\u3002":"\u90E8\u7F72\u5305\u4E2D\u7684 data.json \u5F53\u524D\u4E0D\u53EF\u7528\uFF0C\u8BF7\u91CD\u65B0\u5BFC\u51FA\u6570\u636E\u5E93\u5FEB\u7167\u5E76\u90E8\u7F72\u3002";P.codingPlanOverview.innerHTML=`
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
  `,Me()}async function lt(){ie();let e=await ye();if(e.dataUnavailable){rt(e.source);return}nt(e.plans,e.providerInfo||{},e.modelCatalog||[],e.models||[])}lt();
