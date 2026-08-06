import{a as oe,b as se,c as Z,d as he,e as ge,f as ye,g as we,h as $e,i as xe,j as Se,k as z,l as ie,n as Pe,o as ke}from"./chunk.44NL7KED.js";import{a as pe}from"./chunk.CYED57AH.js";import{a as A,b as V,e as N,f as G,i as me,j as be,k as re,p as le,q as fe,v as ve}from"./chunk.5Y4JLNMC.js";import{a as p}from"./chunk.XJPUQ4O3.js";var Ee=2,De=new Set(["claude-opus-4-8","claude-sonnet-4-6","claude-opus-4-7","claude-opus-4-6","claude-sonnet-4-5","claude-opus-4-5","claude-opus-4-1"]);function B(e){if(e==null||e==="")return null;let t=Number(e);return Number.isFinite(t)?t:null}function ee(e,t){let n=B(e);return n==null?"\u5F85\u66F4\u65B0":`${t==="USD"?"$":"\xA5"}${n.toLocaleString("zh-CN",{maximumFractionDigits:4})}`}function Le(e){let t=B(e);return t==null?"\u2014":t>=1e6?`${(t/1e6).toLocaleString("zh-CN",{maximumFractionDigits:1})}M`:t>=1e3?`${(t/1e3).toLocaleString("zh-CN",{maximumFractionDigits:0})}K`:t.toLocaleString("zh-CN")}function q(e){return A[e]||e||"\u672A\u77E5"}var Te={};function Me(e){let t=G(e,Te,A),n=String(t.seo_slug||"").trim(),a=String(t.seo_intro||"").trim(),o=String(t.icon_url||"").trim();return n&&a&&o?`/brands/${encodeURIComponent(n)}/`:""}function ce(e,t){let n=V(e),a=t||n?.iconUrl||"";return z(a,q(e),"brand-icon brand-icon--tab")}function Y(e){let t=String(e.raw?.lifecycle_status||"").trim().toLowerCase();if(t)return t==="legacy";if(String(e.vendor||"").trim().toLowerCase()!=="anthropic")return!1;let n=String(e.raw?.model_id||e.raw?.id||e.id||"").trim().toLowerCase().replace(/[._]/g,"-");return De.has(n)}function de(e){let t=String(e.raw?.release_date||"").trim();if(!t)return null;let n=Date.parse(t);return Number.isFinite(n)?n:null}var K={release:{numeric:!0,raw:de},name:{label:"\u6A21\u578B",numeric:!1},provider:{label:"\u54C1\u724C",numeric:!1},context:{label:"\u4E0A\u4E0B\u6587",numeric:!0,raw:e=>B(e.raw?.context_length)},input:{label:"\u8F93\u5165\uFF08\u5B98\u65B9\u4EF7\uFF09",numeric:!0,raw:e=>B(e.raw?.input_price)},output:{label:"\u8F93\u51FA\uFF08\u5B98\u65B9\u4EF7\uFF09",numeric:!0,raw:e=>B(e.raw?.output_price)}};function Ie(e,t,n){let a=K[t];if(!a)return e;let o=[...e];return o.sort((c,d)=>{if(t==="release"){let u=Number(Y(c))-Number(Y(d));if(u!==0)return u}let v=0;if(a.numeric){let u=a.raw(c),f=a.raw(d);if(u==null||f==null)return u==null&&f==null?0:u==null?1:-1;v=u-f}else t==="name"?v=(c.modelName||"").localeCompare(d.modelName||"","zh-CN"):t==="provider"&&(v=q(c.vendor).localeCompare(q(d.vendor),"zh-CN"));return n==="desc"?-v:v}),o}function Ue(e){let t=new Map;for(let n of e){let a=q(n.vendor),o=t.get(a);o||(o={name:a,vendor:n.vendor,icon:n.providerIconUrl,models:[]},t.set(a,o)),o.models.push(n)}return[...t.values()]}function Re(e,t){let n=Number(Y(t))-Number(Y(e));if(n!==0)return n>0;let a=de(e),o=de(t);return a!=null&&o!=null?a>o:a!=null&&o==null}function He(e){let t=new Map;for(let n of e){let a=q(n.vendor),o=t.get(a);(!o||Re(n,o))&&t.set(a,n)}return[...t.values()]}function Ve(e){let t=null;for(let n of e){let a=B(n.raw?.input_price);a==null||a<0||(!t||a<t.value)&&(t={value:a,currency:n.raw?.currency})}return t}function ze(e){let t=Ve(e.models),n=[];if(t){let a=t.currency==="USD"?"$":"\xA5";n.push(`\u8F93\u5165 ${a}${t.value.toLocaleString("zh-CN",{maximumFractionDigits:4})} \u8D77`)}return n.push(`${e.models.length} \u4E2A\u6A21\u578B`),`<span class="plan-table-group-summary">${p(n.join(" \xB7 "))}</span>`}var _e={name:e=>String(e.modelName||"").trim()||"\u2014",provider:e=>q(e.vendor),context:e=>Le(e.raw?.context_length),input:e=>ee(e.raw?.input_price,e.raw?.currency),output:e=>ee(e.raw?.output_price,e.raw?.currency)},Ce=new Set(["\u2014","\u5F85\u66F4\u65B0"]),We=new Intl.Collator("zh-CN",{numeric:!0,sensitivity:"base"});function Oe(e,t){let n=_e[t];return n?String(n(e)||"").trim()||"\u2014":""}function je(e,t){let n=new Map;for(let a of e){let o=Oe(a,t);n.set(o,(n.get(o)||0)+1)}return Array.from(n.entries()).map(([a,o])=>({value:a,count:o})).sort((a,o)=>{let c=Ce.has(a.value),d=Ce.has(o.value);return c!==d?c?1:-1:We.compare(a.value,o.value)})}function Ge(e,t,n){return e!==t?'<svg class="model-price-sort-icon model-price-sort-icon--idle" viewBox="0 0 12 12" aria-hidden="true"><path d="M6 2l2.5 3h-5zM6 10l-2.5-3h5z" fill="currentColor"/></svg>':`<svg class="model-price-sort-icon" viewBox="0 0 12 12" aria-hidden="true"><path d="${n==="asc"?"M6 2l3 4H3z":"M6 10L3 6h6z"}" fill="currentColor"/></svg>`}function Ye(e,t,n){let a=K[e],o=t.column===e&&!!t.value,c=je(n,e);return`<button type="button" class="plan-column-filter-trigger model-price-filter-trigger${o?" is-active":""}" data-model-filter-column="${e}" aria-haspopup="menu" aria-expanded="false" title="\u7B5B\u9009${p(a.label)}">
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
    </div>`}function Ke(e,t,n,a){let o=(c,d="")=>{let v=K[c];return`<th class="model-price-th plan-column-filter ${d}" data-sort-key="${c}" role="columnheader" aria-sort="${c===e?t==="asc"?"ascending":"descending":"none"}" tabindex="0">
      <span class="model-price-th-inner">${v.label}${Ge(c,e,t)}</span>
      ${Ye(c,n,a)}
    </th>`};return`<thead class="model-price-thead">
    <tr>
      ${o("name")}
      ${o("provider","model-price-col-provider")}
      ${o("context")}
      ${o("input")}
      ${o("output")}
    </tr>
  </thead>`}function Qe(e){let t=B(e.raw?.input_price),n=B(e.raw?.output_price),a=B(e.raw?.context_length),o=e.raw?.currency,c=ee(t,o),d=ee(n,o),v=Le(a),u=q(e.vendor),f=e.sourceUrl||e.raw?.docs_url||"",g=Y(e)?'<span class="model-price-legacy-badge">\u65E7\u7248</span>':"",P=f?`<a class="model-price-name-link" href="${p(f)}" target="_blank" rel="noopener noreferrer nofollow">${p(e.modelName)}</a>`:`<span>${p(e.modelName)}</span>`,y=Me(e.vendor),$=`${ce(e.vendor,e.providerIconUrl)}<span>${p(u)}</span>`,w=y?`<a href="${p(y)}" class="model-price-provider plan-provider-cell--link">${$}</a>`:`<span class="model-price-provider">${$}</span>`;return`<tr class="model-price-row">
    <td class="model-price-td model-price-td--name">
      <span class="model-price-model-name">${P}${g}</span>
    </td>
    <td class="model-price-td model-price-td--provider model-price-col-provider">
      ${w}
    </td>
    <td class="model-price-td model-price-td--context">${p(v)}</td>
    <td class="model-price-td model-price-td--price">
      <span class="model-price-value${t==null?" model-price-value--empty":""}">${p(c)}</span>
      ${t!=null?'<span class="model-price-unit">/\u767E\u4E07tokens</span>':""}
    </td>
    <td class="model-price-td model-price-td--price">
      <span class="model-price-value${n==null?" model-price-value--empty":""}">${p(d)}</span>
      ${n!=null?'<span class="model-price-unit">/\u767E\u4E07tokens</span>':""}
    </td>
  </tr>`}function Ae(e,t,n={}){Te=n||{};let a=t.filter(r=>B(r.raw?.input_price)!=null||B(r.raw?.output_price)!=null),o=new Map;for(let r of a){let s=q(r.vendor);o.has(s)||o.set(s,{name:s,icon:r.providerIconUrl,vendor:r.vendor})}let c=[...o.values()].sort((r,s)=>r.name.localeCompare(s.name,"zh-CN")),d="all",v="release",u="desc",f="brand",g="all",P="",y="",$="",w=new Set;function m(){return!!(y&&$&&_e[y])}function x(){return f==="model"?g==="all"?a:a.filter(r=>(r.modelName||"")===g):d==="all"?a:a.filter(r=>q(r.vendor)===d)}function E(){let r=x(),s=P.toLowerCase();return s&&(r=r.filter(i=>String(i.modelName||"").toLowerCase().includes(s)||q(i.vendor).toLowerCase().includes(s))),r}function O(r){let s=r;return m()&&(s=s.filter(i=>Oe(i,y)===$)),Ie(s,v,u)}function C(){return f==="model"?T():M()}function T(){let r=He(a).sort((b,S)=>(b.modelName||"").localeCompare(S.modelName||"","zh-CN")),s=`<button type="button" class="brand-tab${g==="all"?" is-active":""}" data-model-tab="all">
      <span>\u5168\u90E8</span><span class="brand-count">${a.length}</span>
    </button>`,i=r.map(b=>{let S=b.modelName||"";return`<button type="button" class="brand-tab${g===S?" is-active":""}" data-model-tab="${p(S)}">
        ${ce(b.vendor,b.providerIconUrl)}
        <span>${p(S)}</span>
      </button>`}).join("");return`<div class="brand-tab-list model-price-tabs">${s}<span class="brand-divider"></span>${i}</div>`}function M(){let r=`<button type="button" class="brand-tab${d==="all"?" is-active":""}" data-provider="all">
      <span>\u5168\u90E8</span><span class="brand-count">${a.length}</span>
    </button>`,s=c.map(i=>{let b=a.filter(S=>q(S.vendor)===i.name).length;return`<button type="button" class="brand-tab${d===i.name?" is-active":""}" data-provider="${p(i.name)}">
        ${ce(i.vendor,i.icon)}
        <span>${p(i.name)}</span>
        <span class="brand-count">${b}</span>
      </button>`}).join("");return`<div class="brand-tab-list model-price-tabs">${r}<span class="brand-divider"></span>${s}</div>`}function I(r,s){let i=!s&&r.models.length>Ee,b=s||!i||w.has(r.name),S=b?r.models:r.models.slice(0,Ee),j=Me(r.vendor),ae=`${z(r.icon||V(r.vendor)?.iconUrl||"",r.name,"brand-icon brand-icon--section")}
            <span class="text-sm font-bold text-brand-800 dark:text-brand-200">${p(r.name)}</span>`,l=`
            ${j?`<a href="${p(j)}" class="plan-table-group-brand">${ae}</a>`:ae}
            <span class="rounded-full bg-brand-100 px-1.5 py-0.5 text-xs font-medium text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">${r.models.length}</span>
            <span class="plan-table-group-right">
              ${ze(r)}
              ${i?'<svg class="plan-table-group-chevron" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m6 8 4 4 4-4"/></svg>':""}
            </span>`;return`
      <tr class="border-y border-slate-200 dark:border-slate-700">
        <td colspan="5" class="bg-brand-50/70 p-0 dark:bg-brand-950/20">
          ${i?`<div class="plan-table-group-toggle" role="button" tabindex="0" data-model-group-toggle="${p(r.name)}" aria-expanded="${b?"true":"false"}" aria-label="${b?"\u6536\u8D77":"\u5C55\u5F00"}${p(r.name)}\u6A21\u578B">${l}</div>`:`<div class="plan-table-group-toggle plan-table-group-toggle--static">${l}</div>`}
        </td>
      </tr>
      ${S.map(Qe).join("")}`}function U(r,s){return m()?`<div class="plan-table-filter-summary">
      <span class="plan-table-filter-chip">
        <span>${p(K[y].label)}</span>
        <strong>${p($)}</strong>
      </span>
      <span class="plan-table-filter-count">${r} / ${s} \u4E2A\u6A21\u578B</span>
      <button type="button" class="plan-table-filter-clear" data-model-filter-clear>\u6E05\u9664</button>
    </div>`:""}function W(){let r=E();if(!r.length)return`<p class="model-price-empty">${P?"\u6682\u65E0\u5339\u914D\u7684\u6A21\u578B":"\u6682\u65E0\u8BE5\u5382\u5546\u7684\u6A21\u578B\u4EF7\u683C\u6570\u636E"}</p>`;let s=O(r),i=d!=="all"||g!=="all"||m()||!!P,b=s.length?Ue(s).map(S=>I(S,i)).join(""):`<tr>
          <td colspan="5" class="px-3 py-10 text-center text-sm text-slate-500 dark:text-slate-400">\u6682\u65E0\u5339\u914D\u7684\u6A21\u578B</td>
        </tr>`;return`${U(s.length,r.length)}
    <div class="model-price-table-wrap">
      <table class="model-price-table" role="grid" aria-label="\u6A21\u578B\u4EF7\u683C\u5BF9\u6BD4\u8868">
        ${Ke(v,u,{column:y,value:$},r)}
        <tbody class="model-price-tbody">
          ${b}
        </tbody>
      </table>
    </div>
        <p class="model-price-footnote">\u4EF7\u683C\u5355\u4F4D\uFF1A\u8868\u5185\u7B26\u53F7\u6240\u793A\u5E01\u79CD\uFF08\xA5 \u4EBA\u6C11\u5E01 / $ \u7F8E\u5143\uFF0C\u6309\u5382\u5546\u5B98\u65B9\u8BA1\u4EF7\uFF09/ \u767E\u4E07 tokens \xB7 \u6570\u636E\u6765\u6E90\u4E3A\u5404\u5382\u5546\u5B98\u65B9\u5B9A\u4EF7\u9875\uFF0C\u771F\u5B9E\u4EF7\u683C\u8BF7\u4EE5\u5B98\u7F51\u4E3A\u51C6</p>`}function ne(){return`<div class="brand-filter-row model-price-toolbar">
      <div class="brand-tab-list">
        <button type="button" data-model-dimension="brand" class="brand-tab${f==="brand"?" is-active":""}"><span>\u6309\u54C1\u724C</span></button>
        <button type="button" data-model-dimension="model" class="brand-tab${f==="model"?" is-active":""}"><span>\u6309\u6A21\u578B</span></button>
      </div>
      <div class="brand-search-box">
        <svg class="brand-search-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="8.5" cy="8.5" r="5.5"/><path d="M13 13l4 4" stroke-linecap="round"/></svg>
        <input type="search" class="brand-search-input" data-model-search placeholder="\u641C\u7D22\u6A21\u578B\uFF0C\u5982 GPT-5\u3001Claude\u2026" autocomplete="off" aria-label="\u641C\u7D22\u6A21\u578B" value="${p(P)}">
      </div>
    </div>`}function F(){e.innerHTML=`
      <div class="model-price-view">
        ${ne()}
        <div class="model-price-content" data-model-price-content></div>
      </div>`,Q(),_()}function _(){let r=e.querySelector("[data-model-price-content]");r&&(r.innerHTML=`${C()}${W()}`,X())}function Q(){e.querySelectorAll("[data-model-dimension]").forEach(s=>{s.addEventListener("click",()=>{let i=s.dataset.modelDimension;if(i===f)return;f=i,d="all",g="all",P="";let b=e.querySelector("[data-model-search]");b&&(b.value=""),e.querySelectorAll("[data-model-dimension]").forEach(S=>{S.classList.toggle("is-active",S.dataset.modelDimension===i)}),_()})});let r=e.querySelector("[data-model-search]");r?.addEventListener("input",()=>{P=r.value.trim(),_()})}function H(){e.querySelectorAll(".plan-column-filter-menu").forEach(r=>{r.hidden=!0}),e.querySelectorAll("[data-model-filter-column]").forEach(r=>r.setAttribute("aria-expanded","false"))}function X(){e.querySelectorAll(".model-price-tabs .brand-tab").forEach(r=>{r.addEventListener("click",()=>{r.dataset.modelTab!=null?g=r.dataset.modelTab:d=r.dataset.provider,_()})}),e.querySelectorAll("[data-model-group-toggle]").forEach(r=>{let s=i=>{if(i?.target?.closest?.("a"))return;let b=r.dataset.modelGroupToggle;w.has(b)?w.delete(b):w.add(b),_()};r.addEventListener("click",s),r.addEventListener("keydown",i=>{(i.key==="Enter"||i.key===" ")&&(i.preventDefault(),s(i))})}),e.querySelectorAll("[data-model-filter-column]").forEach(r=>{r.addEventListener("click",s=>{s.stopPropagation();let i=r.closest(".plan-column-filter")?.querySelector(".plan-column-filter-menu");if(!i)return;let b=!i.hidden;H(),b||(i.hidden=!1,r.setAttribute("aria-expanded","true"))}),r.addEventListener("keydown",s=>{(s.key==="Enter"||s.key===" ")&&(s.preventDefault(),s.stopPropagation(),r.click())})}),e.querySelectorAll("[data-model-filter-menu]").forEach(r=>{r.addEventListener("click",s=>{s.stopPropagation();let i=s.target.closest("[data-model-filter-value]");if(!i)return;let b=i.dataset.modelFilterValue||"";y=b?r.dataset.modelFilterMenu:"",$=b,_()})}),e.querySelectorAll("[data-model-filter-clear]").forEach(r=>{r.addEventListener("click",()=>{y="",$="",_()})}),e.querySelectorAll(".model-price-th[data-sort-key]").forEach(r=>{let s=i=>{if(i?.target?.closest?.(".plan-column-filter-trigger, .plan-column-filter-menu"))return;let b=r.dataset.sortKey;v===b?u=u==="asc"?"desc":"asc":(v=b,u=(K[b]?.numeric,"asc")),_()};r.addEventListener("click",s),r.addEventListener("keydown",i=>{(i.key==="Enter"||i.key===" ")&&(i.preventDefault(),s(i))})})}e._modelFilterDocClose&&(document.removeEventListener("click",e._modelFilterDocClose),document.removeEventListener("keydown",e._modelFilterDocKey)),e._modelFilterDocClose=r=>{e.contains(r.target)||H()},e._modelFilterDocKey=r=>{r.key==="Escape"&&H()},document.addEventListener("click",e._modelFilterDocClose),document.addEventListener("keydown",e._modelFilterDocKey),F()}var Ne="plan-table-sticky-bar",Xe=[".plan-table-wrap",".model-price-table-wrap"];function qe(e){if(!e)return;let t=null,n=null,a=null,o=null,c=null,d=0,v=()=>{let w=document.getElementById("header-root");if(w){let E=w.getBoundingClientRect().bottom;if(Number.isFinite(E)&&E>0)return E}let m=window.getComputedStyle(document.documentElement).getPropertyValue("--header-height"),x=parseFloat(m);return Number.isFinite(x)&&x>0?x:64},u=()=>{t||(t=document.createElement("div"),t.className=Ne,t.setAttribute("aria-hidden","true"),n=document.createElement("div"),n.className=`${Ne}__inner`,a=document.createElement("table"),n.appendChild(a),t.appendChild(n),document.body.appendChild(t))},f=w=>{let m=w.querySelector("thead");if(!m)return!1;let x=w.querySelector("colgroup");if(a.className=w.className,a.innerHTML="",x)a.appendChild(x.cloneNode(!0));else{let E=[...m.querySelectorAll("th")];if(E.length){let O=document.createElement("colgroup");E.forEach(C=>{let T=document.createElement("col"),M=C.getBoundingClientRect().width;M>0&&(T.style.width=`${M}px`),O.appendChild(T)}),a.appendChild(O)}}return a.appendChild(m.cloneNode(!0)),c=m,!0},g=()=>{t&&t.classList.remove("is-docked")},P=()=>{d=0;let w=e.querySelector(".plan-view-table"),m=Xe.map(I=>e.querySelector(I)).find(Boolean),x=m?.querySelector("table");if(m&&(m.classList.toggle("can-scroll",m.scrollWidth>m.clientWidth+1),m.classList.toggle("is-scrolled-end",m.scrollLeft>=m.scrollWidth-m.clientWidth-1)),!m||!x||w&&window.getComputedStyle(w).display==="none"){g();return}o!==m&&(o=m,m.addEventListener("scroll",y,{passive:!0}));let E=v(),O=m.getBoundingClientRect(),C=x.getBoundingClientRect(),T=x.querySelector("thead"),M=T?T.getBoundingClientRect().height:0;if(O.top>E||C.bottom<=E+M){g();return}if(u(),c!==T&&!f(x)){g();return}t.style.top=`${E}px`,t.style.left=`${O.left}px`,t.style.width=`${O.width}px`,n.style.width=`${x.offsetWidth}px`,n.style.transform=`translateX(${-m.scrollLeft}px)`,t.classList.add("is-docked")},y=()=>{d||(d=requestAnimationFrame(P))};new MutationObserver(()=>{c=null,y()}).observe(e,{childList:!0,subtree:!0}),window.addEventListener("scroll",y,{passive:!0}),window.addEventListener("resize",y),y()}var Je=[{id:"all",label:"\u5168\u90E8"},{id:"free",label:"\u514D\u8D39"}],te={plans:{title:"\u56FD\u5185 AI Coding \u5957\u9910\u5BF9\u6BD4\u4E0E\u51B3\u7B56",summary:"\u7ED3\u6784\u5316\u6BD4\u8F83\u4EF7\u683C\u3001\u989D\u5EA6\u3001\u6A21\u578B\u4E0E\u56FD\u5185\u4F7F\u7528\u6761\u4EF6\uFF1B\u8FFD\u8E2A\u4EF7\u683C\u53D8\u5316\uFF0C\u4FDD\u7559\u5B98\u65B9\u6765\u6E90\u548C\u6838\u5BF9\u65E5\u671F\uFF0C\u5E2E\u4F60\u66F4\u5FEB\u5B8C\u6210\u5DE5\u5177\u9009\u578B\u4E0E\u6210\u672C\u51B3\u7B56\u3002\u771F\u5B9E\u4EF7\u683C\u8BF7\u4EE5\u5382\u5546\u5B98\u7F51\u4E3A\u51C6\u3002"},pricing:{title:"\u56FD\u5185 AI \u6A21\u578B\u4EF7\u683C\u5BF9\u6BD4",summary:"\u5BF9\u6BD4\u56FD\u5185\u4E3B\u6D41\u6A21\u578B\u7684\u5B98\u65B9 API \u5355\u4EF7\uFF08\u8F93\u5165/\u8F93\u51FA\uFF0C\xA5/\u767E\u4E07 tokens\uFF09\u4E0E\u4E0A\u4E0B\u6587\u957F\u5EA6\uFF0C\u6570\u636E\u6765\u81EA\u5382\u5546\u5B98\u65B9\u5B9A\u4EF7\u9875\u3002\u771F\u5B9E\u4EF7\u683C\u8BF7\u4EE5\u5382\u5546\u5B98\u7F51\u4E3A\u51C6\u3002"}};function Ze(e){let t=e.raw?.input_price,n=e.raw?.output_price;return t!=null&&t!==""||n!=null&&n!==""}function et(e){let t=e.filter(n=>(n.monthlyCurrency||"CNY")==="CNY").map(n=>n.monthlyPriceValue).filter(n=>Number.isFinite(n)&&n>0);return t.length?t.reduce((n,a)=>n+a,0)/t.length:null}var k={codingPlanOverview:document.getElementById("codingPlanOverview")};function Be(){k.codingPlanOverview&&(k.codingPlanOverview.classList.remove("plans-loading-shell"),k.codingPlanOverview.setAttribute("aria-busy","false"))}function tt(e,t){let n=new Map;for(let a of e){let o=V(a.provider),c=String(a.provider||"").trim(),d=A[c]||c;if(!d)continue;let v=G(c,t,A),u=o?.id||d,f=n.get(u);f?f.iconUrl||(f.iconUrl=N(v.icon_url)||N(a.providerIconUrl)||N(o?.iconUrl)):(f={id:u,provider:c,label:me(c,t,A),iconUrl:N(v.icon_url)||N(a.providerIconUrl)||N(o?.iconUrl),sortOrder:be(c,t,A),plans:[]},n.set(u,f)),f.plans.push(a)}for(let a of n.values())a.plans=re(a.plans);return n}function nt(e,t,n={}){let a=new Map;for(let o of t){let c=e.filter(u=>Array.isArray(u.modelIds)&&u.modelIds.includes(o.id));if(!c.length)continue;let d=G(o.provider,n,A),v=N(o.logoUrl)||N(d.icon_url)||N(o.providerIconUrl)||N(V(o.provider)?.iconUrl);a.set(`model:${o.id}`,{id:`model:${o.id}`,label:o.name||o.id,iconUrl:v,sortOrder:Number.isFinite(o.sortOrder)?o.sortOrder:99,plans:re(c)})}return a}function at(e){let t=ve(e);if(t.state!=="ok")return"";let n=t.hours<24?`\u6570\u636E\u66F4\u65B0\u4E8E ${t.hours} \u5C0F\u65F6\u524D`:t.days<60?`\u6570\u636E\u66F4\u65B0\u4E8E ${t.days} \u5929\u524D`:`\u6570\u636E\u66F4\u65B0\u4E8E ${t.date}`,a=`\u6700\u8FD1\u4E00\u6B21\u5B98\u65B9\u9875\u6838\u9A8C\uFF1A${t.date} \xB7 ${t.verifiedCount}/${t.total} \u4E2A\u5957\u9910\u6709\u6838\u9A8C\u8BB0\u5F55`;return`<span id="dataFreshness" class="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-300" title="${p(a)}">
    <span class="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true"></span>
    ${p(n)}
  </span>`}function rt(){return`
    <div class="cn-hero-banner" role="complementary" aria-label="\u56FD\u5185\u7AD9\u4EF7\u503C\u4E3B\u5F20">
      <div class="cn-hero-banner__points">
        <span class="cn-hero-point"><span aria-hidden="true">\xA5</span>\u4EBA\u6C11\u5E01\u5145\u503C</span>
        <span class="cn-hero-point"><span aria-hidden="true">\u25A1</span>\u53EF\u5F00\u53D1\u7968</span>
        <span class="cn-hero-point"><span aria-hidden="true">\u25C8</span>\u56FD\u5185\u7F51\u7EDC\u76F4\u8FDE</span>
      </div>
      <a class="cn-hero-banner__intl" href="https://www.creditsplan.com/" target="_blank" rel="noopener noreferrer">\u6D77\u5916\u5957\u9910\uFF1F\u524D\u5F80 creditsplan.com \u2192</a>
    </div>
  `}function lt(e){let t=k.codingPlanOverview.querySelector("#plansBackTop");if(!t||!e)return;let n=()=>{let a=e.getBoundingClientRect();t.classList.toggle("is-visible",a.top<-160&&a.bottom>160)};t.addEventListener("click",()=>{let a=window.matchMedia("(prefers-reduced-motion: reduce)").matches;e.scrollIntoView({behavior:a?"auto":"smooth",block:"start"})}),window.addEventListener("scroll",n,{passive:!0}),window.addEventListener("resize",n),n()}function ot(){return`
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
  `}function st(e,t,n,a=()=>"plans",o=()=>[]){let c=e.querySelector("#plansExportTrigger"),d=e.querySelector("#plansExportMenu");if(!c||!d)return;let v=()=>{d.hidden=!0,c.setAttribute("aria-expanded","false")};c.addEventListener("click",()=>{let u=d.hidden;d.hidden=!u,c.setAttribute("aria-expanded",String(u))}),document.addEventListener("click",u=>{e.querySelector("#plansExport")?.contains(u.target)||v()}),document.addEventListener("keydown",u=>{u.key==="Escape"&&v()}),d.addEventListener("click",async u=>{let f=u.target.closest("[data-export-format]");if(!f)return;v();let g=f.dataset.exportFormat,P=await import("./chunk.AAKS76OO.js");if(a()==="pricing"){let $=o();g==="excel"?P.exportModelPricesExcel($):g==="word"?P.exportModelPricesWord($):g==="pdf"&&P.exportModelPricesPdf($);return}let y=t();g==="excel"?P.exportPlansExcel(y,n):g==="word"?P.exportPlansWord(y,n):g==="pdf"&&P.exportPlansPdf(y,n)})}function it(e,t={},n=[],a=[]){if(!k.codingPlanOverview)return;se(oe());let o=fe(e,t,A),c=tt(o,t),d=[...c.values()].sort((l,h)=>l.sortOrder-h.sortOrder),v=nt(o,n,t),u=[...v.values()].sort((l,h)=>l.sortOrder-h.sortOrder||l.label.localeCompare(h.label,"zh-CN")),f={all:o.length,free:le(o).length},g=et(o),P=`
            ${g!=null?`<span class="workbench-stat workbench-stat--primary" title="\u4EBA\u6C11\u5E01\u8BA1\u4EF7\u4E14\u6709\u6708\u4EF7\u7684\u5957\u9910\u5747\u503C">
              <span class="workbench-stat-value">\xA5${Math.round(g)}</span>
              <span class="workbench-stat-label">\u5E73\u5747\u6708\u4ED8</span>
            </span>`:""}
            <span class="workbench-stat"><strong>${o.length}</strong> \u6761\u8BB0\u5F55</span>
            <span class="workbench-stat"><strong>${d.length}</strong> \u4E2A\u54C1\u724C</span>
            <span class="workbench-stat"><strong>${u.length}</strong> \u4E2A\u6A21\u578B</span>`;k.codingPlanOverview.innerHTML=`
    <section class="plans-workbench" aria-labelledby="codingPlanTitle">
      <div class="workbench-head">
        <div class="workbench-intro">
          <p class="workbench-kicker">AI \u5F00\u53D1\u8005\u8BA2\u9605\u51B3\u7B56\u5E73\u53F0</p>
          <h1 id="codingPlanTitle" class="workbench-title">${p(te.plans.title)}</h1>
          <p id="workbenchSummary" class="workbench-summary">${p(te.plans.summary)}</p>
        </div>
        <div class="workbench-meta">
          <span id="workbenchStats">${P}
          </span>
          ${at(o)}
          ${ot()}
        </div>
      </div>
      ${rt()}
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
            ${$e()}
          </div>
          <div id="brandTabs" class="brand-tab-list">
            ${Je.map(l=>`
              <button type="button" data-brand="${l.id}" data-brand-label="${p(l.label)}" class="brand-tab${l.id==="all"?" is-active":""}">
                <span>${p(l.label)}</span>
                ${f[l.id]>0?`<span class="brand-count">${f[l.id]}</span>`:""}
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
              ${f.all>0?`<span class="brand-count">${f.all}</span>`:""}
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
          ${ie(o,"",t)}
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
  `,Be(),Z();let y=k.codingPlanOverview.querySelector(".plans-workbench"),$=k.codingPlanOverview.querySelector("#brandFilterBar"),w=k.codingPlanOverview.querySelector("#brandTabs"),m=k.codingPlanOverview.querySelector("#modelTabs"),x=k.codingPlanOverview.querySelector("#brandDetail");lt(y),qe(x);let E=k.codingPlanOverview.querySelector("#planAdvisorFab"),O=Pe({plans:o,providerInfo:t,modelCatalog:n,fab:E});O&&location.hash==="#advisor"&&O.open();let C=o,T="all",M="brand";st(k.codingPlanOverview,()=>we(C),t,()=>M,()=>a);let I="",U=new Set,W=$.querySelector("[data-plan-available-toggle]"),ne=()=>{if(!W)return;let l=he();W.classList.toggle("is-active",l),W.setAttribute("aria-pressed",String(l))},F=()=>{if(ne(),M==="pricing"){Ae(x,a,t);return}x.innerHTML=ie(C,I,t,U,T!=="all"),Z()},_=null;window.addEventListener("resize",()=>{_||(_=setTimeout(()=>{_=null,se(oe())?F():Z()},200))});let Q=()=>{ye(),I="",U.clear()},H=()=>{U.clear(),F()};xe(x,()=>C,H,l=>{I=I===l?"":l,F()}),Se($,F);let X=l=>{U.has(l)?U.delete(l):U.add(l),F()};x.addEventListener("click",l=>{if(l.target.closest("a"))return;let h=l.target.closest("[data-plan-group-toggle]");h&&X(h.dataset.planGroupToggle)}),x.addEventListener("keydown",l=>{if(l.key!=="Enter"&&l.key!==" ")return;let h=l.target.closest("[data-plan-group-toggle]");!h||h.tagName==="BUTTON"||l.target.closest("a")||(l.preventDefault(),X(h.dataset.planGroupToggle))});let r=()=>{[w,m].forEach(l=>{l.querySelectorAll(".brand-tab").forEach(h=>h.classList.remove("is-active"))})},s=l=>{l==="all"?C=o:l==="free"?C=le(o):c.has(l)?C=c.get(l).plans:v.has(l)&&(C=v.get(l).plans)},i=l=>{let h=l==="pricing"?te.pricing:te.plans,R=k.codingPlanOverview.querySelector("#codingPlanTitle"),L=k.codingPlanOverview.querySelector("#workbenchSummary"),D=k.codingPlanOverview.querySelector("#workbenchStats");if(R&&(R.textContent=h.title),L&&(L.textContent=h.summary),!!D)if(l==="pricing"){let J=a.filter(Ze),Fe=new Set(J.map(ue=>A[ue.vendor]||ue.vendor)).size;D.innerHTML=`<span><strong>${J.length}</strong> \u4E2A\u6A21\u578B</span><span><strong>${Fe}</strong> \u4E2A\u5382\u5546</span>`}else D.innerHTML=P},b=l=>{l!==M&&(M=l,$.querySelectorAll("[data-dimension]").forEach(h=>{h.classList.toggle("is-active",h.dataset.dimension===l)}),w.hidden=l!=="brand",m.hidden=l!=="model",S&&(S.placeholder=l==="brand"?"\u641C\u7D22\u54C1\u724C\u2026":"\u641C\u7D22\u6A21\u578B\u2026"),Q(),T="all",C=o,r(),l==="pricing"?$.hidden=!0:($.hidden=!1,(l==="brand"?w:m).querySelector('[data-brand="all"]')?.classList.add("is-active")),E&&(E.hidden=l==="pricing"),S&&(S.value=""),j(),i(l),ct(l),F())},S=k.codingPlanOverview.querySelector("#brandSearchInput"),j=()=>{let l=(S?.value||"").trim().toLowerCase(),h=M==="brand"?w:m;h.querySelectorAll(".brand-tab[data-brand]").forEach(L=>{let D=L.dataset.brand;if(D==="all"||D==="free"){L.hidden=!1;return}let J=(L.dataset.brandLabel||"").toLowerCase();L.hidden=l?!J.includes(l):!1});let R=h.querySelector(".brand-divider");R&&(R.hidden=!1)};S?.addEventListener("input",j),$.addEventListener("click",l=>{if(l.target.closest("[data-plan-available-toggle]")){ge(),H();return}let R=l.target.closest("[data-dimension]");if(R){b(R.dataset.dimension);return}let L=l.target.closest(".brand-tab");if(!L||!w.contains(L)&&!m.contains(L))return;let D=L.dataset.brand;Q(),T=D,r(),L.classList.add("is-active"),s(D),F()}),((globalThis.location?.pathname||"").replace(/\/+$/,"")||"/")==="/model"&&b("pricing")}function ct(e){if(typeof globalThis.history?.replaceState=="function")try{let t=new URL(globalThis.location.href),n=e==="pricing"?"/model":"/";globalThis.history.replaceState(null,"",`${n}${t.searchParams.toString()?`?${t.searchParams.toString()}`:""}${t.hash}`)}catch{}}function dt(e){if(!k.codingPlanOverview)return;let t=e==="backend"?"\u672C\u5730\u6570\u636E\u5E93\u63A5\u53E3 /api/models \u5F53\u524D\u4E0D\u53EF\u7528\uFF0C\u8BF7\u786E\u8BA4 public-api \u5DF2\u542F\u52A8\u5E76\u8FDE\u63A5\u6570\u636E\u5E93\u3002":"\u90E8\u7F72\u5305\u4E2D\u7684 data.json \u5F53\u524D\u4E0D\u53EF\u7528\uFF0C\u8BF7\u91CD\u65B0\u5BFC\u51FA\u6570\u636E\u5E93\u5FEB\u7167\u5E76\u90E8\u7F72\u3002";k.codingPlanOverview.innerHTML=`
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
  `,Be()}async function ut(){pe();let e=await ke();if(e.dataUnavailable){dt(e.source);return}it(e.plans,e.providerInfo||{},e.modelCatalog||[],e.models||[])}ut();
