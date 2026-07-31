import{a as Ke}from"./chunk.4HRX7WDZ.js";import{A as $e,B as xe,C as tt,D as nt,E as De,a as P,b as K,c as Qe,d as We,e as A,f as Q,g as ve,h as re,i as W,j as se,k as le,l as Ce,m as Me,n as ye,o as ge,p as Ee,q as he,r as Je,s as te,t as Ne,u as Ue,v as Xe,w as Ze,x as oe,y as ie,z as et}from"./chunk.W3L4WO6X.js";import{a as o,b as be}from"./chunk.XJPUQ4O3.js";var Dt=new Set(["\u5F85\u66F4\u65B0","\u5F85\u786E\u8BA4","\u8BF7\u4EE5\u5B98\u7F51\u4E3A\u51C6"]);function we(e){let n=String(e??"").trim();return n&&!Dt.has(n)?n:"\u2014"}function ce(e="",n=""){let t=String(n??"").trim();return{column:t?String(e??"").trim():"",value:t}}function Fe(e){return!!(e?.column&&e?.value)}function at(e,n,t){return Fe(n)?e.filter(a=>t(a,n.column)===n.value):e}var rt={};function st(e){rt=e||{}}function Ft(e){let n=ve(e,rt,P);return n.training?re[n.training]||n.training:"\u5F85\u8C03\u7814"}var It={token:"Token \u8BA1\u8D39",credits:"\u79EF\u5206\u5236",five_hours:"\u8BF7\u6C42\u6B21\u6570",weekly:"\u8BF7\u6C42\u6B21\u6570",monthly:"\u8BF7\u6C42\u6B21\u6570",undisclosed:"\u672A\u516C\u5F00"};function Ie(e){return It[e.limitType]||"\u672A\u516C\u5F00"}var Be=[{key:"provider",label:"\u54C1\u724C",value:e=>W(e.provider)||"\u2014"},{key:"name",label:"\u5957\u9910\u540D\u79F0",value:e=>ye(e.name)||"\u2014"},{key:"monthlyPrice",label:"\u8FDE\u7EED\u5305\u6708",value:e=>we(e.monthlyPrice)},{key:"quarterlyPrice",label:"\u8FDE\u7EED\u5305\u5B63",value:e=>we(e.quarterlyPrice)},{key:"annualPrice",label:"\u8FDE\u7EED\u5305\u5E74",value:e=>we(e.annualPrice)},{key:"billingUnit",label:"\u8BA1\u8D39\u5355\u4F4D",value:e=>Ie(e)},{key:"quota",label:"\u989D\u5EA6",value:e=>oe(e)?.text||"\u2014"},{key:"unitPrice",label:"\u7B49\u6548\u5355\u4EF7",value:e=>ie(e)?.text||"\u2014"},{key:"model",label:"\u4EE3\u8868\u6A21\u578B",value:e=>ge(e)||"\u2014"},{key:"status",label:"\u72B6\u6001",value:e=>ye(e.statusLabel)||"\u2014"},{key:"dataTraining",label:"\u6570\u636E\u8BAD\u7EC3",value:e=>Ft(e)},{key:"verifiedAt",label:"\u6838\u5BF9\u65E5\u671F",value:e=>ye(e.lastVerifiedAt)||"\u5F85\u6838\u5BF9"},{key:"source",label:"\u6765\u6E90",value:e=>e.url?"\u5B98\u7F51":"\u2014"}],O=ce(),ne=!1,Bt=new Intl.Collator("zh-CN",{numeric:!0,sensitivity:"base"});function qt(e){return e.status==="available"||e.status==="rush_sale"||e.statusLabel==="\u53EF\u7528"||e.statusLabel==="\u53EF\u8D2D\u4E70"}function _e(){return ne}function lt(){ne=!ne}function qe(e){return Be.find(n=>n.key===e)}function ot(e,n){let t=qe(n);return t?String(t.value(e)||"").trim()||"\u2014":""}function Oe(){O=ce(),ne=!1}function Pe(){return Fe(O)&&!!qe(O.column)}function it(e){let n=e;return ne&&(n=n.filter(qt)),Pe()&&(n=at(n,O,ot)),n}function ct(e,n){return ne?`
    <div class="plan-table-quick-filters">
      <span class="plan-table-filter-count">\u53EA\u770B\u53EF\u8D2D\u4E70\uFF1A${e.length} / ${n.length} \u6761</span>
    </div>
  `:""}function Ot(e,n){let t=new Map;for(let a of e){let r=ot(a,n.key);t.set(r,(t.get(r)||0)+1)}return Array.from(t.entries()).map(([a,r])=>({value:a,count:r})).sort((a,r)=>a.value==="\u2014"&&r.value!=="\u2014"?1:r.value==="\u2014"&&a.value!=="\u2014"?-1:Bt.compare(a.value,r.value))}function dt(e,n){let t=O.column===e.key&&!!O.value,a=Ot(n,e);return`
    <th scope="col" class="plan-column-filter break-words px-3 py-3 text-left font-semibold text-slate-900 dark:text-white">
      <button type="button" class="plan-column-filter-trigger${t?" is-active":""}" data-plan-filter-column="${o(e.key)}" aria-haspopup="menu" aria-expanded="false" title="\u7B5B\u9009${o(e.label)}">
        <span class="plan-column-filter-label">${o(e.label)}</span>
        <span class="plan-column-filter-caret" aria-hidden="true"></span>
      </button>
      <div class="plan-column-filter-menu" data-plan-filter-menu="${o(e.key)}" role="menu" hidden>
        <button type="button" class="plan-column-filter-option${t?"":" is-active"}" data-plan-filter-value="">
          <span class="plan-column-filter-option-label">\u5168\u90E8</span>
          <span class="plan-column-filter-option-count">${n.length}</span>
        </button>
        ${a.map(r=>`
          <button type="button" class="plan-column-filter-option${t&&r.value===O.value?" is-active":""}" data-plan-filter-value="${o(r.value)}">
            <span class="plan-column-filter-option-label">${o(r.value)}</span>
            <span class="plan-column-filter-option-count">${r.count}</span>
          </button>
        `).join("")}
      </div>
    </th>
  `}function ut(e,n){if(!Pe())return"";let t=qe(O.column);return`
    <div class="plan-table-filter-summary">
      <span class="plan-table-filter-chip">
        <span>${o(t.label)}</span>
        <strong>${o(O.value)}</strong>
      </span>
      <span class="plan-table-filter-count">${e.length} / ${n.length} \u6761</span>
      <button type="button" class="plan-table-filter-clear" data-plan-filter-clear>\u6E05\u9664</button>
    </div>
  `}function ke(e){e&&(e.querySelectorAll(".plan-column-filter-menu").forEach(n=>{n.hidden=!0}),e.querySelectorAll("[data-plan-filter-column]").forEach(n=>{n.setAttribute("aria-expanded","false")}))}function pt(e,n,t,a){e.addEventListener("click",r=>{let l=r.target.closest("[data-plan-filter-column]");if(l&&e.contains(l)){let d=l.closest(".plan-column-filter")?.querySelector(".plan-column-filter-menu");if(!d)return;let f=!d.hidden;ke(e),f||(d.hidden=!1,l.setAttribute("aria-expanded","true"));return}let s=r.target.closest("[data-plan-filter-value]");if(s&&e.contains(s)){let d=s.closest("[data-plan-filter-menu]"),f=s.dataset.planFilterValue||"";O=d&&f?ce(d.dataset.planFilterMenu,f):ce(),t();return}let i=r.target.closest("[data-plan-filter-clear]");if(i&&e.contains(i)){Oe(),t();return}let p=r.target.closest("[data-plan-key]");if(p&&e.contains(p)&&!r.target.closest("a")){let d=p.dataset.planKey||"";Me(n(),d)&&a(d);return}r.target.closest(".plan-column-filter")||ke(e)}),e.addEventListener("keydown",r=>{let l=r.target.closest("[data-plan-key]");if(!l||!e.contains(l)||r.target.closest("a")||r.key!=="Enter"&&r.key!==" ")return;r.preventDefault();let s=l.dataset.planKey||"";Me(n(),s)&&a(s)}),document.addEventListener("click",r=>{e.contains(r.target)||ke(e)}),document.addEventListener("keydown",r=>{r.key==="Escape"&&ke(e)})}var Se=2;function Rt(e){let n=Ue(e.lastVerifiedAt);if(n.state==="fresh"){let t=n.days===0?"\u2713 \u4ECA\u65E5\u6838\u5B9E":`\u2713 ${n.days} \u5929\u524D\u6838\u5B9E`;return`<span class="whitespace-nowrap rounded-md bg-emerald-50 px-1.5 py-0.5 text-[10px] font-medium text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-300" title="\u5B98\u65B9\u9875\u6838\u5B9E\u4E8E ${o(n.date)}">${t}</span>`}return n.state==="stale"?`<span class="whitespace-nowrap rounded-md bg-amber-50 px-1.5 py-0.5 text-[10px] font-medium text-amber-600 dark:bg-amber-950/40 dark:text-amber-300" title="\u4E0A\u6B21\u6838\u5B9E ${o(n.date)}\uFF0C\u5DF2\u8D85\u8FC7 30 \u5929">\u5F85\u590D\u6838</span>`:""}function Ht(e,n){let t=Qe(e.provider,n,P),a=We(e,t);return a?`/plans/${encodeURIComponent(a)}/`:""}function Vt(e,n){let t=Q(e,n,P),a=String(t.seo_slug||"").trim(),r=String(t.seo_intro||"").trim(),l=String(t.icon_url||"").trim();return a&&r&&l?`/brands/${encodeURIComponent(a)}/`:""}function zt(e,n={}){let t=Q(e.provider,n,P);return A(t.icon_url)||A(e.providerIconUrl)||A(K(e.provider)?.iconUrl)}function I(e,n,t="brand-icon"){let a=A(e),r=String(n||"?").trim().slice(0,1).toUpperCase()||"?",l=a?"brand-icon-fallback hidden":"brand-icon-fallback";return`<span class="${t}" aria-hidden="true">
    ${a?`<img class="brand-icon-img" src="${o(a)}" alt="" loading="lazy" referrerpolicy="no-referrer">`:""}
    <span class="${l}">${o(r)}</span>
  </span>`}function ft(e,n){let t=new Map;for(let r of e){let l=t.get(r.provider);l||(l={provider:r.provider,label:W(r.provider,n,P),iconUrl:zt(r,n),brandHref:Vt(r.provider,n),plans:[]},t.set(r.provider,l)),l.plans.push(r)}let a=[...t.values()];for(let r of a)r.plans=le(r.plans);return a.sort((r,l)=>se(r.provider,n,P)-se(l.provider,n,P)),a}function jt(e){return e.status==="available"||e.statusLabel==="\u53EF\u7528"||e.statusLabel==="\u53EF\u8D2D\u4E70"}function Gt(e){let n=null;for(let t of e){let a=null;if(Number.isFinite(t.monthlyPriceValue))a=t.monthlyPriceValue;else{let r=String(t.monthlyPrice||"").match(/[\d.]+/),l=r?parseFloat(r[0]):NaN;Number.isFinite(l)&&(a=l)}a==null||a<0||(n==null||a<n)&&(n=a)}return n}function Yt(e){let n=Gt(e.plans),t=e.plans.filter(jt).length,a=[];n!=null&&a.push(n===0?"\u514D\u8D39\u8D77":`\xA5${Je(n)} \u8D77`),t>0&&a.push(`${t} \u4E2A\u53EF\u7528`);let r=a.join(" \xB7 ");return`<span class="plan-table-group-summary">${o(r)}</span>`}function Kt(e,n){let t=ve(e,n,P);return t.training==="no"?`<span class="text-xs font-medium text-emerald-600 dark:text-emerald-400" title="${o(re.no)}">\u4E0D\u8BAD\u7EC3</span>`:t.training==="yes"?`<span class="text-xs font-medium text-amber-600 dark:text-amber-400" title="${o(re.yes)}">\u53EF\u80FD\u8BAD\u7EC3</span>`:t.training==="unclear"?'<span class="text-xs text-slate-500 dark:text-slate-400">\u672A\u660E\u786E</span>':'<span class="text-slate-400">\u2014</span>'}function bt(e){return e.status==="available"||e.statusLabel==="\u53EF\u7528"||e.statusLabel==="\u53EF\u8D2D\u4E70"?"bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300":e.status==="rush_sale"?"bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400":"bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"}function Qt(e,n="",t="",a=!1){let r=bt(e),l=e.includedCalls&&e.includedCalls.length>10&&(e.includedCalls.includes("\xA5")||e.includedCalls.includes("\u5143")||e.includedCalls.includes("\u767E\u4E07")),s=et[e.planType]||e.planType||"",i,p=nt(e);p?i=p:l?i=`<span class="text-sm font-semibold text-slate-700 dark:text-slate-300">${o(e.includedCalls)}</span>`:e.includedCalls||e.planType!=="api-usage"?i='<span class="text-lg font-bold text-slate-500 dark:text-slate-400">\u8BF7\u4EE5\u5B98\u7F51\u4E3A\u51C6</span>':i='<span class="text-lg font-bold text-slate-400 dark:text-slate-500">\u6309\u91CF\u8BA1\u8D39</span>';let d=oe(e),f=ie(e),$=d||f?`<div class="plan-card-quota-row mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
        ${d?`<span title="${o(d.full)}">\u989D\u5EA6\uFF1A${o(d.text)}</span>`:""}
        ${f?`<span class="font-medium text-brand-700 dark:text-brand-300" title="\u6309${o(f.basis)}\u6298\u7B97${f.estimated?"\uFF08\u4F30\u7B97\uFF09":""}">${o(f.text)}</span>`:""}
      </div>`:"";return`
    <div class="plan-card">
      <div class="plan-card-head">
        <div class="plan-card-title-row flex items-start justify-between gap-2">
          <div class="flex min-w-0 flex-1 items-start gap-2">
            ${n}
            <div class="min-w-0 flex-1">
              <p class="plan-card-title">${o(e.name)}</p>
            </div>
          </div>
          <div class="plan-card-meta flex shrink-0 flex-col items-end gap-1.5">
            <span class="whitespace-nowrap rounded-md px-2 py-0.5 text-xs font-medium ${r}">${o(e.statusLabel)}</span>
            ${t}
            ${s?`<span class="whitespace-nowrap rounded-md bg-brand-50 px-1.5 py-0.5 text-[10px] font-medium text-brand-600 dark:bg-brand-950/40 dark:text-brand-300">${o(s)}</span>`:""}
            ${Rt(e)}
          </div>
          <span class="plan-card-disclosure" aria-hidden="true">
            <span>${a?"\u6536\u8D77\u8BE6\u60C5":"\u67E5\u770B\u8BE6\u60C5"}</span>
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="m6 8 4 4 4-4" />
            </svg>
          </span>
        </div>
        <div class="plan-card-price-row mt-3 flex items-baseline gap-1.5">
          ${i}
        </div>
        ${$}
      </div>
    </div>
  `}function Wt(e,n,t,a,r){return e.length?ft(e,t).map(l=>{let s=r||a.has(l.provider),p=(s?l.plans:l.plans.slice(0,Se)).map(h=>{let b=Ce(h),v=b===n,w=h.confidenceScore,k="trust-dot--yellow";w&&w>=.8?k="trust-dot--high":w&&w<.5&&(k="trust-dot--red");let L=[h.domesticPayment?'<span class="plan-card-badge">\u652F\u6301\u56FD\u5185\u652F\u4ED8</span>':"",Ne(h)?`<span class="plan-card-badge plan-card-badge--intl" title="\u56FD\u9645\u7AD9\u5957\u9910\uFF0C\u4EE5\u7F8E\u5143\u7ED3\u7B97\uFF0C\u8BF7\u8DF3\u8F6C creditsplan.com \u67E5\u770B">\u56FD\u9645 \xB7 ${o(String(h.monthlyCurrency||"USD").toUpperCase())}</span>`:""].filter(Boolean).join(""),C=`<span class="trust-dot ${k}" title="\u53EF\u4FE1\u5EA6: ${w!=null?Math.round(w*100)+"%":"\u672A\u77E5"}"></span>`;return`
        <article class="plan-card-mobile${v?" is-selected":""}">
          <div class="plan-card-toggle" role="button" tabindex="0" data-plan-key="${o(b)}" aria-expanded="${v?"true":"false"}">
            ${Qt(h,C,L,v)}
          </div>
          ${v?De(h,t):""}
        </article>`}).join(""),d=Math.max(0,l.plans.length-Se),f=!r&&d>0?`<button type="button" class="plan-group-toggle" data-plan-group-toggle="${o(l.provider)}" aria-expanded="${s?"true":"false"}">${s?"\u6536\u8D77\u591A\u4F59\u5957\u9910":`\u67E5\u770B\u5176\u4F59 ${d} \u4E2A\u5957\u9910`}</button>`:"",$=`${I(l.iconUrl,l.label,"brand-icon brand-icon--section")}
          <h3 class="text-sm font-bold text-brand-800 dark:text-brand-200">${o(l.label)}</h3>`;return`
      <section class="plan-card-group">
        <div class="mb-2 flex items-center gap-2">
          ${l.brandHref?`<a href="${o(l.brandHref)}" class="plan-group-brand-link">${$}</a>`:$}
          <span class="rounded-full bg-brand-100 px-1.5 py-0.5 text-xs font-medium text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">${l.plans.length}</span>
        </div>
        <div class="plan-card-grid">
          ${p}
        </div>
        ${f}
      </section>`}).join(""):""}function mt(e,n,t,a,r=Se){let l=t?e.plans:e.plans.slice(0,r);return l.length?l.map(s=>{let i=Ce(s),p=i===n,d=bt(s),f=tt(s),$=te(s.monthlyPrice)?`<div>${o(s.monthlyPrice)}</div>${f?`<div class="plan-table-price-first">\u9996\u6708 ${o(f)}</div>`:""}`:'<span class="text-slate-400">\u2014</span>',h=te(s.quarterlyPrice)?`<div>${o(s.quarterlyPrice)}</div>${te(s.quarterlyMonthlyPrice)?`<div class="plan-table-price-sub">\u7EA6 ${o(s.quarterlyMonthlyPrice)}</div>`:""}`:'<span class="text-slate-400">\u2014</span>',b=te(s.annualPrice)?`<div>${o(s.annualPrice)}</div>${te(s.annualMonthlyPrice)?`<div class="plan-table-price-sub">\u7EA6 ${o(s.annualMonthlyPrice)}</div>`:""}`:'<span class="text-slate-400">\u2014</span>',v=oe(s),w=v?`<span class="text-slate-700 dark:text-slate-300" title="${o(v.full)}">${o(v.text)}</span>`:'<span class="text-slate-400">\u2014</span>',k=Ie(s),L=k==="\u672A\u516C\u5F00"?'<span class="text-slate-400">\u2014</span>':`<span class="billing-unit-badge billing-unit-badge--${o(s.limitType||"undisclosed")}">${o(k)}</span>`,C=ie(s),N=C?`<span class="whitespace-nowrap font-medium text-brand-700 dark:text-brand-300" title="\u6309${o(C.basis)}\u6298\u7B97${C.estimated?"\uFF08\u4F30\u7B97\uFF09":""}">${o(C.text)}</span>`:'<span class="text-slate-400">\u2014</span>',U=Ue(s.lastVerifiedAt),H=U.state==="fresh"?`<span class="text-xs font-medium text-emerald-600 dark:text-emerald-400" title="\u5B98\u65B9\u9875\u6838\u5B9E\u4E8E ${o(U.date)}">\u2713 ${U.days===0?"\u4ECA\u65E5":`${U.days} \u5929\u524D`}</span>`:U.state==="stale"?`<span class="text-xs font-medium text-amber-600 dark:text-amber-400" title="\u4E0A\u6B21\u6838\u5B9E ${o(U.date)}\uFF0C\u5DF2\u8D85\u8FC7 30 \u5929">\u5F85\u590D\u6838</span>`:'<span class="text-xs text-slate-400">\u5F85\u6838\u5BF9</span>',V=be(s.url),F=xe(s,V),X=V?`<a href="${o(F.href)}" target="_blank" rel="${F.rel}" ${$e(s)} class="text-sm font-medium text-brand-600 hover:text-brand-800 dark:text-brand-400 dark:hover:text-brand-300">\u5B98\u7F51 \u2192</a>`:'<span class="text-slate-400">\u2014</span>',ae=Kt(s,a),z=p?`<tr class="plan-detail-row">
          <td colspan="13" class="plan-inline-detail-cell">
            ${De(s,a)}
          </td>
        </tr>`:"",M=Ht(s,a),Z=o(s.name),G=Ne(s)?` <span class="plan-intl-tag" title="\u56FD\u9645\u7AD9\u5957\u9910\uFF0C\u4EE5\u7F8E\u5143\u7ED3\u7B97\uFF0C\u8BF7\u8DF3\u8F6C creditsplan.com \u67E5\u770B">\u56FD\u9645 \xB7 ${o(String(s.monthlyCurrency||"USD").toUpperCase())}</span>`:"",ee=(M?`<a href="${o(M)}" class="font-medium text-brand-700 hover:text-brand-900 hover:underline dark:text-brand-300 dark:hover:text-brand-200">${Z}</a>`:Z)+G,c=`${I(e.iconUrl,e.label,"brand-icon brand-icon--table")}<span>${o(e.label)}</span>`,y=e.brandHref?`<a href="${o(e.brandHref)}" class="plan-provider-cell plan-provider-cell--link">${c}</a>`:`<div class="plan-provider-cell">${c}</div>`;return`
      <tr class="plan-select-row${p?" is-selected":""}" data-plan-key="${o(i)}" tabindex="0" aria-selected="${p?"true":"false"}">
        <td class="px-3 py-3 font-medium text-slate-900 dark:text-white">${y}</td>
        <td class="break-words px-3 py-3 text-slate-900 dark:text-white">${ee}</td>
        <td class="break-words px-3 py-3 text-slate-900 dark:text-white">${$}</td>
        <td class="break-words px-3 py-3 text-slate-900 dark:text-white">${h}</td>
        <td class="break-words px-3 py-3 text-slate-900 dark:text-white">${b}</td>
        <td class="plan-table-nowrap px-3 py-3">${L}</td>
        <td class="break-words px-3 py-3">${w}</td>
        <td class="plan-table-nowrap px-3 py-3">${N}</td>
        <td class="break-words px-3 py-3 text-slate-600 dark:text-slate-300">${o(ge(s)||"\u2014")}</td>
        <td class="plan-table-nowrap px-3 py-3"><span class="rounded-md px-2 py-0.5 text-xs font-medium ${d}">${o(s.statusLabel)}</span></td>
        <td class="plan-table-nowrap px-3 py-3">${ae}</td>
        <td class="plan-table-nowrap px-3 py-3">${H}</td>
        <td class="plan-table-nowrap px-3 py-3">${X}</td>
      </tr>
      ${z}`}).join(""):""}function Jt(e,n,t,a,r,l){let s=n.length?ft(n,a).map(i=>{if(i.plans.length===1)return mt(i,t,!0,a);let p=!l&&i.plans.length>Se,d=l||!p||r.has(i.provider),f=Yt(i),$=`${I(i.iconUrl,i.label,"brand-icon brand-icon--section")}
              <span class="text-sm font-bold text-brand-800 dark:text-brand-200">${o(i.label)}</span>`,h=`
              ${i.brandHref?`<a href="${o(i.brandHref)}" class="plan-table-group-brand">${$}</a>`:$}
              <span class="rounded-full bg-brand-100 px-1.5 py-0.5 text-xs font-medium text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">${i.plans.length}</span>
              <span class="plan-table-group-right">
                ${f}
                ${p?'<svg class="plan-table-group-chevron" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m6 8 4 4 4-4"/></svg>':""}
              </span>`;return`
        <tr class="border-y border-slate-200 dark:border-slate-700">
          <td colspan="13" class="bg-brand-50/70 p-0 dark:bg-brand-950/20">
            ${p?`<div class="plan-table-group-toggle" role="button" tabindex="0" data-plan-group-toggle="${o(i.provider)}" aria-expanded="${d?"true":"false"}" aria-label="${d?"\u6536\u8D77":"\u5C55\u5F00"}${o(i.label)}\u5957\u9910">${h}</div>`:`<div class="plan-table-group-toggle plan-table-group-toggle--static">${h}</div>`}
          </td>
        </tr>
        ${mt(i,t,d,a)}`}).join(""):`<tr>
        <td colspan="13" class="px-3 py-10 text-center text-sm text-slate-500 dark:text-slate-400">\u6682\u65E0\u5339\u914D\u5957\u9910\u8BB0\u5F55</td>
      </tr>`;return`
    <div class="plan-table-wrap">
      <table class="w-full table-fixed text-sm">
        <caption class="sr-only">\u56FD\u5185 AI Coding \u5957\u9910\u5BF9\u6BD4</caption>
        <colgroup>
          <col style="width: 9%">
          <col style="width: 12%">
          <col style="width: 8%">
          <col style="width: 8%">
          <col style="width: 8%">
          <col style="width: 6%">
          <col style="width: 10%">
          <col style="width: 7%">
          <col style="width: 9%">
          <col style="width: 6%">
          <col style="width: 7%">
          <col style="width: 5%">
          <col style="width: 5%">
        </colgroup>
        <thead>
          <tr>
            ${Be.map(i=>dt(i,e)).join("")}
          </tr>
        </thead>
        <tbody>
          ${s}
        </tbody>
      </table>
    </div>`}function Re(e,n="",t={},a=new Set,r=!1){if(!e.length)return'<p class="text-sm text-slate-500 dark:text-slate-400">\u540E\u53F0\u6682\u65E0\u5957\u9910\u8BB0\u5F55\u3002</p>';let l=he(e,t,P);if(!l.length)return'<p class="text-sm text-slate-500 dark:text-slate-400">\u540E\u53F0\u6682\u65E0\u5957\u9910\u8BB0\u5F55\u3002</p>';st(t);let s=it(l),i=r||Pe()||_e();return`
    <div>
      ${ct(s,l)}
      ${ut(s,l)}
      <div class="plan-view-cards">
        ${Wt(s,n,t,a,i)}
      </div>
      <div class="plan-view-table">
        ${Jt(l,s,n,t,a,i)}
      </div>
    </div>`}var vt=2,Xt=new Set(["claude-opus-4-8","claude-sonnet-4-6","claude-opus-4-7","claude-opus-4-6","claude-sonnet-4-5","claude-opus-4-5","claude-opus-4-1"]);function q(e){if(e==null||e==="")return null;let n=Number(e);return Number.isFinite(n)?n:null}function Le(e,n){let t=q(e);return t==null?"\u5F85\u66F4\u65B0":`${n==="USD"?"$":"\xA5"}${t.toLocaleString("zh-CN",{maximumFractionDigits:4})}`}function gt(e){let n=q(e);return n==null?"\u2014":n>=1e6?`${(n/1e6).toLocaleString("zh-CN",{maximumFractionDigits:1})}M`:n>=1e3?`${(n/1e3).toLocaleString("zh-CN",{maximumFractionDigits:0})}K`:n.toLocaleString("zh-CN")}function B(e){return P[e]||e||"\u672A\u77E5"}var ht={};function $t(e){let n=Q(e,ht,P),t=String(n.seo_slug||"").trim(),a=String(n.seo_intro||"").trim(),r=String(n.icon_url||"").trim();return t&&a&&r?`/brands/${encodeURIComponent(t)}/`:""}function He(e,n){let t=K(e),a=n||t?.iconUrl||"";return I(a,B(e),"brand-icon brand-icon--tab")}function de(e){let n=String(e.raw?.lifecycle_status||"").trim().toLowerCase();if(n)return n==="legacy";if(String(e.vendor||"").trim().toLowerCase()!=="anthropic")return!1;let t=String(e.raw?.model_id||e.raw?.id||e.id||"").trim().toLowerCase().replace(/[._]/g,"-");return Xt.has(t)}function Ve(e){let n=String(e.raw?.release_date||"").trim();if(!n)return null;let t=Date.parse(n);return Number.isFinite(t)?t:null}var ue={release:{numeric:!0,raw:Ve},name:{label:"\u6A21\u578B",numeric:!1},provider:{label:"\u54C1\u724C",numeric:!1},context:{label:"\u4E0A\u4E0B\u6587",numeric:!0,raw:e=>q(e.raw?.context_length)},input:{label:"\u8F93\u5165\uFF08\u5B98\u65B9\u4EF7\uFF09",numeric:!0,raw:e=>q(e.raw?.input_price)},output:{label:"\u8F93\u51FA\uFF08\u5B98\u65B9\u4EF7\uFF09",numeric:!0,raw:e=>q(e.raw?.output_price)}};function Zt(e,n,t){let a=ue[n];if(!a)return e;let r=[...e];return r.sort((l,s)=>{if(n==="release"){let p=Number(de(l))-Number(de(s));if(p!==0)return p}let i=0;if(a.numeric){let p=a.raw(l),d=a.raw(s);if(p==null||d==null)return p==null&&d==null?0:p==null?1:-1;i=p-d}else n==="name"?i=(l.modelName||"").localeCompare(s.modelName||"","zh-CN"):n==="provider"&&(i=B(l.vendor).localeCompare(B(s.vendor),"zh-CN"));return t==="desc"?-i:i}),r}function en(e){let n=new Map;for(let t of e){let a=B(t.vendor),r=n.get(a);r||(r={name:a,vendor:t.vendor,icon:t.providerIconUrl,models:[]},n.set(a,r)),r.models.push(t)}return[...n.values()]}function tn(e,n){let t=Number(de(n))-Number(de(e));if(t!==0)return t>0;let a=Ve(e),r=Ve(n);return a!=null&&r!=null?a>r:a!=null&&r==null}function nn(e){let n=new Map;for(let t of e){let a=B(t.vendor),r=n.get(a);(!r||tn(t,r))&&n.set(a,t)}return[...n.values()]}function an(e){let n=null;for(let t of e){let a=q(t.raw?.input_price);a==null||a<0||(!n||a<n.value)&&(n={value:a,currency:t.raw?.currency})}return n}function rn(e){let n=an(e.models),t=[];if(n){let a=n.currency==="USD"?"$":"\xA5";t.push(`\u8F93\u5165 ${a}${n.value.toLocaleString("zh-CN",{maximumFractionDigits:4})} \u8D77`)}return t.push(`${e.models.length} \u4E2A\u6A21\u578B`),`<span class="plan-table-group-summary">${o(t.join(" \xB7 "))}</span>`}var xt={name:e=>String(e.modelName||"").trim()||"\u2014",provider:e=>B(e.vendor),context:e=>gt(e.raw?.context_length),input:e=>Le(e.raw?.input_price,e.raw?.currency),output:e=>Le(e.raw?.output_price,e.raw?.currency)},yt=new Set(["\u2014","\u5F85\u66F4\u65B0"]),sn=new Intl.Collator("zh-CN",{numeric:!0,sensitivity:"base"});function wt(e,n){let t=xt[n];return t?String(t(e)||"").trim()||"\u2014":""}function ln(e,n){let t=new Map;for(let a of e){let r=wt(a,n);t.set(r,(t.get(r)||0)+1)}return Array.from(t.entries()).map(([a,r])=>({value:a,count:r})).sort((a,r)=>{let l=yt.has(a.value),s=yt.has(r.value);return l!==s?l?1:-1:sn.compare(a.value,r.value)})}function on(e,n,t){return e!==n?'<svg class="model-price-sort-icon model-price-sort-icon--idle" viewBox="0 0 12 12" aria-hidden="true"><path d="M6 2l2.5 3h-5zM6 10l-2.5-3h5z" fill="currentColor"/></svg>':`<svg class="model-price-sort-icon" viewBox="0 0 12 12" aria-hidden="true"><path d="${t==="asc"?"M6 2l3 4H3z":"M6 10L3 6h6z"}" fill="currentColor"/></svg>`}function cn(e,n,t){let a=ue[e],r=n.column===e&&!!n.value,l=ln(t,e);return`<button type="button" class="plan-column-filter-trigger model-price-filter-trigger${r?" is-active":""}" data-model-filter-column="${e}" aria-haspopup="menu" aria-expanded="false" title="\u7B5B\u9009${o(a.label)}">
      <span class="plan-column-filter-caret" aria-hidden="true"></span>
    </button>
    <div class="plan-column-filter-menu" data-model-filter-menu="${e}" role="menu" hidden>
      <button type="button" class="plan-column-filter-option${r?"":" is-active"}" data-model-filter-value="">
        <span class="plan-column-filter-option-label">\u5168\u90E8</span>
        <span class="plan-column-filter-option-count">${t.length}</span>
      </button>
      ${l.map(s=>`
        <button type="button" class="plan-column-filter-option${r&&s.value===n.value?" is-active":""}" data-model-filter-value="${o(s.value)}">
          <span class="plan-column-filter-option-label">${o(s.value)}</span>
          <span class="plan-column-filter-option-count">${s.count}</span>
        </button>
      `).join("")}
    </div>`}function dn(e,n,t,a){let r=(l,s="")=>{let i=ue[l];return`<th class="model-price-th plan-column-filter ${s}" data-sort-key="${l}" role="columnheader" aria-sort="${l===e?n==="asc"?"ascending":"descending":"none"}" tabindex="0">
      <span class="model-price-th-inner">${i.label}${on(l,e,n)}</span>
      ${cn(l,t,a)}
    </th>`};return`<thead class="model-price-thead">
    <tr>
      ${r("name")}
      ${r("provider","model-price-col-provider")}
      ${r("context")}
      ${r("input")}
      ${r("output")}
    </tr>
  </thead>`}function un(e){let n=q(e.raw?.input_price),t=q(e.raw?.output_price),a=q(e.raw?.context_length),r=e.raw?.currency,l=Le(n,r),s=Le(t,r),i=gt(a),p=B(e.vendor),d=e.sourceUrl||e.raw?.docs_url||"",f=de(e)?'<span class="model-price-legacy-badge">\u65E7\u7248</span>':"",$=d?`<a class="model-price-name-link" href="${o(d)}" target="_blank" rel="noopener noreferrer nofollow">${o(e.modelName)}</a>`:`<span>${o(e.modelName)}</span>`,h=$t(e.vendor),b=`${He(e.vendor,e.providerIconUrl)}<span>${o(p)}</span>`,v=h?`<a href="${o(h)}" class="model-price-provider plan-provider-cell--link">${b}</a>`:`<span class="model-price-provider">${b}</span>`;return`<tr class="model-price-row">
    <td class="model-price-td model-price-td--name">
      <span class="model-price-model-name">${$}${f}</span>
    </td>
    <td class="model-price-td model-price-td--provider model-price-col-provider">
      ${v}
    </td>
    <td class="model-price-td model-price-td--context">${o(i)}</td>
    <td class="model-price-td model-price-td--price">
      <span class="model-price-value${n==null?" model-price-value--empty":""}">${o(l)}</span>
      ${n!=null?'<span class="model-price-unit">/\u767E\u4E07tokens</span>':""}
    </td>
    <td class="model-price-td model-price-td--price">
      <span class="model-price-value${t==null?" model-price-value--empty":""}">${o(s)}</span>
      ${t!=null?'<span class="model-price-unit">/\u767E\u4E07tokens</span>':""}
    </td>
  </tr>`}function kt(e,n,t={}){ht=t||{};let a=n.filter(c=>q(c.raw?.input_price)!=null||q(c.raw?.output_price)!=null),r=new Map;for(let c of a){let y=B(c.vendor);r.has(y)||r.set(y,{name:y,icon:c.providerIconUrl,vendor:c.vendor})}let l=[...r.values()].sort((c,y)=>c.name.localeCompare(y.name,"zh-CN")),s="all",i="release",p="desc",d="brand",f="all",$="",h="",b="",v=new Set;function w(){return!!(h&&b&&xt[h])}function k(){return d==="model"?f==="all"?a:a.filter(c=>(c.modelName||"")===f):s==="all"?a:a.filter(c=>B(c.vendor)===s)}function L(){let c=k(),y=$.toLowerCase();return y&&(c=c.filter(g=>String(g.modelName||"").toLowerCase().includes(y)||B(g.vendor).toLowerCase().includes(y))),c}function C(c){let y=c;return w()&&(y=y.filter(g=>wt(g,h)===b)),Zt(y,i,p)}function N(){return d==="model"?U():H()}function U(){let c=nn(a).sort((x,T)=>(x.modelName||"").localeCompare(T.modelName||"","zh-CN")),y=`<button type="button" class="brand-tab${f==="all"?" is-active":""}" data-model-tab="all">
      <span>\u5168\u90E8</span><span class="brand-count">${a.length}</span>
    </button>`,g=c.map(x=>{let T=x.modelName||"";return`<button type="button" class="brand-tab${f===T?" is-active":""}" data-model-tab="${o(T)}">
        ${He(x.vendor,x.providerIconUrl)}
        <span>${o(T)}</span>
      </button>`}).join("");return`<div class="brand-tab-list model-price-tabs">${y}<span class="brand-divider"></span>${g}</div>`}function H(){let c=`<button type="button" class="brand-tab${s==="all"?" is-active":""}" data-provider="all">
      <span>\u5168\u90E8</span><span class="brand-count">${a.length}</span>
    </button>`,y=l.map(g=>{let x=a.filter(T=>B(T.vendor)===g.name).length;return`<button type="button" class="brand-tab${s===g.name?" is-active":""}" data-provider="${o(g.name)}">
        ${He(g.vendor,g.icon)}
        <span>${o(g.name)}</span>
        <span class="brand-count">${x}</span>
      </button>`}).join("");return`<div class="brand-tab-list model-price-tabs">${c}<span class="brand-divider"></span>${y}</div>`}function V(c,y){let g=!y&&c.models.length>vt,x=y||!g||v.has(c.name),T=x?c.models:c.models.slice(0,vt),pe=$t(c.vendor),me=`${I(c.icon||K(c.vendor)?.iconUrl||"",c.name,"brand-icon brand-icon--section")}
            <span class="text-sm font-bold text-brand-800 dark:text-brand-200">${o(c.name)}</span>`,u=`
            ${pe?`<a href="${o(pe)}" class="plan-table-group-brand">${me}</a>`:me}
            <span class="rounded-full bg-brand-100 px-1.5 py-0.5 text-xs font-medium text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">${c.models.length}</span>
            <span class="plan-table-group-right">
              ${rn(c)}
              ${g?'<svg class="plan-table-group-chevron" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m6 8 4 4 4-4"/></svg>':""}
            </span>`;return`
      <tr class="border-y border-slate-200 dark:border-slate-700">
        <td colspan="5" class="bg-brand-50/70 p-0 dark:bg-brand-950/20">
          ${g?`<div class="plan-table-group-toggle" role="button" tabindex="0" data-model-group-toggle="${o(c.name)}" aria-expanded="${x?"true":"false"}" aria-label="${x?"\u6536\u8D77":"\u5C55\u5F00"}${o(c.name)}\u6A21\u578B">${u}</div>`:`<div class="plan-table-group-toggle plan-table-group-toggle--static">${u}</div>`}
        </td>
      </tr>
      ${T.map(un).join("")}`}function F(c,y){return w()?`<div class="plan-table-filter-summary">
      <span class="plan-table-filter-chip">
        <span>${o(ue[h].label)}</span>
        <strong>${o(b)}</strong>
      </span>
      <span class="plan-table-filter-count">${c} / ${y} \u4E2A\u6A21\u578B</span>
      <button type="button" class="plan-table-filter-clear" data-model-filter-clear>\u6E05\u9664</button>
    </div>`:""}function X(){let c=L();if(!c.length)return`<p class="model-price-empty">${$?"\u6682\u65E0\u5339\u914D\u7684\u6A21\u578B":"\u6682\u65E0\u8BE5\u5382\u5546\u7684\u6A21\u578B\u4EF7\u683C\u6570\u636E"}</p>`;let y=C(c),g=s!=="all"||f!=="all"||w()||!!$,x=y.length?en(y).map(T=>V(T,g)).join(""):`<tr>
          <td colspan="5" class="px-3 py-10 text-center text-sm text-slate-500 dark:text-slate-400">\u6682\u65E0\u5339\u914D\u7684\u6A21\u578B</td>
        </tr>`;return`${F(y.length,c.length)}
    <div class="model-price-table-wrap">
      <table class="model-price-table" role="grid" aria-label="\u6A21\u578B\u4EF7\u683C\u5BF9\u6BD4\u8868">
        ${dn(i,p,{column:h,value:b},c)}
        <tbody class="model-price-tbody">
          ${x}
        </tbody>
      </table>
    </div>
        <p class="model-price-footnote">\u4EF7\u683C\u5355\u4F4D\uFF1A\u8868\u5185\u7B26\u53F7\u6240\u793A\u5E01\u79CD\uFF08\xA5 \u4EBA\u6C11\u5E01 / $ \u7F8E\u5143\uFF0C\u6309\u5382\u5546\u5B98\u65B9\u8BA1\u4EF7\uFF09/ \u767E\u4E07 tokens \xB7 \u6570\u636E\u6765\u6E90\u4E3A\u5404\u5382\u5546\u5B98\u65B9\u5B9A\u4EF7\u9875\uFF0C\u771F\u5B9E\u4EF7\u683C\u8BF7\u4EE5\u5B98\u7F51\u4E3A\u51C6</p>`}function ae(){return`<div class="brand-filter-row model-price-toolbar">
      <div class="brand-tab-list">
        <button type="button" data-model-dimension="brand" class="brand-tab${d==="brand"?" is-active":""}"><span>\u6309\u54C1\u724C</span></button>
        <button type="button" data-model-dimension="model" class="brand-tab${d==="model"?" is-active":""}"><span>\u6309\u6A21\u578B</span></button>
      </div>
      <div class="brand-search-box">
        <svg class="brand-search-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="8.5" cy="8.5" r="5.5"/><path d="M13 13l4 4" stroke-linecap="round"/></svg>
        <input type="search" class="brand-search-input" data-model-search placeholder="\u641C\u7D22\u6A21\u578B\u2026" autocomplete="off" aria-label="\u641C\u7D22\u6A21\u578B" value="${o($)}">
      </div>
    </div>`}function z(){e.innerHTML=`
      <div class="model-price-view">
        ${ae()}
        <div class="model-price-content" data-model-price-content></div>
      </div>`,Z(),M()}function M(){let c=e.querySelector("[data-model-price-content]");c&&(c.innerHTML=`${N()}${X()}`,ee())}function Z(){e.querySelectorAll("[data-model-dimension]").forEach(y=>{y.addEventListener("click",()=>{let g=y.dataset.modelDimension;if(g===d)return;d=g,s="all",f="all",$="";let x=e.querySelector("[data-model-search]");x&&(x.value=""),e.querySelectorAll("[data-model-dimension]").forEach(T=>{T.classList.toggle("is-active",T.dataset.modelDimension===g)}),M()})});let c=e.querySelector("[data-model-search]");c?.addEventListener("input",()=>{$=c.value.trim(),M()})}function G(){e.querySelectorAll(".plan-column-filter-menu").forEach(c=>{c.hidden=!0}),e.querySelectorAll("[data-model-filter-column]").forEach(c=>c.setAttribute("aria-expanded","false"))}function ee(){e.querySelectorAll(".model-price-tabs .brand-tab").forEach(c=>{c.addEventListener("click",()=>{c.dataset.modelTab!=null?f=c.dataset.modelTab:s=c.dataset.provider,M()})}),e.querySelectorAll("[data-model-group-toggle]").forEach(c=>{let y=g=>{if(g?.target?.closest?.("a"))return;let x=c.dataset.modelGroupToggle;v.has(x)?v.delete(x):v.add(x),M()};c.addEventListener("click",y),c.addEventListener("keydown",g=>{(g.key==="Enter"||g.key===" ")&&(g.preventDefault(),y(g))})}),e.querySelectorAll("[data-model-filter-column]").forEach(c=>{c.addEventListener("click",y=>{y.stopPropagation();let g=c.closest(".plan-column-filter")?.querySelector(".plan-column-filter-menu");if(!g)return;let x=!g.hidden;G(),x||(g.hidden=!1,c.setAttribute("aria-expanded","true"))}),c.addEventListener("keydown",y=>{(y.key==="Enter"||y.key===" ")&&(y.preventDefault(),y.stopPropagation(),c.click())})}),e.querySelectorAll("[data-model-filter-menu]").forEach(c=>{c.addEventListener("click",y=>{y.stopPropagation();let g=y.target.closest("[data-model-filter-value]");if(!g)return;let x=g.dataset.modelFilterValue||"";h=x?c.dataset.modelFilterMenu:"",b=x,M()})}),e.querySelectorAll("[data-model-filter-clear]").forEach(c=>{c.addEventListener("click",()=>{h="",b="",M()})}),e.querySelectorAll(".model-price-th[data-sort-key]").forEach(c=>{let y=g=>{if(g?.target?.closest?.(".plan-column-filter-trigger, .plan-column-filter-menu"))return;let x=c.dataset.sortKey;i===x?p=p==="asc"?"desc":"asc":(i=x,p=(ue[x]?.numeric,"asc")),M()};c.addEventListener("click",y),c.addEventListener("keydown",g=>{(g.key==="Enter"||g.key===" ")&&(g.preventDefault(),y(g))})})}e._modelFilterDocClose&&(document.removeEventListener("click",e._modelFilterDocClose),document.removeEventListener("keydown",e._modelFilterDocKey)),e._modelFilterDocClose=c=>{e.contains(c.target)||G()},e._modelFilterDocKey=c=>{c.key==="Escape"&&G()},document.addEventListener("click",e._modelFilterDocClose),document.addEventListener("keydown",e._modelFilterDocKey),z()}var Lt=[{id:"light",label:"\u8F7B\u5EA6 ~500 \u6B21/\u6708",value:500},{id:"medium",label:"\u4E2D\u5EA6 ~3,000 \u6B21/\u6708",value:3e3},{id:"heavy",label:"\u91CD\u5EA6 ~10,000 \u6B21/\u6708",value:1e4},{id:"extreme",label:"\u6781\u91CD ~30,000 \u6B21/\u6708",value:3e4}],mn={\u667A\u8C31:"GLM \u7CFB",KIMI:"Kimi \u7CFB",\u963F\u91CC\u4E91\u767E\u70BC:"Qwen \u7CFB",Qoder:"Qwen \u7CFB",\u706B\u5C71\u5F15\u64CE:"\u8C46\u5305\u7CFB",DeepSeek:"DeepSeek",MiniMax:"MiniMax",\u817E\u8BAF\u6DF7\u5143:"\u6DF7\u5143\u7CFB",\u767E\u5EA6\u5343\u5E06:"\u6587\u5FC3\u7CFB",\u9636\u8DC3\u661F\u8FB0:"Step \u7CFB","Xiaomi MiMo":"MiMo \u7CFB"},_t=8;function fn(e){return mn[e.provider]||e.provider||"\u5176\u4ED6"}function bn(e,n){let t=new Map;for(let l of e)l.id&&t.set(l.id,fn(l));let a=new Map;for(let l of n){let s=new Set((l.modelIds||[]).map(i=>t.get(i)).filter(Boolean));for(let i of s)a.set(i,(a.get(i)||0)+1)}return{options:[...a.entries()].map(([l,s])=>({family:l,count:s})).sort((l,s)=>s.count-l.count||l.family.localeCompare(s.family,"zh-CN")),familyByModelId:t}}function vn(e,n){return new Set((e.modelIds||[]).map(t=>n.get(t)).filter(Boolean))}function yn(e,n,t){let{families:a,usage:r,rmbOnly:l,budget:s}=n,i=[],p=0;for(let d of e){if(d.planType==="api_package"){p+=1;continue}if(l&&!d.domesticPayment)continue;let f=Ze(d);if(s!=null&&f&&f.cny>s)continue;let $=!1;if(a.size){let w=vn(d,t);if(!w.size)$=!0;else if(![...w].some(k=>a.has(k)))continue}let h=Xe(d),b=h&&f&&h.value>0?f.cny/h.value*1e3:null,v;$?v=4:h?h.value>=r?v=1:v=2:v=3,i.push({plan:d,price:f,quota:h,costPer1k:b,tier:v})}return i.sort((d,f)=>{if(d.tier!==f.tier)return d.tier-f.tier;if((d.tier===1||d.tier===2)&&d.costPer1k!==f.costPer1k)return(d.costPer1k??1/0)-(f.costPer1k??1/0);let $=d.price?d.price.cny:1/0,h=f.price?f.price.cny:1/0;return $-h}),{results:i,paygoCount:p}}function Pt(e){return Math.round(e).toLocaleString("zh-CN")}function St(e,n="CNY"){return`${n==="USD"?"$":"\xA5"}${e.toLocaleString("zh-CN",{maximumFractionDigits:e<10?2:0})}`}function gn(e,n){let{plan:t,price:a,quota:r,costPer1k:l,tier:s}=e,i=W(t.provider,n,P),p=[];if(s===1?p.push('<span class="plan-advisor-chip plan-advisor-chip--good">\u989D\u5EA6\u5145\u8DB3</span>'):s===2?p.push('<span class="plan-advisor-chip plan-advisor-chip--warn">\u989D\u5EA6\u53EF\u80FD\u4E0D\u8DB3</span>'):s===3?p.push('<span class="plan-advisor-chip plan-advisor-chip--muted">\u989D\u5EA6\u672A\u516C\u5F00</span>'):p.push('<span class="plan-advisor-chip plan-advisor-chip--muted">\u6A21\u578B\u672A\u6807\u6CE8</span>'),r){let b=r.estimated?`\uFF08${o(r.basis)}\uFF0C\u4F30\u7B97\uFF09`:"";p.push(`<span class="plan-advisor-chip">\u6708\u989D\u5EA6 ~${Pt(r.value)} \u6B21${b}</span>`)}if(l!=null&&p.push(`<span class="plan-advisor-chip">\u6BCF\u5343\u6B21 \u2248 ${St(l)}</span>`),t.domesticPayment&&p.push('<span class="plan-advisor-chip">\u4EBA\u6C11\u5E01\u76F4\u4ED8</span>'),t.supportedModelNames?.length){let b=t.supportedModelNames.slice(0,3).join(" / ");p.push(`<span class="plan-advisor-chip">\u652F\u6301 ${o(b)}${t.supportedModelNames.length>3?" \u7B49":""}</span>`)}let d='<span class="plan-advisor-price-muted">\u4EF7\u683C\u8BF7\u4EE5\u5B98\u7F51\u4E3A\u51C6</span>';if(a){let b=a.cycle!=="\u6708\u4ED8"?`<span class="plan-advisor-cycle">${o(a.cycle)}</span>`:"",v=a.currency==="USD"?`<span class="plan-advisor-price-note">\u2248 \xA5${Pt(a.cny)}\uFF08\u6309 \xA5${7.2} \u6298\u7B97\uFF09</span>`:"";d=`<span class="plan-advisor-price">${St(a.value,a.currency)}/\u6708</span>${b}${v}`}let f=be(t.url),$=f?xe(t,f):null,h=$?`<a href="${o($.href)}" target="_blank" rel="${$.rel}" ${$e(t)} class="plan-advisor-link">\u5B98\u7F51 \u2192</a>`:"";return`
    <li class="plan-advisor-result">
      <div class="plan-advisor-result-head">
        ${I(t.providerIconUrl,i,"brand-icon plan-advisor-result-icon")}
        <div class="plan-advisor-result-name">
          <strong>${o(t.name)}</strong>
          <span>${o(i)}</span>
        </div>
        <div class="plan-advisor-result-price">${d}</div>
      </div>
      <div class="plan-advisor-result-chips">${p.join("")}</div>
      ${h}
    </li>
  `}function hn(e){return`
    <div class="plan-advisor-dialog" role="dialog" aria-modal="true" aria-labelledby="planAdvisorTitle" tabindex="-1">
      <div class="plan-advisor-head">
        <h2 id="planAdvisorTitle">\u54EA\u4E2A\u5957\u9910\u6700\u5212\u7B97\uFF1F</h2>
        <button type="button" class="plan-advisor-close" data-advisor-close aria-label="\u5173\u95ED\u8BA1\u7B97\u5668">\u2715</button>
      </div>
      <div class="plan-advisor-body">
        <div class="plan-advisor-form">
          <div class="plan-advisor-field">
            <span class="plan-advisor-label">\u4E3B\u8981\u7528\u54EA\u4E2A\u6A21\u578B\u7CFB\uFF1F<small>\u53EF\u591A\u9009\uFF0C\u4E0D\u9009=\u4E0D\u9650</small></span>
            <div class="plan-advisor-options" data-advisor-families>
              ${e.map(n=>`
                <button type="button" class="plan-advisor-option" data-family="${o(n.family)}" aria-pressed="false">
                  ${o(n.family)}<span class="plan-advisor-option-count">${n.count}</span>
                </button>
              `).join("")}
            </div>
          </div>
          <div class="plan-advisor-field">
            <span class="plan-advisor-label">\u6BCF\u6708\u5927\u7EA6\u8C03\u7528\u591A\u5C11\u6B21\uFF1F</span>
            <div class="plan-advisor-options" data-advisor-usage>
              ${Lt.map(n=>`
                <button type="button" class="plan-advisor-option${n.id==="medium"?" is-active":""}" data-usage="${n.value}" aria-pressed="${n.id==="medium"}">
                  ${o(n.label)}
                </button>
              `).join("")}
              <input type="number" min="1" class="plan-advisor-input" data-advisor-usage-custom placeholder="\u81EA\u5B9A\u4E49\u6B21\u6570" aria-label="\u81EA\u5B9A\u4E49\u6BCF\u6708\u8C03\u7528\u6B21\u6570">
            </div>
          </div>
          <div class="plan-advisor-field plan-advisor-field--row">
            <label class="plan-advisor-switch">
              <input type="checkbox" data-advisor-rmb>
              <span>\u4EC5\u770B\u652F\u6301\u4EBA\u6C11\u5E01\u76F4\u4ED8</span>
            </label>
            <label class="plan-advisor-budget">
              <span>\u9884\u7B97\u4E0A\u9650</span>
              <input type="number" min="0" class="plan-advisor-input" data-advisor-budget placeholder="\xA5/\u6708\uFF0C\u53EF\u4E0D\u586B" aria-label="\u6BCF\u6708\u9884\u7B97\u4E0A\u9650\uFF08\u5143\uFF09">
            </label>
          </div>
        </div>
        <div class="plan-advisor-results" data-advisor-results aria-live="polite"></div>
      </div>
      <p class="plan-advisor-disclaimer">\u989D\u5EA6\u4E0E\u4EF7\u683C\u4E3A\u516C\u5F00\u8D44\u6599\u4F30\u7B97\uFF0C\u4EC5\u4F9B\u6BD4\u8F83\u53C2\u8003\uFF0C\u8BF7\u4EE5\u5382\u5546\u5B98\u7F51\u4E3A\u51C6\u3002</p>
    </div>
  `}function Tt({plans:e,providerInfo:n={},modelCatalog:t=[],fab:a}){if(!a)return null;let{options:r,familyByModelId:l}=bn(t,e),s={families:new Set,usage:Lt[1].value,rmbOnly:!1,budget:null,showAll:!1},i=null,p=null,d=()=>{let b=i.querySelector("[data-advisor-results]"),{results:v,paygoCount:w}=yn(e,s,l);if(!v.length){b.innerHTML=`
        <p class="plan-advisor-empty">\u6CA1\u6709\u7B26\u5408\u6761\u4EF6\u7684\u5957\u9910\uFF0C\u8BD5\u8BD5\u653E\u5BBD\u6A21\u578B\u7CFB\u6216\u9884\u7B97\u9650\u5236\u3002</p>
        ${w?`<p class="plan-advisor-paygo">\u53E6\u6709 ${w} \u4E2A\u6309\u91CF\u8BA1\u8D39\u9009\u9879\u672A\u53C2\u4E0E\u6392\u5E8F\uFF0C\u53EF\u5728\u5957\u9910\u8868\u4E2D\u67E5\u770B\u3002</p>`:""}
      `;return}let k=s.showAll?v:v.slice(0,_t);b.innerHTML=`
      <p class="plan-advisor-summary">\u6309\u6027\u4EF7\u6BD4\u4E3A\u4F60\u6392\u5E8F ${v.length} \u4E2A\u5957\u9910\uFF1A</p>
      <ol class="plan-advisor-list">
        ${k.map(L=>gn(L,n)).join("")}
      </ol>
      ${v.length>_t&&!s.showAll?`<button type="button" class="plan-advisor-more" data-advisor-more>\u5C55\u5F00\u5168\u90E8 ${v.length} \u4E2A\u7ED3\u679C</button>`:""}
      ${w?`<p class="plan-advisor-paygo">\u53E6\u6709 ${w} \u4E2A\u6309\u91CF\u8BA1\u8D39\u9009\u9879\u672A\u53C2\u4E0E\u6392\u5E8F\uFF0C\u53EF\u5728\u5957\u9910\u8868\u4E2D\u67E5\u770B\u3002</p>`:""}
    `},f=()=>{i&&(i.hidden=!0,document.body.style.overflow="",p?.focus?.())},$=()=>{i||(i=document.createElement("div"),i.className="plan-advisor-overlay",i.hidden=!0,i.innerHTML=hn(r),document.body.appendChild(i),i.addEventListener("click",b=>{if(b.target.closest("[data-advisor-close]")){f();return}let v=b.target.closest("[data-family]");if(v){let k=v.dataset.family;s.families.has(k)?s.families.delete(k):s.families.add(k);let L=s.families.has(k);v.classList.toggle("is-active",L),v.setAttribute("aria-pressed",String(L)),s.showAll=!1,d();return}let w=b.target.closest("[data-usage]");if(w){s.usage=Number(w.dataset.usage),i.querySelectorAll("[data-usage]").forEach(L=>{let C=L===w;L.classList.toggle("is-active",C),L.setAttribute("aria-pressed",String(C))});let k=i.querySelector("[data-advisor-usage-custom]");k&&(k.value=""),s.showAll=!1,d();return}b.target.closest("[data-advisor-more]")&&(s.showAll=!0,d())}),i.querySelector("[data-advisor-usage-custom]")?.addEventListener("input",b=>{let v=Number(b.target.value);Number.isFinite(v)&&v>0&&(s.usage=v,i.querySelectorAll("[data-usage]").forEach(w=>{w.classList.remove("is-active"),w.setAttribute("aria-pressed","false")})),s.showAll=!1,d()}),i.querySelector("[data-advisor-rmb]")?.addEventListener("change",b=>{s.rmbOnly=b.target.checked,s.showAll=!1,d()}),i.querySelector("[data-advisor-budget]")?.addEventListener("input",b=>{let v=Number(b.target.value);s.budget=Number.isFinite(v)&&v>0?v:null,s.showAll=!1,d()}),document.addEventListener("keydown",b=>{b.key==="Escape"&&i&&!i.hidden&&f()}))},h=()=>{$(),p=document.activeElement,i.hidden=!1,document.body.style.overflow="hidden",d(),i.querySelector(".plan-advisor-dialog")?.focus()};return a.addEventListener("click",h),{open:h,close:f}}var $n=new Set(["localhost","127.0.0.1","::1"]);function ze(e=globalThis.location?.hostname||""){let n=String(e).trim().toLowerCase().replace(/^\[|\]$/g,"");return $n.has(n)||n.endsWith(".localhost")}function At(e=globalThis.location?.hostname||""){return ze(e)?"/api/models":"/data.json"}async function xn(){let n=ze()?"backend":"static",t=await _n(At());return{...wn(t,n),dataUnavailable:!t}}async function Et(){let e=await xn(),n=e.models.flatMap(r=>Sn(r)),t=e.modelCatalog||[],a=new Map(t.map(r=>[r.id,r.name]));for(let r of n)r.supportedModelNames=(r.modelIds||[]).map(l=>a.get(l)).filter(Boolean);return{...e,plans:n,providerInfo:e.providerInfo||{},modelCatalog:t}}function wn(e,n){if(e&&Array.isArray(e.models)){let t=e.models.map(a=>Pn(a,n));if(t.length)return{source:n,lastUpdated:e.last_updated||En(t.map(a=>a.updatedAt)),models:t,rawModels:e.models,providerInfo:e.provider_info||{},modelCatalog:kn(e.model_catalog)}}return{source:n,lastUpdated:e?.last_updated||"unknown",models:[],rawModels:[],providerInfo:e?.provider_info||{},modelCatalog:[]}}function kn(e){return Array.isArray(e)?e.map(n=>({id:m(n.id),name:m(n.name,n.id||""),provider:m(n.provider,""),providerIconUrl:m(n.provider_icon_url,""),logoUrl:m(n.logo_url,""),sortOrder:R(n.sort_order),marketRegion:m(n.market_region,"")})).filter(n=>n.id):[]}async function _n(e){try{let n=await fetch(e,{headers:{Accept:"application/json"}});return n.ok?await n.json():null}catch{return null}}function Pn(e,n){let t=Array.isArray(e.capabilities)?e.capabilities:[],a=R(e.input_price),r=R(e.context_length),l=Te(e.plan_summary,e.access_notes,e.notes),s=Ln(e,a,r,t);return{id:m(e.id),vendor:m(e.provider,"\u5F85\u66F4\u65B0"),providerIconUrl:m(e.provider_icon_url,e.icon_url||""),modelName:m(e.name,"\u5F85\u66F4\u65B0"),inputPrice:Mt(e.input_price,e.currency),outputPrice:Mt(e.output_price,e.currency),contextLength:Mn(e.context_length),multimodal:t.includes("vision")?"\u652F\u6301":"\u5F85\u786E\u8BA4",apiSupport:"\u652F\u6301",rmbRecharge:m(e.rmb_recharge_support,"\u8BF7\u4EE5\u5B98\u7F51\u4E3A\u51C6"),invoice:m(e.invoice_support,"\u8BF7\u4EE5\u5B98\u7F51\u4E3A\u51C6"),rmbRechargeRaw:e.rmb_recharge_support??null,invoiceRaw:e.invoice_support??null,accessLevel:m(e.access_level,""),marketRegion:m(e.market_region,""),marketRegionLabel:m(e.market_region_label,""),scenarios:s,suitableFor:m(e.suitable_for,l||"\u8BF7\u4EE5\u5B98\u7F51\u4E3A\u51C6"),updatedAt:m(e.last_updated,e.release_date||"\u5F85\u66F4\u65B0"),sourceUrl:m(e.docs_url,e.plan_url||""),packagePlans:Array.isArray(e.package_plans)?e.package_plans:[],source:n,raw:e}}function Sn(e){return(e.packagePlans||[]).filter(t=>t.status!=="discontinued").map(t=>{let a=R(t.monthly_price),r=R(t.quarterly_price),l=R(t.annual_price),s=Cn(t,e);return{id:m(t.id,`${e.id}-plan`),planId:m(t.planId,t.plan_id||""),brand:m(t.brand,t.brand_slug||""),name:m(t.name,"\u5F85\u66F4\u65B0\u5957\u9910"),provider:m(t.provider,e.vendor),providerIconUrl:m(t.provider_icon_url,t.icon_url,e.providerIconUrl),modelName:e.modelName,modelId:m(t.model_id,e.id),modelIds:Array.isArray(t.model_ids)?t.model_ids.map(i=>String(i||"").trim()).filter(Boolean):[],status:m(t.status,"unknown"),statusLabel:m(t.status_label,"\u5F85\u786E\u8BA4"),url:m(t.url,""),monthlyPrice:je(t.monthly_price,s),monthlyPriceValue:a,monthlyCurrency:s,monthlyCurrencyLabel:s==="USD"?"\u7F8E\u5143":"\u4EBA\u6C11\u5E01",quarterlyPrice:Ge(t.quarterly_price,s,"\u5B63"),quarterlyPriceValue:r,quarterlyMonthlyPrice:r!=null?je(r/3,s):"",quarterlyMonthlyPriceValue:r!=null?r/3:null,annualPrice:Ge(t.annual_price,s,"\u5E74"),annualPriceValue:l,annualMonthlyPrice:l!=null?je(l/12,s):"",annualMonthlyPriceValue:l!=null?l/12:null,includedCalls:m(t.included_calls,""),notes:m(t.notes,""),planType:m(t.plan_type,Ct(t,e)),category:Ct(t,e),rmbRecharge:e.rmbRecharge,invoice:e.invoice,rmbRechargeRaw:e.rmbRechargeRaw,invoiceRaw:e.invoiceRaw,accessLevel:e.accessLevel,marketRegion:e.marketRegion,marketRegionLabel:e.marketRegionLabel,firstMonthPrice:t.first_month_price!=null?t.first_month_price:null,fiveHoursRequests:m(t.five_hours_requests,""),weeklyRequests:m(t.weekly_requests,""),monthlyRequests:m(t.monthly_requests,""),measuredFiveHoursTokens:m(t.measured_five_hours_tokens,""),measuredWeeklyTokens:m(t.measured_weekly_tokens,""),measuredMonthlyTokens:m(t.measured_monthly_tokens,""),tokenLimit:m(t.token_limit,""),supportedModels:m(t.supported_models,""),benefits:m(t.benefits,""),rating:m(t.rating,""),tags:m(t.tags,""),sourceUrl:m(t.source_url,""),lastVerifiedAt:m(t.last_verified_at,""),refundPolicy:m(t.refund_policy,""),billingCycle:m(t.billing_cycle,""),creditsLimit:m(t.credits_limit,""),concurrencyLimit:m(t.concurrency_limit,""),resetRule:m(t.reset_rule,""),limitType:m(t.limit_type,Tn(t)),dataStatus:m(t.data_status,An(t)),confidenceScore:t.confidence_score!=null?t.confidence_score:null,sourceType:m(t.source_type,""),toolCompatibility:J(t.tool_compatibility_json,{}),modelMultiplier:J(t.model_multiplier_json,{}),derivedMetrics:J(t.derived_metrics_json,{}),measuredMetrics:J(t.measured_metrics_json,{}),risk:J(t.risk_json,{}),recommendation:J(t.recommendation_json,{}),changeSummary:J(t.change_summary_json,{}),linkType:m(t.link_type,"official"),hasAffiliate:t.has_affiliate===!0,domesticPayment:t.domestic_payment===!0||t.domestic_payment===1,hasFirstMonthDiscount:t.has_first_month_discount===!0||t.has_first_month_discount===1,recommendationText:m(t.recommendation_text,""),riskText:m(t.risk_text,""),sortOrder:R(t.sort_order),privacyOverride:J(t.privacy_override_json,{}),raw:t}})}function Ln(e,n,t,a){let r=Te(e.name,e.provider,e.notes,e.plan_summary,e.access_notes).toLowerCase(),l=new Set(["enterprise-api"]);return n!=null&&n<=2&&l.add("low-cost"),t!=null&&t>=2e5&&l.add("long-context"),a.includes("vision")&&l.add("multimodal"),/个人|会员|订阅|聊天|kimi|豆包/.test(r)&&l.add("personal-use"),Array.from(l)}function J(e,n){if(!e||typeof e!="string")return e||n;try{return JSON.parse(e)}catch{return n}}function Tn(e){return e.five_hours_requests?"five_hours":e.weekly_requests?"weekly":e.monthly_requests?"monthly":e.token_limit?"token":e.credits_limit?"credits":"undisclosed"}function An(e){return e.last_verified_at?"verified":e.measured_monthly_tokens||e.measured_weekly_tokens?"measured":"pending"}function Ct(e,n){let t=Te(e.name,e.provider,e.notes,n.vendor,n.modelName).toLowerCase();return/聚合|路由|硅基|siliconflow/.test(t)?"aggregated_router":/会员|订阅|chat|清言|kimi|豆包/.test(t)?"personal_subscription":/maas|百炼|千帆|腾讯云|火山方舟|企业/.test(t)?"enterprise_maas":/开源|部署|私有化/.test(t)?"open_source_deploy":(/coding|qoder|claude code|cursor|trae/.test(t),"coding_plan")}function Cn(e,n){let t=m(e.monthly_currency).toUpperCase();if(t==="USD"||t==="CNY")return t;let a=m(e.provider,n.vendor),r=a.toLowerCase();if(r==="qoder"||r==="qoder cn"||r==="byteplus"||r==="z.ai")return"USD";let l=Te(e.name,a,e.url,e.included_calls,e.notes).toLowerCase();return/\$|usd|美元|trae\.ai/.test(l)?"USD":"CNY"}function m(...e){let n=e.find(t=>t!=null&&String(t).trim());return n==null?"":String(n).trim()}function R(e){if(e==null||e==="")return null;let n=Number(e);return Number.isFinite(n)?n:null}function Mt(e,n){let t=R(e);return t==null?m(e,"\u5F85\u66F4\u65B0"):`${n==="USD"?"$":"\xA5"}${t.toLocaleString("zh-CN",{maximumFractionDigits:4})}/\u767E\u4E07 tokens`}function je(e,n="CNY"){return Ge(e,n,"\u6708")}function Ge(e,n="CNY",t="\u6708"){let a=R(e);return a==null?"\u8BF7\u4EE5\u5B98\u7F51\u4E3A\u51C6":`${n==="USD"?"$":"\xA5"}${a.toLocaleString("zh-CN",{maximumFractionDigits:2})}/${t}`}function Mn(e){let n=R(e);return n==null?m(e,"\u8BF7\u4EE5\u5B98\u7F51\u4E3A\u51C6"):n>=1e6?`${(n/1e6).toLocaleString("zh-CN",{maximumFractionDigits:1})}M tokens`:n>=1e3?`${(n/1e3).toLocaleString("zh-CN",{maximumFractionDigits:0})}K tokens`:`${n.toLocaleString("zh-CN")} tokens`}function Te(...e){return e.filter(n=>n!=null&&String(n).trim()).join(" ")}function En(e){return e.find(n=>n&&n!=="\u5F85\u66F4\u65B0")||"\u5F85\u66F4\u65B0"}var Nn=[{id:"all",label:"\u5168\u90E8"},{id:"free",label:"\u514D\u8D39"}],Ae={plans:{title:"\u56FD\u5185 AI Coding \u5957\u9910\u5BF9\u6BD4\u4E0E\u51B3\u7B56",summary:"\u7ED3\u6784\u5316\u6BD4\u8F83\u4EF7\u683C\u3001\u989D\u5EA6\u3001\u6A21\u578B\u4E0E\u56FD\u5185\u4F7F\u7528\u6761\u4EF6\uFF1B\u8FFD\u8E2A\u4EF7\u683C\u53D8\u5316\uFF0C\u4FDD\u7559\u5B98\u65B9\u6765\u6E90\u548C\u6838\u5BF9\u65E5\u671F\uFF0C\u5E2E\u4F60\u66F4\u5FEB\u5B8C\u6210\u5DE5\u5177\u9009\u578B\u4E0E\u6210\u672C\u51B3\u7B56\u3002\u771F\u5B9E\u4EF7\u683C\u8BF7\u4EE5\u5382\u5546\u5B98\u7F51\u4E3A\u51C6\u3002"},pricing:{title:"\u56FD\u5185 AI \u6A21\u578B\u4EF7\u683C\u5BF9\u6BD4",summary:"\u5BF9\u6BD4\u56FD\u5185\u4E3B\u6D41\u6A21\u578B\u7684\u5B98\u65B9 API \u5355\u4EF7\uFF08\u8F93\u5165/\u8F93\u51FA\uFF0C\xA5/\u767E\u4E07 tokens\uFF09\u4E0E\u4E0A\u4E0B\u6587\u957F\u5EA6\uFF0C\u6570\u636E\u6765\u81EA\u5382\u5546\u5B98\u65B9\u5B9A\u4EF7\u9875\u3002\u771F\u5B9E\u4EF7\u683C\u8BF7\u4EE5\u5382\u5546\u5B98\u7F51\u4E3A\u51C6\u3002"}};function Un(e){let n=e.raw?.input_price,t=e.raw?.output_price;return n!=null&&n!==""||t!=null&&t!==""}function Dn(e){let n=e.filter(t=>(t.monthlyCurrency||"CNY")==="CNY").map(t=>t.monthlyPriceValue).filter(t=>Number.isFinite(t)&&t>0);return n.length?n.reduce((t,a)=>t+a,0)/n.length:null}var S={codingPlanOverview:document.getElementById("codingPlanOverview")};function Nt(){S.codingPlanOverview&&(S.codingPlanOverview.classList.remove("plans-loading-shell"),S.codingPlanOverview.setAttribute("aria-busy","false"))}function Fn(e,n){let t=new Map;for(let a of e){let r=K(a.provider),l=String(a.provider||"").trim(),s=P[l]||l;if(!s)continue;let i=Q(l,n,P),p=r?.id||s,d=t.get(p);d?d.iconUrl||(d.iconUrl=A(i.icon_url)||A(a.providerIconUrl)||A(r?.iconUrl)):(d={id:p,provider:l,label:W(l,n,P),iconUrl:A(i.icon_url)||A(a.providerIconUrl)||A(r?.iconUrl),sortOrder:se(l,n,P),plans:[]},t.set(p,d)),d.plans.push(a)}for(let a of t.values())a.plans=le(a.plans);return t}function In(e,n,t={}){let a=new Map;for(let r of n){let l=e.filter(p=>Array.isArray(p.modelIds)&&p.modelIds.includes(r.id));if(!l.length)continue;let s=Q(r.provider,t,P),i=A(r.logoUrl)||A(s.icon_url)||A(r.providerIconUrl)||A(K(r.provider)?.iconUrl);a.set(`model:${r.id}`,{id:`model:${r.id}`,label:r.name||r.id,iconUrl:i,sortOrder:Number.isFinite(r.sortOrder)?r.sortOrder:99,plans:le(l)})}return a}function Bn(){return`
    <div class="cn-hero-banner" role="complementary" aria-label="\u56FD\u5185\u7AD9\u4EF7\u503C\u4E3B\u5F20">
      <div class="cn-hero-banner__points">
        <span class="cn-hero-point"><span aria-hidden="true">\xA5</span>\u4EBA\u6C11\u5E01\u5145\u503C</span>
        <span class="cn-hero-point"><span aria-hidden="true">\u25A1</span>\u53EF\u5F00\u53D1\u7968</span>
        <span class="cn-hero-point"><span aria-hidden="true">\u25C8</span>\u56FD\u5185\u7F51\u7EDC\u76F4\u8FDE</span>
      </div>
      <a class="cn-hero-banner__intl" href="https://www.creditsplan.com/" target="_blank" rel="noopener noreferrer">\u6D77\u5916\u5957\u9910\uFF1F\u524D\u5F80 creditsplan.com \u2192</a>
    </div>
  `}function qn(e){let n=S.codingPlanOverview.querySelector("#plansBackTop");if(!n||!e)return;let t=()=>{let a=e.getBoundingClientRect();n.classList.toggle("is-visible",a.top<-160&&a.bottom>160)};n.addEventListener("click",()=>{let a=window.matchMedia("(prefers-reduced-motion: reduce)").matches;e.scrollIntoView({behavior:a?"auto":"smooth",block:"start"})}),window.addEventListener("scroll",t,{passive:!0}),window.addEventListener("resize",t),t()}function On(){return`
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
  `}function Rn(e,n,t,a=()=>"plans",r=()=>[]){let l=e.querySelector("#plansExportTrigger"),s=e.querySelector("#plansExportMenu");if(!l||!s)return;let i=()=>{s.hidden=!0,l.setAttribute("aria-expanded","false")};l.addEventListener("click",()=>{let p=s.hidden;s.hidden=!p,l.setAttribute("aria-expanded",String(p))}),document.addEventListener("click",p=>{e.querySelector("#plansExport")?.contains(p.target)||i()}),document.addEventListener("keydown",p=>{p.key==="Escape"&&i()}),s.addEventListener("click",async p=>{let d=p.target.closest("[data-export-format]");if(!d)return;i();let f=d.dataset.exportFormat,$=await import("./chunk.TUCOYV6Q.js");if(a()==="pricing"){let b=r();f==="excel"?$.exportModelPricesExcel(b):f==="word"?$.exportModelPricesWord(b):f==="pdf"&&$.exportModelPricesPdf(b);return}let h=n();f==="excel"?$.exportPlansExcel(h,t):f==="word"?$.exportPlansWord(h,t):f==="pdf"&&$.exportPlansPdf(h,t)})}function Hn(e,n={},t=[],a=[]){if(!S.codingPlanOverview)return;let r=he(e,n,P),l=Fn(r,n),s=[...l.values()].sort((u,_)=>u.sortOrder-_.sortOrder),i=In(r,t,n),p=[...i.values()].sort((u,_)=>u.sortOrder-_.sortOrder||u.label.localeCompare(_.label,"zh-CN")),d={all:r.length,free:Ee(r).length},f=Dn(r),$=`
            <span>${r.length} \u6761\u8BB0\u5F55</span>
            <span>${s.length} \u4E2A\u54C1\u724C</span>
            <span>${p.length} \u4E2A\u6A21\u578B</span>
            ${f!=null?`<span>\u5E73\u5747\u6708\u4ED8 \xA5${Math.round(f)}</span>`:""}`;S.codingPlanOverview.innerHTML=`
    <section class="plans-workbench" aria-labelledby="codingPlanTitle">
      <div class="workbench-head">
        <div class="workbench-intro">
          <p class="workbench-kicker">AI \u5F00\u53D1\u8005\u8BA2\u9605\u51B3\u7B56\u5E73\u53F0</p>
          <h1 id="codingPlanTitle" class="workbench-title">${o(Ae.plans.title)}</h1>
          <p id="workbenchSummary" class="workbench-summary">${o(Ae.plans.summary)}</p>
        </div>
        <div class="workbench-meta">
          <span id="workbenchStats">${$}
          </span>
          ${On()}
        </div>
      </div>
      ${Bn()}
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
            ${Nn.map(u=>`
              <button type="button" data-brand="${u.id}" data-brand-label="${o(u.label)}" class="brand-tab${u.id==="all"?" is-active":""}">
                <span>${o(u.label)}</span>
                ${d[u.id]>0?`<span class="brand-count">${d[u.id]}</span>`:""}
              </button>
            `).join("")}
            <span class="brand-divider"></span>
            ${s.map(u=>`<button type="button" data-brand="${o(u.id)}" data-brand-label="${o(u.label)}" class="brand-tab">
                ${I(u.iconUrl,u.label,"brand-icon brand-icon--tab")}
                <span>${o(u.label)}</span>
                <span class="brand-count">${u.plans.length}</span>
              </button>`).join("")}
          </div>
          <div id="modelTabs" class="brand-tab-list" hidden>
            <button type="button" data-brand="all" data-brand-label="\u5168\u90E8" class="brand-tab is-active">
              <span>\u5168\u90E8</span>
              ${d.all>0?`<span class="brand-count">${d.all}</span>`:""}
            </button>
            <span class="brand-divider"></span>
            ${p.map(u=>`<button type="button" data-brand="${o(u.id)}" data-brand-label="${o(u.label)}" class="brand-tab">
                ${I(u.iconUrl,u.label,"brand-icon brand-icon--tab")}
                <span>${o(u.label)}</span>
                <span class="brand-count">${u.plans.length}</span>
              </button>`).join("")}
          </div>
        </div>
        <div id="brandDetail" class="brand-detail">
          ${Re(r,"",n)}
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
  `,Nt();let h=S.codingPlanOverview.querySelector(".plans-workbench"),b=S.codingPlanOverview.querySelector("#brandFilterBar"),v=S.codingPlanOverview.querySelector("#brandTabs"),w=S.codingPlanOverview.querySelector("#modelTabs"),k=S.codingPlanOverview.querySelector("#brandDetail");qn(h);let L=S.codingPlanOverview.querySelector("#planAdvisorFab"),C=Tt({plans:r,providerInfo:n,modelCatalog:t,fab:L});C&&location.hash==="#advisor"&&C.open();let N=r,U="all",H="brand";Rn(S.codingPlanOverview,()=>N,n,()=>H,()=>a);let V="",F=new Set,X=b.querySelector("[data-plan-available-toggle]"),ae=()=>{if(!X)return;let u=_e();X.classList.toggle("is-active",u),X.setAttribute("aria-pressed",String(u))},z=()=>{if(ae(),H==="pricing"){kt(k,a,n);return}k.innerHTML=Re(N,V,n,F,U!=="all")},M=()=>{Oe(),V="",F.clear()},Z=()=>{F.clear(),z()};pt(k,()=>N,Z,u=>{V=V===u?"":u,z()});let G=u=>{F.has(u)?F.delete(u):F.add(u),z()};k.addEventListener("click",u=>{if(u.target.closest("a"))return;let _=u.target.closest("[data-plan-group-toggle]");_&&G(_.dataset.planGroupToggle)}),k.addEventListener("keydown",u=>{if(u.key!=="Enter"&&u.key!==" ")return;let _=u.target.closest("[data-plan-group-toggle]");!_||_.tagName==="BUTTON"||u.target.closest("a")||(u.preventDefault(),G(_.dataset.planGroupToggle))});let ee=()=>{[v,w].forEach(u=>{u.querySelectorAll(".brand-tab").forEach(_=>_.classList.remove("is-active"))})},c=u=>{u==="all"?N=r:u==="free"?N=Ee(r):l.has(u)?N=l.get(u).plans:i.has(u)&&(N=i.get(u).plans)},y=u=>{let _=u==="pricing"?Ae.pricing:Ae.plans,Y=S.codingPlanOverview.querySelector("#codingPlanTitle"),E=S.codingPlanOverview.querySelector("#workbenchSummary"),j=S.codingPlanOverview.querySelector("#workbenchStats");if(Y&&(Y.textContent=_.title),E&&(E.textContent=_.summary),!!j)if(u==="pricing"){let fe=a.filter(Un),Ut=new Set(fe.map(Ye=>P[Ye.vendor]||Ye.vendor)).size;j.innerHTML=`<span>${fe.length} \u4E2A\u6A21\u578B</span><span>${Ut} \u4E2A\u5382\u5546</span>`}else j.innerHTML=$},g=u=>{u!==H&&(H=u,b.querySelectorAll("[data-dimension]").forEach(_=>{_.classList.toggle("is-active",_.dataset.dimension===u)}),v.hidden=u!=="brand",w.hidden=u!=="model",x&&(x.placeholder=u==="brand"?"\u641C\u7D22\u54C1\u724C\u2026":"\u641C\u7D22\u6A21\u578B\u2026"),M(),U="all",N=r,ee(),u==="pricing"?b.hidden=!0:(b.hidden=!1,(u==="brand"?v:w).querySelector('[data-brand="all"]')?.classList.add("is-active")),L&&(L.hidden=u==="pricing"),x&&(x.value=""),T(),y(u),Vn(u),z())},x=S.codingPlanOverview.querySelector("#brandSearchInput"),T=()=>{let u=(x?.value||"").trim().toLowerCase(),_=H==="brand"?v:w;_.querySelectorAll(".brand-tab[data-brand]").forEach(E=>{let j=E.dataset.brand;if(j==="all"||j==="free"){E.hidden=!1;return}let fe=(E.dataset.brandLabel||"").toLowerCase();E.hidden=u?!fe.includes(u):!1});let Y=_.querySelector(".brand-divider");Y&&(Y.hidden=!1)};x?.addEventListener("input",T),b.addEventListener("click",u=>{if(u.target.closest("[data-plan-available-toggle]")){lt(),Z();return}let Y=u.target.closest("[data-dimension]");if(Y){g(Y.dataset.dimension);return}let E=u.target.closest(".brand-tab");if(!E||!v.contains(E)&&!w.contains(E))return;let j=E.dataset.brand;M(),U=j,ee(),E.classList.add("is-active"),c(j),z()});let pe=(globalThis.location?.pathname||"").replace(/\/+$/,"")||"/",me=new URLSearchParams(globalThis.location?.search||"").get("view")==="pricing";(pe==="/model"||me)&&g("pricing")}function Vn(e){if(typeof globalThis.history?.replaceState=="function")try{let n=new URL(globalThis.location.href);n.searchParams.delete("view");let t=e==="pricing"?"/model":"/";globalThis.history.replaceState(null,"",`${t}${n.searchParams.toString()?`?${n.searchParams.toString()}`:""}${n.hash}`)}catch{}}function zn(e){if(!S.codingPlanOverview)return;let n=e==="backend"?"\u672C\u5730\u6570\u636E\u5E93\u63A5\u53E3 /api/models \u5F53\u524D\u4E0D\u53EF\u7528\uFF0C\u8BF7\u786E\u8BA4 public-api \u5DF2\u542F\u52A8\u5E76\u8FDE\u63A5\u6570\u636E\u5E93\u3002":"\u90E8\u7F72\u5305\u4E2D\u7684 data.json \u5F53\u524D\u4E0D\u53EF\u7528\uFF0C\u8BF7\u91CD\u65B0\u5BFC\u51FA\u6570\u636E\u5E93\u5FEB\u7167\u5E76\u90E8\u7F72\u3002";S.codingPlanOverview.innerHTML=`
    <section class="plans-workbench" aria-labelledby="codingPlanTitle">
      <div class="workbench-head">
        <div>
          <span id="codingPlanTitle" style="font-weight:bold">\u5957\u9910\u6570\u636E\u6682\u4E0D\u53EF\u7528</span>
        </div>
      </div>
      <div class="workbench-body">
        <p class="text-sm text-slate-600 dark:text-slate-300">${n}</p>
      </div>
    </section>
  `,Nt()}async function jn(){Ke();let e=await Et();if(e.dataUnavailable){zn(e.source);return}Hn(e.plans,e.providerInfo||{},e.modelCatalog||[],e.models||[])}jn();
