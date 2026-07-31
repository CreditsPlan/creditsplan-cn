import{a as me,b as be,c as fe,d as ve,e as H,f as le,h as ge,i as he}from"./chunk.XYBG4LIF.js";import{a as ce}from"./chunk.3QLMZL7V.js";import{a as E,b as U,e as L,f as j,i as de,j as pe,k as ae,p as re,q as ue}from"./chunk.W3L4WO6X.js";import{a as m}from"./chunk.XJPUQ4O3.js";var ye=2,Te=new Set(["claude-opus-4-8","claude-sonnet-4-6","claude-opus-4-7","claude-opus-4-6","claude-sonnet-4-5","claude-opus-4-5","claude-opus-4-1"]);function T(e){if(e==null||e==="")return null;let t=Number(e);return Number.isFinite(t)?t:null}function ee(e,t){let n=T(e);return n==null?"\u5F85\u66F4\u65B0":`${t==="USD"?"$":"\xA5"}${n.toLocaleString("zh-CN",{maximumFractionDigits:4})}`}function $e(e){let t=T(e);return t==null?"\u2014":t>=1e6?`${(t/1e6).toLocaleString("zh-CN",{maximumFractionDigits:1})}M`:t>=1e3?`${(t/1e3).toLocaleString("zh-CN",{maximumFractionDigits:0})}K`:t.toLocaleString("zh-CN")}function M(e){return E[e]||e||"\u672A\u77E5"}var xe={};function Pe(e){let t=j(e,xe,E),n=String(t.seo_slug||"").trim(),l=String(t.seo_intro||"").trim(),o=String(t.icon_url||"").trim();return n&&l&&o?`/brands/${encodeURIComponent(n)}/`:""}function oe(e,t){let n=U(e),l=t||n?.iconUrl||"";return H(l,M(e),"brand-icon brand-icon--tab")}function G(e){let t=String(e.raw?.lifecycle_status||"").trim().toLowerCase();if(t)return t==="legacy";if(String(e.vendor||"").trim().toLowerCase()!=="anthropic")return!1;let n=String(e.raw?.model_id||e.raw?.id||e.id||"").trim().toLowerCase().replace(/[._]/g,"-");return Te.has(n)}function se(e){let t=String(e.raw?.release_date||"").trim();if(!t)return null;let n=Date.parse(t);return Number.isFinite(n)?n:null}var W={release:{numeric:!0,raw:se},name:{label:"\u6A21\u578B",numeric:!1},provider:{label:"\u54C1\u724C",numeric:!1},context:{label:"\u4E0A\u4E0B\u6587",numeric:!0,raw:e=>T(e.raw?.context_length)},input:{label:"\u8F93\u5165\uFF08\u5B98\u65B9\u4EF7\uFF09",numeric:!0,raw:e=>T(e.raw?.input_price)},output:{label:"\u8F93\u51FA\uFF08\u5B98\u65B9\u4EF7\uFF09",numeric:!0,raw:e=>T(e.raw?.output_price)}};function Ce(e,t,n){let l=W[t];if(!l)return e;let o=[...e];return o.sort((c,d)=>{if(t==="release"){let u=Number(G(c))-Number(G(d));if(u!==0)return u}let f=0;if(l.numeric){let u=l.raw(c),b=l.raw(d);if(u==null||b==null)return u==null&&b==null?0:u==null?1:-1;f=u-b}else t==="name"?f=(c.modelName||"").localeCompare(d.modelName||"","zh-CN"):t==="provider"&&(f=M(c.vendor).localeCompare(M(d.vendor),"zh-CN"));return n==="desc"?-f:f}),o}function _e(e){let t=new Map;for(let n of e){let l=M(n.vendor),o=t.get(l);o||(o={name:l,vendor:n.vendor,icon:n.providerIconUrl,models:[]},t.set(l,o)),o.models.push(n)}return[...t.values()]}function Oe(e,t){let n=Number(G(t))-Number(G(e));if(n!==0)return n>0;let l=se(e),o=se(t);return l!=null&&o!=null?l>o:l!=null&&o==null}function Ae(e){let t=new Map;for(let n of e){let l=M(n.vendor),o=t.get(l);(!o||Oe(n,o))&&t.set(l,n)}return[...t.values()]}function Ne(e){let t=null;for(let n of e){let l=T(n.raw?.input_price);l==null||l<0||(!t||l<t.value)&&(t={value:l,currency:n.raw?.currency})}return t}function De(e){let t=Ne(e.models),n=[];if(t){let l=t.currency==="USD"?"$":"\xA5";n.push(`\u8F93\u5165 ${l}${t.value.toLocaleString("zh-CN",{maximumFractionDigits:4})} \u8D77`)}return n.push(`${e.models.length} \u4E2A\u6A21\u578B`),`<span class="plan-table-group-summary">${m(n.join(" \xB7 "))}</span>`}var Se={name:e=>String(e.modelName||"").trim()||"\u2014",provider:e=>M(e.vendor),context:e=>$e(e.raw?.context_length),input:e=>ee(e.raw?.input_price,e.raw?.currency),output:e=>ee(e.raw?.output_price,e.raw?.currency)},we=new Set(["\u2014","\u5F85\u66F4\u65B0"]),qe=new Intl.Collator("zh-CN",{numeric:!0,sensitivity:"base"});function ke(e,t){let n=Se[t];return n?String(n(e)||"").trim()||"\u2014":""}function Fe(e,t){let n=new Map;for(let l of e){let o=ke(l,t);n.set(o,(n.get(o)||0)+1)}return Array.from(n.entries()).map(([l,o])=>({value:l,count:o})).sort((l,o)=>{let c=we.has(l.value),d=we.has(o.value);return c!==d?c?1:-1:qe.compare(l.value,o.value)})}function Be(e,t,n){return e!==t?'<svg class="model-price-sort-icon model-price-sort-icon--idle" viewBox="0 0 12 12" aria-hidden="true"><path d="M6 2l2.5 3h-5zM6 10l-2.5-3h5z" fill="currentColor"/></svg>':`<svg class="model-price-sort-icon" viewBox="0 0 12 12" aria-hidden="true"><path d="${n==="asc"?"M6 2l3 4H3z":"M6 10L3 6h6z"}" fill="currentColor"/></svg>`}function Ie(e,t,n){let l=W[e],o=t.column===e&&!!t.value,c=Fe(n,e);return`<button type="button" class="plan-column-filter-trigger model-price-filter-trigger${o?" is-active":""}" data-model-filter-column="${e}" aria-haspopup="menu" aria-expanded="false" title="\u7B5B\u9009${m(l.label)}">
      <span class="plan-column-filter-caret" aria-hidden="true"></span>
    </button>
    <div class="plan-column-filter-menu" data-model-filter-menu="${e}" role="menu" hidden>
      <button type="button" class="plan-column-filter-option${o?"":" is-active"}" data-model-filter-value="">
        <span class="plan-column-filter-option-label">\u5168\u90E8</span>
        <span class="plan-column-filter-option-count">${n.length}</span>
      </button>
      ${c.map(d=>`
        <button type="button" class="plan-column-filter-option${o&&d.value===t.value?" is-active":""}" data-model-filter-value="${m(d.value)}">
          <span class="plan-column-filter-option-label">${m(d.value)}</span>
          <span class="plan-column-filter-option-count">${d.count}</span>
        </button>
      `).join("")}
    </div>`}function Ue(e,t,n,l){let o=(c,d="")=>{let f=W[c];return`<th class="model-price-th plan-column-filter ${d}" data-sort-key="${c}" role="columnheader" aria-sort="${c===e?t==="asc"?"ascending":"descending":"none"}" tabindex="0">
      <span class="model-price-th-inner">${f.label}${Be(c,e,t)}</span>
      ${Ie(c,n,l)}
    </th>`};return`<thead class="model-price-thead">
    <tr>
      ${o("name")}
      ${o("provider","model-price-col-provider")}
      ${o("context")}
      ${o("input")}
      ${o("output")}
    </tr>
  </thead>`}function He(e){let t=T(e.raw?.input_price),n=T(e.raw?.output_price),l=T(e.raw?.context_length),o=e.raw?.currency,c=ee(t,o),d=ee(n,o),f=$e(l),u=M(e.vendor),b=e.sourceUrl||e.raw?.docs_url||"",g=G(e)?'<span class="model-price-legacy-badge">\u65E7\u7248</span>':"",w=b?`<a class="model-price-name-link" href="${m(b)}" target="_blank" rel="noopener noreferrer nofollow">${m(e.modelName)}</a>`:`<span>${m(e.modelName)}</span>`,x=Pe(e.vendor),h=`${oe(e.vendor,e.providerIconUrl)}<span>${m(u)}</span>`,S=x?`<a href="${m(x)}" class="model-price-provider plan-provider-cell--link">${h}</a>`:`<span class="model-price-provider">${h}</span>`;return`<tr class="model-price-row">
    <td class="model-price-td model-price-td--name">
      <span class="model-price-model-name">${w}${g}</span>
    </td>
    <td class="model-price-td model-price-td--provider model-price-col-provider">
      ${S}
    </td>
    <td class="model-price-td model-price-td--context">${m(f)}</td>
    <td class="model-price-td model-price-td--price">
      <span class="model-price-value${t==null?" model-price-value--empty":""}">${m(c)}</span>
      ${t!=null?'<span class="model-price-unit">/\u767E\u4E07tokens</span>':""}
    </td>
    <td class="model-price-td model-price-td--price">
      <span class="model-price-value${n==null?" model-price-value--empty":""}">${m(d)}</span>
      ${n!=null?'<span class="model-price-unit">/\u767E\u4E07tokens</span>':""}
    </td>
  </tr>`}function Ee(e,t,n={}){xe=n||{};let l=t.filter(a=>T(a.raw?.input_price)!=null||T(a.raw?.output_price)!=null),o=new Map;for(let a of l){let s=M(a.vendor);o.has(s)||o.set(s,{name:s,icon:a.providerIconUrl,vendor:a.vendor})}let c=[...o.values()].sort((a,s)=>a.name.localeCompare(s.name,"zh-CN")),d="all",f="release",u="desc",b="brand",g="all",w="",x="",h="",S=new Set;function _(){return!!(x&&h&&Se[x])}function D(){return b==="model"?g==="all"?l:l.filter(a=>(a.modelName||"")===g):d==="all"?l:l.filter(a=>M(a.vendor)===d)}function R(){let a=D(),s=w.toLowerCase();return s&&(a=a.filter(i=>String(i.modelName||"").toLowerCase().includes(s)||M(i.vendor).toLowerCase().includes(s))),a}function Y(a){let s=a;return _()&&(s=s.filter(i=>ke(i,x)===h)),Ce(s,f,u)}function C(){return b==="model"?V():q()}function V(){let a=Ae(l).sort((p,$)=>(p.modelName||"").localeCompare($.modelName||"","zh-CN")),s=`<button type="button" class="brand-tab${g==="all"?" is-active":""}" data-model-tab="all">
      <span>\u5168\u90E8</span><span class="brand-count">${l.length}</span>
    </button>`,i=a.map(p=>{let $=p.modelName||"";return`<button type="button" class="brand-tab${g===$?" is-active":""}" data-model-tab="${m($)}">
        ${oe(p.vendor,p.providerIconUrl)}
        <span>${m($)}</span>
      </button>`}).join("");return`<div class="brand-tab-list model-price-tabs">${s}<span class="brand-divider"></span>${i}</div>`}function q(){let a=`<button type="button" class="brand-tab${d==="all"?" is-active":""}" data-provider="all">
      <span>\u5168\u90E8</span><span class="brand-count">${l.length}</span>
    </button>`,s=c.map(i=>{let p=l.filter($=>M($.vendor)===i.name).length;return`<button type="button" class="brand-tab${d===i.name?" is-active":""}" data-provider="${m(i.name)}">
        ${oe(i.vendor,i.icon)}
        <span>${m(i.name)}</span>
        <span class="brand-count">${p}</span>
      </button>`}).join("");return`<div class="brand-tab-list model-price-tabs">${a}<span class="brand-divider"></span>${s}</div>`}function B(a,s){let i=!s&&a.models.length>ye,p=s||!i||S.has(a.name),$=p?a.models:a.models.slice(0,ye),X=Pe(a.vendor),J=`${H(a.icon||U(a.vendor)?.iconUrl||"",a.name,"brand-icon brand-icon--section")}
            <span class="text-sm font-bold text-brand-800 dark:text-brand-200">${m(a.name)}</span>`,r=`
            ${X?`<a href="${m(X)}" class="plan-table-group-brand">${J}</a>`:J}
            <span class="rounded-full bg-brand-100 px-1.5 py-0.5 text-xs font-medium text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">${a.models.length}</span>
            <span class="plan-table-group-right">
              ${De(a)}
              ${i?'<svg class="plan-table-group-chevron" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m6 8 4 4 4-4"/></svg>':""}
            </span>`;return`
      <tr class="border-y border-slate-200 dark:border-slate-700">
        <td colspan="5" class="bg-brand-50/70 p-0 dark:bg-brand-950/20">
          ${i?`<div class="plan-table-group-toggle" role="button" tabindex="0" data-model-group-toggle="${m(a.name)}" aria-expanded="${p?"true":"false"}" aria-label="${p?"\u6536\u8D77":"\u5C55\u5F00"}${m(a.name)}\u6A21\u578B">${r}</div>`:`<div class="plan-table-group-toggle plan-table-group-toggle--static">${r}</div>`}
        </td>
      </tr>
      ${$.map(He).join("")}`}function A(a,s){return _()?`<div class="plan-table-filter-summary">
      <span class="plan-table-filter-chip">
        <span>${m(W[x].label)}</span>
        <strong>${m(h)}</strong>
      </span>
      <span class="plan-table-filter-count">${a} / ${s} \u4E2A\u6A21\u578B</span>
      <button type="button" class="plan-table-filter-clear" data-model-filter-clear>\u6E05\u9664</button>
    </div>`:""}function z(){let a=R();if(!a.length)return`<p class="model-price-empty">${w?"\u6682\u65E0\u5339\u914D\u7684\u6A21\u578B":"\u6682\u65E0\u8BE5\u5382\u5546\u7684\u6A21\u578B\u4EF7\u683C\u6570\u636E"}</p>`;let s=Y(a),i=d!=="all"||g!=="all"||_()||!!w,p=s.length?_e(s).map($=>B($,i)).join(""):`<tr>
          <td colspan="5" class="px-3 py-10 text-center text-sm text-slate-500 dark:text-slate-400">\u6682\u65E0\u5339\u914D\u7684\u6A21\u578B</td>
        </tr>`;return`${A(s.length,a.length)}
    <div class="model-price-table-wrap">
      <table class="model-price-table" role="grid" aria-label="\u6A21\u578B\u4EF7\u683C\u5BF9\u6BD4\u8868">
        ${Ue(f,u,{column:x,value:h},a)}
        <tbody class="model-price-tbody">
          ${p}
        </tbody>
      </table>
    </div>
        <p class="model-price-footnote">\u4EF7\u683C\u5355\u4F4D\uFF1A\u8868\u5185\u7B26\u53F7\u6240\u793A\u5E01\u79CD\uFF08\xA5 \u4EBA\u6C11\u5E01 / $ \u7F8E\u5143\uFF0C\u6309\u5382\u5546\u5B98\u65B9\u8BA1\u4EF7\uFF09/ \u767E\u4E07 tokens \xB7 \u6570\u636E\u6765\u6E90\u4E3A\u5404\u5382\u5546\u5B98\u65B9\u5B9A\u4EF7\u9875\uFF0C\u771F\u5B9E\u4EF7\u683C\u8BF7\u4EE5\u5B98\u7F51\u4E3A\u51C6</p>`}function ne(){return`<div class="brand-filter-row model-price-toolbar">
      <div class="brand-tab-list">
        <button type="button" data-model-dimension="brand" class="brand-tab${b==="brand"?" is-active":""}"><span>\u6309\u54C1\u724C</span></button>
        <button type="button" data-model-dimension="model" class="brand-tab${b==="model"?" is-active":""}"><span>\u6309\u6A21\u578B</span></button>
      </div>
      <div class="brand-search-box">
        <svg class="brand-search-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="8.5" cy="8.5" r="5.5"/><path d="M13 13l4 4" stroke-linecap="round"/></svg>
        <input type="search" class="brand-search-input" data-model-search placeholder="\u641C\u7D22\u6A21\u578B\u2026" autocomplete="off" aria-label="\u641C\u7D22\u6A21\u578B" value="${m(w)}">
      </div>
    </div>`}function F(){e.innerHTML=`
      <div class="model-price-view">
        ${ne()}
        <div class="model-price-content" data-model-price-content></div>
      </div>`,K(),k()}function k(){let a=e.querySelector("[data-model-price-content]");a&&(a.innerHTML=`${C()}${z()}`,Q())}function K(){e.querySelectorAll("[data-model-dimension]").forEach(s=>{s.addEventListener("click",()=>{let i=s.dataset.modelDimension;if(i===b)return;b=i,d="all",g="all",w="";let p=e.querySelector("[data-model-search]");p&&(p.value=""),e.querySelectorAll("[data-model-dimension]").forEach($=>{$.classList.toggle("is-active",$.dataset.modelDimension===i)}),k()})});let a=e.querySelector("[data-model-search]");a?.addEventListener("input",()=>{w=a.value.trim(),k()})}function I(){e.querySelectorAll(".plan-column-filter-menu").forEach(a=>{a.hidden=!0}),e.querySelectorAll("[data-model-filter-column]").forEach(a=>a.setAttribute("aria-expanded","false"))}function Q(){e.querySelectorAll(".model-price-tabs .brand-tab").forEach(a=>{a.addEventListener("click",()=>{a.dataset.modelTab!=null?g=a.dataset.modelTab:d=a.dataset.provider,k()})}),e.querySelectorAll("[data-model-group-toggle]").forEach(a=>{let s=i=>{if(i?.target?.closest?.("a"))return;let p=a.dataset.modelGroupToggle;S.has(p)?S.delete(p):S.add(p),k()};a.addEventListener("click",s),a.addEventListener("keydown",i=>{(i.key==="Enter"||i.key===" ")&&(i.preventDefault(),s(i))})}),e.querySelectorAll("[data-model-filter-column]").forEach(a=>{a.addEventListener("click",s=>{s.stopPropagation();let i=a.closest(".plan-column-filter")?.querySelector(".plan-column-filter-menu");if(!i)return;let p=!i.hidden;I(),p||(i.hidden=!1,a.setAttribute("aria-expanded","true"))}),a.addEventListener("keydown",s=>{(s.key==="Enter"||s.key===" ")&&(s.preventDefault(),s.stopPropagation(),a.click())})}),e.querySelectorAll("[data-model-filter-menu]").forEach(a=>{a.addEventListener("click",s=>{s.stopPropagation();let i=s.target.closest("[data-model-filter-value]");if(!i)return;let p=i.dataset.modelFilterValue||"";x=p?a.dataset.modelFilterMenu:"",h=p,k()})}),e.querySelectorAll("[data-model-filter-clear]").forEach(a=>{a.addEventListener("click",()=>{x="",h="",k()})}),e.querySelectorAll(".model-price-th[data-sort-key]").forEach(a=>{let s=i=>{if(i?.target?.closest?.(".plan-column-filter-trigger, .plan-column-filter-menu"))return;let p=a.dataset.sortKey;f===p?u=u==="asc"?"desc":"asc":(f=p,u=(W[p]?.numeric,"asc")),k()};a.addEventListener("click",s),a.addEventListener("keydown",i=>{(i.key==="Enter"||i.key===" ")&&(i.preventDefault(),s(i))})})}e._modelFilterDocClose&&(document.removeEventListener("click",e._modelFilterDocClose),document.removeEventListener("keydown",e._modelFilterDocKey)),e._modelFilterDocClose=a=>{e.contains(a.target)||I()},e._modelFilterDocKey=a=>{a.key==="Escape"&&I()},document.addEventListener("click",e._modelFilterDocClose),document.addEventListener("keydown",e._modelFilterDocKey),F()}var Re=[{id:"all",label:"\u5168\u90E8"},{id:"free",label:"\u514D\u8D39"}],te={plans:{title:"\u56FD\u5185 AI Coding \u5957\u9910\u5BF9\u6BD4\u4E0E\u51B3\u7B56",summary:"\u7ED3\u6784\u5316\u6BD4\u8F83\u4EF7\u683C\u3001\u989D\u5EA6\u3001\u6A21\u578B\u4E0E\u56FD\u5185\u4F7F\u7528\u6761\u4EF6\uFF1B\u8FFD\u8E2A\u4EF7\u683C\u53D8\u5316\uFF0C\u4FDD\u7559\u5B98\u65B9\u6765\u6E90\u548C\u6838\u5BF9\u65E5\u671F\uFF0C\u5E2E\u4F60\u66F4\u5FEB\u5B8C\u6210\u5DE5\u5177\u9009\u578B\u4E0E\u6210\u672C\u51B3\u7B56\u3002\u771F\u5B9E\u4EF7\u683C\u8BF7\u4EE5\u5382\u5546\u5B98\u7F51\u4E3A\u51C6\u3002"},pricing:{title:"\u56FD\u5185 AI \u6A21\u578B\u4EF7\u683C\u5BF9\u6BD4",summary:"\u5BF9\u6BD4\u56FD\u5185\u4E3B\u6D41\u6A21\u578B\u7684\u5B98\u65B9 API \u5355\u4EF7\uFF08\u8F93\u5165/\u8F93\u51FA\uFF0C\xA5/\u767E\u4E07 tokens\uFF09\u4E0E\u4E0A\u4E0B\u6587\u957F\u5EA6\uFF0C\u6570\u636E\u6765\u81EA\u5382\u5546\u5B98\u65B9\u5B9A\u4EF7\u9875\u3002\u771F\u5B9E\u4EF7\u683C\u8BF7\u4EE5\u5382\u5546\u5B98\u7F51\u4E3A\u51C6\u3002"}};function Ve(e){let t=e.raw?.input_price,n=e.raw?.output_price;return t!=null&&t!==""||n!=null&&n!==""}function ze(e){let t=e.filter(n=>(n.monthlyCurrency||"CNY")==="CNY").map(n=>n.monthlyPriceValue).filter(n=>Number.isFinite(n)&&n>0);return t.length?t.reduce((n,l)=>n+l,0)/t.length:null}var y={codingPlanOverview:document.getElementById("codingPlanOverview")};function Le(){y.codingPlanOverview&&(y.codingPlanOverview.classList.remove("plans-loading-shell"),y.codingPlanOverview.setAttribute("aria-busy","false"))}function je(e,t){let n=new Map;for(let l of e){let o=U(l.provider),c=String(l.provider||"").trim(),d=E[c]||c;if(!d)continue;let f=j(c,t,E),u=o?.id||d,b=n.get(u);b?b.iconUrl||(b.iconUrl=L(f.icon_url)||L(l.providerIconUrl)||L(o?.iconUrl)):(b={id:u,provider:c,label:de(c,t,E),iconUrl:L(f.icon_url)||L(l.providerIconUrl)||L(o?.iconUrl),sortOrder:pe(c,t,E),plans:[]},n.set(u,b)),b.plans.push(l)}for(let l of n.values())l.plans=ae(l.plans);return n}function Ge(e,t,n={}){let l=new Map;for(let o of t){let c=e.filter(u=>Array.isArray(u.modelIds)&&u.modelIds.includes(o.id));if(!c.length)continue;let d=j(o.provider,n,E),f=L(o.logoUrl)||L(d.icon_url)||L(o.providerIconUrl)||L(U(o.provider)?.iconUrl);l.set(`model:${o.id}`,{id:`model:${o.id}`,label:o.name||o.id,iconUrl:f,sortOrder:Number.isFinite(o.sortOrder)?o.sortOrder:99,plans:ae(c)})}return l}function We(){return`
    <div class="cn-hero-banner" role="complementary" aria-label="\u56FD\u5185\u7AD9\u4EF7\u503C\u4E3B\u5F20">
      <div class="cn-hero-banner__points">
        <span class="cn-hero-point"><span aria-hidden="true">\xA5</span>\u4EBA\u6C11\u5E01\u5145\u503C</span>
        <span class="cn-hero-point"><span aria-hidden="true">\u25A1</span>\u53EF\u5F00\u53D1\u7968</span>
        <span class="cn-hero-point"><span aria-hidden="true">\u25C8</span>\u56FD\u5185\u7F51\u7EDC\u76F4\u8FDE</span>
      </div>
      <a class="cn-hero-banner__intl" href="https://www.creditsplan.com/" target="_blank" rel="noopener noreferrer">\u6D77\u5916\u5957\u9910\uFF1F\u524D\u5F80 creditsplan.com \u2192</a>
    </div>
  `}function Ye(e){let t=y.codingPlanOverview.querySelector("#plansBackTop");if(!t||!e)return;let n=()=>{let l=e.getBoundingClientRect();t.classList.toggle("is-visible",l.top<-160&&l.bottom>160)};t.addEventListener("click",()=>{let l=window.matchMedia("(prefers-reduced-motion: reduce)").matches;e.scrollIntoView({behavior:l?"auto":"smooth",block:"start"})}),window.addEventListener("scroll",n,{passive:!0}),window.addEventListener("resize",n),n()}function Ke(){return`
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
  `}function Qe(e,t,n,l=()=>"plans",o=()=>[]){let c=e.querySelector("#plansExportTrigger"),d=e.querySelector("#plansExportMenu");if(!c||!d)return;let f=()=>{d.hidden=!0,c.setAttribute("aria-expanded","false")};c.addEventListener("click",()=>{let u=d.hidden;d.hidden=!u,c.setAttribute("aria-expanded",String(u))}),document.addEventListener("click",u=>{e.querySelector("#plansExport")?.contains(u.target)||f()}),document.addEventListener("keydown",u=>{u.key==="Escape"&&f()}),d.addEventListener("click",async u=>{let b=u.target.closest("[data-export-format]");if(!b)return;f();let g=b.dataset.exportFormat,w=await import("./chunk.TUCOYV6Q.js");if(l()==="pricing"){let h=o();g==="excel"?w.exportModelPricesExcel(h):g==="word"?w.exportModelPricesWord(h):g==="pdf"&&w.exportModelPricesPdf(h);return}let x=t();g==="excel"?w.exportPlansExcel(x,n):g==="word"?w.exportPlansWord(x,n):g==="pdf"&&w.exportPlansPdf(x,n)})}function Xe(e,t={},n=[],l=[]){if(!y.codingPlanOverview)return;let o=ue(e,t,E),c=je(o,t),d=[...c.values()].sort((r,v)=>r.sortOrder-v.sortOrder),f=Ge(o,n,t),u=[...f.values()].sort((r,v)=>r.sortOrder-v.sortOrder||r.label.localeCompare(v.label,"zh-CN")),b={all:o.length,free:re(o).length},g=ze(o),w=`
            <span>${o.length} \u6761\u8BB0\u5F55</span>
            <span>${d.length} \u4E2A\u54C1\u724C</span>
            <span>${u.length} \u4E2A\u6A21\u578B</span>
            ${g!=null?`<span>\u5E73\u5747\u6708\u4ED8 \xA5${Math.round(g)}</span>`:""}`;y.codingPlanOverview.innerHTML=`
    <section class="plans-workbench" aria-labelledby="codingPlanTitle">
      <div class="workbench-head">
        <div class="workbench-intro">
          <p class="workbench-kicker">AI \u5F00\u53D1\u8005\u8BA2\u9605\u51B3\u7B56\u5E73\u53F0</p>
          <h1 id="codingPlanTitle" class="workbench-title">${m(te.plans.title)}</h1>
          <p id="workbenchSummary" class="workbench-summary">${m(te.plans.summary)}</p>
        </div>
        <div class="workbench-meta">
          <span id="workbenchStats">${w}
          </span>
          ${Ke()}
        </div>
      </div>
      ${We()}
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
              <input id="brandSearchInput" type="search" class="brand-search-input" placeholder="\u641C\u7D22\u54C1\u724C\u2026" autocomplete="off" aria-label="\u641C\u7D22\u54C1\u724C\u6216\u6A21\u578B">
            </div>
          </div>
          <div id="brandTabs" class="brand-tab-list">
            ${Re.map(r=>`
              <button type="button" data-brand="${r.id}" data-brand-label="${m(r.label)}" class="brand-tab${r.id==="all"?" is-active":""}">
                <span>${m(r.label)}</span>
                ${b[r.id]>0?`<span class="brand-count">${b[r.id]}</span>`:""}
              </button>
            `).join("")}
            <span class="brand-divider"></span>
            ${d.map(r=>`<button type="button" data-brand="${m(r.id)}" data-brand-label="${m(r.label)}" class="brand-tab">
                ${H(r.iconUrl,r.label,"brand-icon brand-icon--tab")}
                <span>${m(r.label)}</span>
                <span class="brand-count">${r.plans.length}</span>
              </button>`).join("")}
          </div>
          <div id="modelTabs" class="brand-tab-list" hidden>
            <button type="button" data-brand="all" data-brand-label="\u5168\u90E8" class="brand-tab is-active">
              <span>\u5168\u90E8</span>
              ${b.all>0?`<span class="brand-count">${b.all}</span>`:""}
            </button>
            <span class="brand-divider"></span>
            ${u.map(r=>`<button type="button" data-brand="${m(r.id)}" data-brand-label="${m(r.label)}" class="brand-tab">
                ${H(r.iconUrl,r.label,"brand-icon brand-icon--tab")}
                <span>${m(r.label)}</span>
                <span class="brand-count">${r.plans.length}</span>
              </button>`).join("")}
          </div>
        </div>
        <div id="brandDetail" class="brand-detail">
          ${le(o,"",t)}
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
  `,Le();let x=y.codingPlanOverview.querySelector(".plans-workbench"),h=y.codingPlanOverview.querySelector("#brandFilterBar"),S=y.codingPlanOverview.querySelector("#brandTabs"),_=y.codingPlanOverview.querySelector("#modelTabs"),D=y.codingPlanOverview.querySelector("#brandDetail");Ye(x);let R=y.codingPlanOverview.querySelector("#planAdvisorFab"),Y=ge({plans:o,providerInfo:t,modelCatalog:n,fab:R});Y&&location.hash==="#advisor"&&Y.open();let C=o,V="all",q="brand";Qe(y.codingPlanOverview,()=>C,t,()=>q,()=>l);let B="",A=new Set,z=h.querySelector("[data-plan-available-toggle]"),ne=()=>{if(!z)return;let r=me();z.classList.toggle("is-active",r),z.setAttribute("aria-pressed",String(r))},F=()=>{if(ne(),q==="pricing"){Ee(D,l,t);return}D.innerHTML=le(C,B,t,A,V!=="all")},k=()=>{fe(),B="",A.clear()},K=()=>{A.clear(),F()};ve(D,()=>C,K,r=>{B=B===r?"":r,F()});let I=r=>{A.has(r)?A.delete(r):A.add(r),F()};D.addEventListener("click",r=>{if(r.target.closest("a"))return;let v=r.target.closest("[data-plan-group-toggle]");v&&I(v.dataset.planGroupToggle)}),D.addEventListener("keydown",r=>{if(r.key!=="Enter"&&r.key!==" ")return;let v=r.target.closest("[data-plan-group-toggle]");!v||v.tagName==="BUTTON"||r.target.closest("a")||(r.preventDefault(),I(v.dataset.planGroupToggle))});let Q=()=>{[S,_].forEach(r=>{r.querySelectorAll(".brand-tab").forEach(v=>v.classList.remove("is-active"))})},a=r=>{r==="all"?C=o:r==="free"?C=re(o):c.has(r)?C=c.get(r).plans:f.has(r)&&(C=f.get(r).plans)},s=r=>{let v=r==="pricing"?te.pricing:te.plans,N=y.codingPlanOverview.querySelector("#codingPlanTitle"),P=y.codingPlanOverview.querySelector("#workbenchSummary"),O=y.codingPlanOverview.querySelector("#workbenchStats");if(N&&(N.textContent=v.title),P&&(P.textContent=v.summary),!!O)if(r==="pricing"){let Z=l.filter(Ve),Me=new Set(Z.map(ie=>E[ie.vendor]||ie.vendor)).size;O.innerHTML=`<span>${Z.length} \u4E2A\u6A21\u578B</span><span>${Me} \u4E2A\u5382\u5546</span>`}else O.innerHTML=w},i=r=>{r!==q&&(q=r,h.querySelectorAll("[data-dimension]").forEach(v=>{v.classList.toggle("is-active",v.dataset.dimension===r)}),S.hidden=r!=="brand",_.hidden=r!=="model",p&&(p.placeholder=r==="brand"?"\u641C\u7D22\u54C1\u724C\u2026":"\u641C\u7D22\u6A21\u578B\u2026"),k(),V="all",C=o,Q(),r==="pricing"?h.hidden=!0:(h.hidden=!1,(r==="brand"?S:_).querySelector('[data-brand="all"]')?.classList.add("is-active")),R&&(R.hidden=r==="pricing"),p&&(p.value=""),$(),s(r),Je(r),F())},p=y.codingPlanOverview.querySelector("#brandSearchInput"),$=()=>{let r=(p?.value||"").trim().toLowerCase(),v=q==="brand"?S:_;v.querySelectorAll(".brand-tab[data-brand]").forEach(P=>{let O=P.dataset.brand;if(O==="all"||O==="free"){P.hidden=!1;return}let Z=(P.dataset.brandLabel||"").toLowerCase();P.hidden=r?!Z.includes(r):!1});let N=v.querySelector(".brand-divider");N&&(N.hidden=!1)};p?.addEventListener("input",$),h.addEventListener("click",r=>{if(r.target.closest("[data-plan-available-toggle]")){be(),K();return}let N=r.target.closest("[data-dimension]");if(N){i(N.dataset.dimension);return}let P=r.target.closest(".brand-tab");if(!P||!S.contains(P)&&!_.contains(P))return;let O=P.dataset.brand;k(),V=O,Q(),P.classList.add("is-active"),a(O),F()});let X=(globalThis.location?.pathname||"").replace(/\/+$/,"")||"/",J=new URLSearchParams(globalThis.location?.search||"").get("view")==="pricing";(X==="/model"||J)&&i("pricing")}function Je(e){if(typeof globalThis.history?.replaceState=="function")try{let t=new URL(globalThis.location.href);t.searchParams.delete("view");let n=e==="pricing"?"/model":"/";globalThis.history.replaceState(null,"",`${n}${t.searchParams.toString()?`?${t.searchParams.toString()}`:""}${t.hash}`)}catch{}}function Ze(e){if(!y.codingPlanOverview)return;let t=e==="backend"?"\u672C\u5730\u6570\u636E\u5E93\u63A5\u53E3 /api/models \u5F53\u524D\u4E0D\u53EF\u7528\uFF0C\u8BF7\u786E\u8BA4 public-api \u5DF2\u542F\u52A8\u5E76\u8FDE\u63A5\u6570\u636E\u5E93\u3002":"\u90E8\u7F72\u5305\u4E2D\u7684 data.json \u5F53\u524D\u4E0D\u53EF\u7528\uFF0C\u8BF7\u91CD\u65B0\u5BFC\u51FA\u6570\u636E\u5E93\u5FEB\u7167\u5E76\u90E8\u7F72\u3002";y.codingPlanOverview.innerHTML=`
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
  `,Le()}async function et(){ce();let e=await he();if(e.dataUnavailable){Ze(e.source);return}Xe(e.plans,e.providerInfo||{},e.modelCatalog||[],e.models||[])}et();
