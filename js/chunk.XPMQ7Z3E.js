import{A as q,B as H,C as ke,D as _e,E as Z,a as h,b as fe,c as me,d as be,e as C,f as Y,g as I,h as M,i as A,j as Q,k as ve,l as K,m as W,n as R,o as B,q as ye,r as ge,s as S,t as J,u as X,v as he,w as xe,x as U,y as N,z as $e}from"./chunk.W3L4WO6X.js";import{a as i,b as F}from"./chunk.XJPUQ4O3.js";var We=new Set(["\u5F85\u66F4\u65B0","\u5F85\u786E\u8BA4","\u8BF7\u4EE5\u5B98\u7F51\u4E3A\u51C6"]);function V(e){let a=String(e??"").trim();return a&&!We.has(a)?a:"\u2014"}function D(e="",a=""){let t=String(a??"").trim();return{column:t?String(e??"").trim():"",value:t}}function ee(e){return!!(e?.column&&e?.value)}function we(e,a,t){return ee(a)?e.filter(n=>t(n,a.column)===a.value):e}var Pe={};function Le(e){Pe=e||{}}function Je(e){let a=I(e,Pe,h);return a.training?M[a.training]||a.training:"\u5F85\u8C03\u7814"}var Xe={token:"Token \u8BA1\u8D39",credits:"\u79EF\u5206\u5236",five_hours:"\u8BF7\u6C42\u6B21\u6570",weekly:"\u8BF7\u6C42\u6B21\u6570",monthly:"\u8BF7\u6C42\u6B21\u6570",undisclosed:"\u672A\u516C\u5F00"};function te(e){return Xe[e.limitType]||"\u672A\u516C\u5F00"}var ae=[{key:"provider",label:"\u54C1\u724C",value:e=>A(e.provider)||"\u2014"},{key:"name",label:"\u5957\u9910\u540D\u79F0",value:e=>R(e.name)||"\u2014"},{key:"monthlyPrice",label:"\u8FDE\u7EED\u5305\u6708",value:e=>V(e.monthlyPrice)},{key:"quarterlyPrice",label:"\u8FDE\u7EED\u5305\u5B63",value:e=>V(e.quarterlyPrice)},{key:"annualPrice",label:"\u8FDE\u7EED\u5305\u5E74",value:e=>V(e.annualPrice)},{key:"billingUnit",label:"\u8BA1\u8D39\u5355\u4F4D",value:e=>te(e)},{key:"quota",label:"\u989D\u5EA6",value:e=>U(e)?.text||"\u2014"},{key:"unitPrice",label:"\u7B49\u6548\u5355\u4EF7",value:e=>N(e)?.text||"\u2014"},{key:"model",label:"\u4EE3\u8868\u6A21\u578B",value:e=>B(e)||"\u2014"},{key:"status",label:"\u72B6\u6001",value:e=>R(e.statusLabel)||"\u2014"},{key:"dataTraining",label:"\u6570\u636E\u8BAD\u7EC3",value:e=>Je(e)},{key:"verifiedAt",label:"\u6838\u5BF9\u65E5\u671F",value:e=>R(e.lastVerifiedAt)||"\u5F85\u6838\u5BF9"},{key:"source",label:"\u6765\u6E90",value:e=>e.url?"\u5B98\u7F51":"\u2014"}],$=D(),T=!1,Ze=new Intl.Collator("zh-CN",{numeric:!0,sensitivity:"base"});function et(e){return e.status==="available"||e.status==="rush_sale"||e.statusLabel==="\u53EF\u7528"||e.statusLabel==="\u53EF\u8D2D\u4E70"}function Ae(){return T}function Ot(){T=!T}function re(e){return ae.find(a=>a.key===e)}function Se(e,a){let t=re(a);return t?String(t.value(e)||"").trim()||"\u2014":""}function tt(){$=D(),T=!1}function j(){return ee($)&&!!re($.column)}function Te(e){let a=e;return T&&(a=a.filter(et)),j()&&(a=we(a,$,Se)),a}function Ce(e,a){return T?`
    <div class="plan-table-quick-filters">
      <span class="plan-table-filter-count">\u53EA\u770B\u53EF\u8D2D\u4E70\uFF1A${e.length} / ${a.length} \u6761</span>
    </div>
  `:""}function at(e,a){let t=new Map;for(let n of e){let r=Se(n,a.key);t.set(r,(t.get(r)||0)+1)}return Array.from(t.entries()).map(([n,r])=>({value:n,count:r})).sort((n,r)=>n.value==="\u2014"&&r.value!=="\u2014"?1:r.value==="\u2014"&&n.value!=="\u2014"?-1:Ze.compare(n.value,r.value))}function Me(e,a){let t=$.column===e.key&&!!$.value,n=at(a,e);return`
    <th scope="col" class="plan-column-filter break-words px-3 py-3 text-left font-semibold text-slate-900 dark:text-white">
      <button type="button" class="plan-column-filter-trigger${t?" is-active":""}" data-plan-filter-column="${i(e.key)}" aria-haspopup="menu" aria-expanded="false" title="\u7B5B\u9009${i(e.label)}">
        <span class="plan-column-filter-label">${i(e.label)}</span>
        <span class="plan-column-filter-caret" aria-hidden="true"></span>
      </button>
      <div class="plan-column-filter-menu" data-plan-filter-menu="${i(e.key)}" role="menu" hidden>
        <button type="button" class="plan-column-filter-option${t?"":" is-active"}" data-plan-filter-value="">
          <span class="plan-column-filter-option-label">\u5168\u90E8</span>
          <span class="plan-column-filter-option-count">${a.length}</span>
        </button>
        ${n.map(r=>`
          <button type="button" class="plan-column-filter-option${t&&r.value===$.value?" is-active":""}" data-plan-filter-value="${i(r.value)}">
            <span class="plan-column-filter-option-label">${i(r.value)}</span>
            <span class="plan-column-filter-option-count">${r.count}</span>
          </button>
        `).join("")}
      </div>
    </th>
  `}function Ue(e,a){if(!j())return"";let t=re($.column);return`
    <div class="plan-table-filter-summary">
      <span class="plan-table-filter-chip">
        <span>${i(t.label)}</span>
        <strong>${i($.value)}</strong>
      </span>
      <span class="plan-table-filter-count">${e.length} / ${a.length} \u6761</span>
      <button type="button" class="plan-table-filter-clear" data-plan-filter-clear>\u6E05\u9664</button>
    </div>
  `}function O(e){e&&(e.querySelectorAll(".plan-column-filter-menu").forEach(a=>{a.hidden=!0}),e.querySelectorAll("[data-plan-filter-column]").forEach(a=>{a.setAttribute("aria-expanded","false")}))}function jt(e,a,t,n){e.addEventListener("click",r=>{let s=r.target.closest("[data-plan-filter-column]");if(s&&e.contains(s)){let o=s.closest(".plan-column-filter")?.querySelector(".plan-column-filter-menu");if(!o)return;let p=!o.hidden;O(e),p||(o.hidden=!1,s.setAttribute("aria-expanded","true"));return}let l=r.target.closest("[data-plan-filter-value]");if(l&&e.contains(l)){let o=l.closest("[data-plan-filter-menu]"),p=l.dataset.planFilterValue||"";$=o&&p?D(o.dataset.planFilterMenu,p):D(),t();return}let d=r.target.closest("[data-plan-filter-clear]");if(d&&e.contains(d)){tt(),t();return}let u=r.target.closest("[data-plan-key]");if(u&&e.contains(u)&&!r.target.closest("a")){let o=u.dataset.planKey||"";W(a(),o)&&n(o);return}r.target.closest(".plan-column-filter")||O(e)}),e.addEventListener("keydown",r=>{let s=r.target.closest("[data-plan-key]");if(!s||!e.contains(s)||r.target.closest("a")||r.key!=="Enter"&&r.key!==" ")return;r.preventDefault();let l=s.dataset.planKey||"";W(a(),l)&&n(l)}),document.addEventListener("click",r=>{e.contains(r.target)||O(e)}),document.addEventListener("keydown",r=>{r.key==="Escape"&&O(e)})}var z=2;function rt(e){let a=X(e.lastVerifiedAt);if(a.state==="fresh"){let t=a.days===0?"\u2713 \u4ECA\u65E5\u6838\u5B9E":`\u2713 ${a.days} \u5929\u524D\u6838\u5B9E`;return`<span class="whitespace-nowrap rounded-md bg-emerald-50 px-1.5 py-0.5 text-[10px] font-medium text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-300" title="\u5B98\u65B9\u9875\u6838\u5B9E\u4E8E ${i(a.date)}">${t}</span>`}return a.state==="stale"?`<span class="whitespace-nowrap rounded-md bg-amber-50 px-1.5 py-0.5 text-[10px] font-medium text-amber-600 dark:bg-amber-950/40 dark:text-amber-300" title="\u4E0A\u6B21\u6838\u5B9E ${i(a.date)}\uFF0C\u5DF2\u8D85\u8FC7 30 \u5929">\u5F85\u590D\u6838</span>`:""}function nt(e,a){let t=me(e.provider,a,h),n=be(e,t);return n?`/plans/${encodeURIComponent(n)}/`:""}function st(e,a){let t=Y(e,a,h),n=String(t.seo_slug||"").trim(),r=String(t.seo_intro||"").trim(),s=String(t.icon_url||"").trim();return n&&r&&s?`/brands/${encodeURIComponent(n)}/`:""}function lt(e,a={}){let t=Y(e.provider,a,h);return C(t.icon_url)||C(e.providerIconUrl)||C(fe(e.provider)?.iconUrl)}function E(e,a,t="brand-icon"){let n=C(e),r=String(a||"?").trim().slice(0,1).toUpperCase()||"?",s=n?"brand-icon-fallback hidden":"brand-icon-fallback";return`<span class="${t}" aria-hidden="true">
    ${n?`<img class="brand-icon-img" src="${i(n)}" alt="" loading="lazy" referrerpolicy="no-referrer">`:""}
    <span class="${s}">${i(r)}</span>
  </span>`}function De(e,a){let t=new Map;for(let r of e){let s=t.get(r.provider);s||(s={provider:r.provider,label:A(r.provider,a,h),iconUrl:lt(r,a),brandHref:st(r.provider,a),plans:[]},t.set(r.provider,s)),s.plans.push(r)}let n=[...t.values()];for(let r of n)r.plans=ve(r.plans);return n.sort((r,s)=>Q(r.provider,a,h)-Q(s.provider,a,h)),n}function it(e){return e.status==="available"||e.statusLabel==="\u53EF\u7528"||e.statusLabel==="\u53EF\u8D2D\u4E70"}function ot(e){let a=null;for(let t of e){let n=null;if(Number.isFinite(t.monthlyPriceValue))n=t.monthlyPriceValue;else{let r=String(t.monthlyPrice||"").match(/[\d.]+/),s=r?parseFloat(r[0]):NaN;Number.isFinite(s)&&(n=s)}n==null||n<0||(a==null||n<a)&&(a=n)}return a}function ct(e){let a=ot(e.plans),t=e.plans.filter(it).length,n=[];a!=null&&n.push(a===0?"\u514D\u8D39\u8D77":`\xA5${ge(a)} \u8D77`),t>0&&n.push(`${t} \u4E2A\u53EF\u7528`);let r=n.join(" \xB7 ");return`<span class="plan-table-group-summary">${i(r)}</span>`}function dt(e,a){let t=I(e,a,h);return t.training==="no"?`<span class="text-xs font-medium text-emerald-600 dark:text-emerald-400" title="${i(M.no)}">\u4E0D\u8BAD\u7EC3</span>`:t.training==="yes"?`<span class="text-xs font-medium text-amber-600 dark:text-amber-400" title="${i(M.yes)}">\u53EF\u80FD\u8BAD\u7EC3</span>`:t.training==="unclear"?'<span class="text-xs text-slate-500 dark:text-slate-400">\u672A\u660E\u786E</span>':'<span class="text-slate-400">\u2014</span>'}function Ee(e){return e.status==="available"||e.statusLabel==="\u53EF\u7528"||e.statusLabel==="\u53EF\u8D2D\u4E70"?"bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300":e.status==="rush_sale"?"bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400":"bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"}function ut(e,a="",t="",n=!1){let r=Ee(e),s=e.includedCalls&&e.includedCalls.length>10&&(e.includedCalls.includes("\xA5")||e.includedCalls.includes("\u5143")||e.includedCalls.includes("\u767E\u4E07")),l=$e[e.planType]||e.planType||"",d,u=_e(e);u?d=u:s?d=`<span class="text-sm font-semibold text-slate-700 dark:text-slate-300">${i(e.includedCalls)}</span>`:e.includedCalls||e.planType!=="api-usage"?d='<span class="text-lg font-bold text-slate-500 dark:text-slate-400">\u8BF7\u4EE5\u5B98\u7F51\u4E3A\u51C6</span>':d='<span class="text-lg font-bold text-slate-400 dark:text-slate-500">\u6309\u91CF\u8BA1\u8D39</span>';let o=U(e),p=N(e),b=o||p?`<div class="plan-card-quota-row mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
        ${o?`<span title="${i(o.full)}">\u989D\u5EA6\uFF1A${i(o.text)}</span>`:""}
        ${p?`<span class="font-medium text-brand-700 dark:text-brand-300" title="\u6309${i(p.basis)}\u6298\u7B97${p.estimated?"\uFF08\u4F30\u7B97\uFF09":""}">${i(p.text)}</span>`:""}
      </div>`:"";return`
    <div class="plan-card">
      <div class="plan-card-head">
        <div class="plan-card-title-row flex items-start justify-between gap-2">
          <div class="flex min-w-0 flex-1 items-start gap-2">
            ${a}
            <div class="min-w-0 flex-1">
              <p class="plan-card-title">${i(e.name)}</p>
            </div>
          </div>
          <div class="plan-card-meta flex shrink-0 flex-col items-end gap-1.5">
            <span class="whitespace-nowrap rounded-md px-2 py-0.5 text-xs font-medium ${r}">${i(e.statusLabel)}</span>
            ${t}
            ${l?`<span class="whitespace-nowrap rounded-md bg-brand-50 px-1.5 py-0.5 text-[10px] font-medium text-brand-600 dark:bg-brand-950/40 dark:text-brand-300">${i(l)}</span>`:""}
            ${rt(e)}
          </div>
          <span class="plan-card-disclosure" aria-hidden="true">
            <span>${n?"\u6536\u8D77\u8BE6\u60C5":"\u67E5\u770B\u8BE6\u60C5"}</span>
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="m6 8 4 4 4-4" />
            </svg>
          </span>
        </div>
        <div class="plan-card-price-row mt-3 flex items-baseline gap-1.5">
          ${d}
        </div>
        ${b}
      </div>
    </div>
  `}function pt(e,a,t,n,r){return e.length?De(e,t).map(s=>{let l=r||n.has(s.provider),u=(l?s.plans:s.plans.slice(0,z)).map(m=>{let f=K(m),v=f===a,y=m.confidenceScore,g="trust-dot--yellow";y&&y>=.8?g="trust-dot--high":y&&y<.5&&(g="trust-dot--red");let w=[m.domesticPayment?'<span class="plan-card-badge">\u652F\u6301\u56FD\u5185\u652F\u4ED8</span>':"",J(m)?`<span class="plan-card-badge plan-card-badge--intl" title="\u56FD\u9645\u7AD9\u5957\u9910\uFF0C\u4EE5\u7F8E\u5143\u7ED3\u7B97\uFF0C\u8BF7\u8DF3\u8F6C creditsplan.com \u67E5\u770B">\u56FD\u9645 \xB7 ${i(String(m.monthlyCurrency||"USD").toUpperCase())}</span>`:""].filter(Boolean).join(""),P=`<span class="trust-dot ${g}" title="\u53EF\u4FE1\u5EA6: ${y!=null?Math.round(y*100)+"%":"\u672A\u77E5"}"></span>`;return`
        <article class="plan-card-mobile${v?" is-selected":""}">
          <div class="plan-card-toggle" role="button" tabindex="0" data-plan-key="${i(f)}" aria-expanded="${v?"true":"false"}">
            ${ut(m,P,w,v)}
          </div>
          ${v?Z(m,t):""}
        </article>`}).join(""),o=Math.max(0,s.plans.length-z),p=!r&&o>0?`<button type="button" class="plan-group-toggle" data-plan-group-toggle="${i(s.provider)}" aria-expanded="${l?"true":"false"}">${l?"\u6536\u8D77\u591A\u4F59\u5957\u9910":`\u67E5\u770B\u5176\u4F59 ${o} \u4E2A\u5957\u9910`}</button>`:"",b=`${E(s.iconUrl,s.label,"brand-icon brand-icon--section")}
          <h3 class="text-sm font-bold text-brand-800 dark:text-brand-200">${i(s.label)}</h3>`;return`
      <section class="plan-card-group">
        <div class="mb-2 flex items-center gap-2">
          ${s.brandHref?`<a href="${i(s.brandHref)}" class="plan-group-brand-link">${b}</a>`:b}
          <span class="rounded-full bg-brand-100 px-1.5 py-0.5 text-xs font-medium text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">${s.plans.length}</span>
        </div>
        <div class="plan-card-grid">
          ${u}
        </div>
        ${p}
      </section>`}).join(""):""}function Ne(e,a,t,n,r=z){let s=t?e.plans:e.plans.slice(0,r);return s.length?s.map(l=>{let d=K(l),u=d===a,o=Ee(l),p=ke(l),b=S(l.monthlyPrice)?`<div>${i(l.monthlyPrice)}</div>${p?`<div class="plan-table-price-first">\u9996\u6708 ${i(p)}</div>`:""}`:'<span class="text-slate-400">\u2014</span>',m=S(l.quarterlyPrice)?`<div>${i(l.quarterlyPrice)}</div>${S(l.quarterlyMonthlyPrice)?`<div class="plan-table-price-sub">\u7EA6 ${i(l.quarterlyMonthlyPrice)}</div>`:""}`:'<span class="text-slate-400">\u2014</span>',f=S(l.annualPrice)?`<div>${i(l.annualPrice)}</div>${S(l.annualMonthlyPrice)?`<div class="plan-table-price-sub">\u7EA6 ${i(l.annualMonthlyPrice)}</div>`:""}`:'<span class="text-slate-400">\u2014</span>',v=U(l),y=v?`<span class="text-slate-700 dark:text-slate-300" title="${i(v.full)}">${i(v.text)}</span>`:'<span class="text-slate-400">\u2014</span>',g=te(l),w=g==="\u672A\u516C\u5F00"?'<span class="text-slate-400">\u2014</span>':`<span class="billing-unit-badge billing-unit-badge--${i(l.limitType||"undisclosed")}">${i(g)}</span>`,P=N(l),Ve=P?`<span class="whitespace-nowrap font-medium text-brand-700 dark:text-brand-300" title="\u6309${i(P.basis)}\u6298\u7B97${P.estimated?"\uFF08\u4F30\u7B97\uFF09":""}">${i(P.text)}</span>`:'<span class="text-slate-400">\u2014</span>',L=X(l.lastVerifiedAt),Oe=L.state==="fresh"?`<span class="text-xs font-medium text-emerald-600 dark:text-emerald-400" title="\u5B98\u65B9\u9875\u6838\u5B9E\u4E8E ${i(L.date)}">\u2713 ${L.days===0?"\u4ECA\u65E5":`${L.days} \u5929\u524D`}</span>`:L.state==="stale"?`<span class="text-xs font-medium text-amber-600 dark:text-amber-400" title="\u4E0A\u6B21\u6838\u5B9E ${i(L.date)}\uFF0C\u5DF2\u8D85\u8FC7 30 \u5929">\u5F85\u590D\u6838</span>`:'<span class="text-xs text-slate-400">\u5F85\u6838\u5BF9</span>',oe=F(l.url),ce=H(l,oe),je=oe?`<a href="${i(ce.href)}" target="_blank" rel="${ce.rel}" ${q(l)} class="text-sm font-medium text-brand-600 hover:text-brand-800 dark:text-brand-400 dark:hover:text-brand-300">\u5B98\u7F51 \u2192</a>`:'<span class="text-slate-400">\u2014</span>',ze=dt(l,n),Ge=u?`<tr class="plan-detail-row">
          <td colspan="13" class="plan-inline-detail-cell">
            ${Z(l,n)}
          </td>
        </tr>`:"",de=nt(l,n),ue=i(l.name),Ye=J(l)?` <span class="plan-intl-tag" title="\u56FD\u9645\u7AD9\u5957\u9910\uFF0C\u4EE5\u7F8E\u5143\u7ED3\u7B97\uFF0C\u8BF7\u8DF3\u8F6C creditsplan.com \u67E5\u770B">\u56FD\u9645 \xB7 ${i(String(l.monthlyCurrency||"USD").toUpperCase())}</span>`:"",Qe=(de?`<a href="${i(de)}" class="font-medium text-brand-700 hover:text-brand-900 hover:underline dark:text-brand-300 dark:hover:text-brand-200">${ue}</a>`:ue)+Ye,pe=`${E(e.iconUrl,e.label,"brand-icon brand-icon--table")}<span>${i(e.label)}</span>`,Ke=e.brandHref?`<a href="${i(e.brandHref)}" class="plan-provider-cell plan-provider-cell--link">${pe}</a>`:`<div class="plan-provider-cell">${pe}</div>`;return`
      <tr class="plan-select-row${u?" is-selected":""}" data-plan-key="${i(d)}" tabindex="0" aria-selected="${u?"true":"false"}">
        <td class="px-3 py-3 font-medium text-slate-900 dark:text-white">${Ke}</td>
        <td class="break-words px-3 py-3 text-slate-900 dark:text-white">${Qe}</td>
        <td class="break-words px-3 py-3 text-slate-900 dark:text-white">${b}</td>
        <td class="break-words px-3 py-3 text-slate-900 dark:text-white">${m}</td>
        <td class="break-words px-3 py-3 text-slate-900 dark:text-white">${f}</td>
        <td class="plan-table-nowrap px-3 py-3">${w}</td>
        <td class="break-words px-3 py-3">${y}</td>
        <td class="plan-table-nowrap px-3 py-3">${Ve}</td>
        <td class="break-words px-3 py-3 text-slate-600 dark:text-slate-300">${i(B(l)||"\u2014")}</td>
        <td class="plan-table-nowrap px-3 py-3"><span class="rounded-md px-2 py-0.5 text-xs font-medium ${o}">${i(l.statusLabel)}</span></td>
        <td class="plan-table-nowrap px-3 py-3">${ze}</td>
        <td class="plan-table-nowrap px-3 py-3">${Oe}</td>
        <td class="plan-table-nowrap px-3 py-3">${je}</td>
      </tr>
      ${Ge}`}).join(""):""}function ft(e,a,t,n,r,s){let l=a.length?De(a,n).map(d=>{if(d.plans.length===1)return Ne(d,t,!0,n);let u=!s&&d.plans.length>z,o=s||!u||r.has(d.provider),p=ct(d),b=`${E(d.iconUrl,d.label,"brand-icon brand-icon--section")}
              <span class="text-sm font-bold text-brand-800 dark:text-brand-200">${i(d.label)}</span>`,m=`
              ${d.brandHref?`<a href="${i(d.brandHref)}" class="plan-table-group-brand">${b}</a>`:b}
              <span class="rounded-full bg-brand-100 px-1.5 py-0.5 text-xs font-medium text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">${d.plans.length}</span>
              <span class="plan-table-group-right">
                ${p}
                ${u?'<svg class="plan-table-group-chevron" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m6 8 4 4 4-4"/></svg>':""}
              </span>`;return`
        <tr class="border-y border-slate-200 dark:border-slate-700">
          <td colspan="13" class="bg-brand-50/70 p-0 dark:bg-brand-950/20">
            ${u?`<div class="plan-table-group-toggle" role="button" tabindex="0" data-plan-group-toggle="${i(d.provider)}" aria-expanded="${o?"true":"false"}" aria-label="${o?"\u6536\u8D77":"\u5C55\u5F00"}${i(d.label)}\u5957\u9910">${m}</div>`:`<div class="plan-table-group-toggle plan-table-group-toggle--static">${m}</div>`}
          </td>
        </tr>
        ${Ne(d,t,o,n)}`}).join(""):`<tr>
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
            ${ae.map(d=>Me(d,e)).join("")}
          </tr>
        </thead>
        <tbody>
          ${l}
        </tbody>
      </table>
    </div>`}function Xt(e,a="",t={},n=new Set,r=!1){if(!e.length)return'<p class="text-sm text-slate-500 dark:text-slate-400">\u540E\u53F0\u6682\u65E0\u5957\u9910\u8BB0\u5F55\u3002</p>';let s=ye(e,t,h);if(!s.length)return'<p class="text-sm text-slate-500 dark:text-slate-400">\u540E\u53F0\u6682\u65E0\u5957\u9910\u8BB0\u5F55\u3002</p>';Le(t);let l=Te(s),d=r||j()||Ae();return`
    <div>
      ${Ce(l,s)}
      ${Ue(l,s)}
      <div class="plan-view-cards">
        ${pt(l,a,t,n,d)}
      </div>
      <div class="plan-view-table">
        ${ft(s,l,a,t,n,d)}
      </div>
    </div>`}var ne=[{id:"light",label:"\u8F7B\u5EA6 ~500 \u6B21/\u6708",value:500},{id:"medium",label:"\u4E2D\u5EA6 ~3,000 \u6B21/\u6708",value:3e3},{id:"heavy",label:"\u91CD\u5EA6 ~10,000 \u6B21/\u6708",value:1e4},{id:"extreme",label:"\u6781\u91CD ~30,000 \u6B21/\u6708",value:3e4}],bt={\u667A\u8C31:"GLM \u7CFB",KIMI:"Kimi \u7CFB",\u963F\u91CC\u4E91\u767E\u70BC:"Qwen \u7CFB",Qoder:"Qwen \u7CFB",\u706B\u5C71\u5F15\u64CE:"\u8C46\u5305\u7CFB",DeepSeek:"DeepSeek",MiniMax:"MiniMax",\u817E\u8BAF\u6DF7\u5143:"\u6DF7\u5143\u7CFB",\u767E\u5EA6\u5343\u5E06:"\u6587\u5FC3\u7CFB",\u9636\u8DC3\u661F\u8FB0:"Step \u7CFB","Xiaomi MiMo":"MiMo \u7CFB"},Fe=8;function vt(e){return bt[e.provider]||e.provider||"\u5176\u4ED6"}function yt(e,a){let t=new Map;for(let s of e)s.id&&t.set(s.id,vt(s));let n=new Map;for(let s of a){let l=new Set((s.modelIds||[]).map(d=>t.get(d)).filter(Boolean));for(let d of l)n.set(d,(n.get(d)||0)+1)}return{options:[...n.entries()].map(([s,l])=>({family:s,count:l})).sort((s,l)=>l.count-s.count||s.family.localeCompare(l.family,"zh-CN")),familyByModelId:t}}function gt(e,a){return new Set((e.modelIds||[]).map(t=>a.get(t)).filter(Boolean))}function ht(e,a,t){let{families:n,usage:r,budget:s}=a,l=[],d=0;for(let u of e){if(u.planType==="api_package"){d+=1;continue}let o=xe(u);if(s!=null&&o&&o.cny>s)continue;let p=!1;if(n.size){let v=gt(u,t);if(!v.size)p=!0;else if(![...v].some(y=>n.has(y)))continue}let b=he(u),m=b&&o&&b.value>0?o.cny/b.value*1e3:null,f;p?f=4:b?b.value>=r?f=1:f=2:f=3,l.push({plan:u,price:o,quota:b,costPer1k:m,tier:f})}return l.sort((u,o)=>{if(u.tier!==o.tier)return u.tier-o.tier;if((u.tier===1||u.tier===2)&&u.costPer1k!==o.costPer1k)return(u.costPer1k??1/0)-(o.costPer1k??1/0);let p=u.price?u.price.cny:1/0,b=o.price?o.price.cny:1/0;return p-b}),{results:l,paygoCount:d}}function Ie(e){return Math.round(e).toLocaleString("zh-CN")}function Re(e,a="CNY"){return`${a==="USD"?"$":"\xA5"}${e.toLocaleString("zh-CN",{maximumFractionDigits:e<10?2:0})}`}function xt(e,a){let{plan:t,price:n,quota:r,costPer1k:s,tier:l}=e,d=A(t.provider,a,h),u=[];if(l===1?u.push('<span class="plan-advisor-chip plan-advisor-chip--good">\u989D\u5EA6\u5145\u8DB3</span>'):l===2?u.push('<span class="plan-advisor-chip plan-advisor-chip--warn">\u989D\u5EA6\u53EF\u80FD\u4E0D\u8DB3</span>'):l===3?u.push('<span class="plan-advisor-chip plan-advisor-chip--muted">\u989D\u5EA6\u672A\u516C\u5F00</span>'):u.push('<span class="plan-advisor-chip plan-advisor-chip--muted">\u6A21\u578B\u672A\u6807\u6CE8</span>'),r){let f=r.estimated?`\uFF08${i(r.basis)}\uFF0C\u4F30\u7B97\uFF09`:"";u.push(`<span class="plan-advisor-chip">\u6708\u989D\u5EA6 ~${Ie(r.value)} \u6B21${f}</span>`)}if(s!=null&&u.push(`<span class="plan-advisor-chip">\u6BCF\u5343\u6B21 \u2248 ${Re(s)}</span>`),t.supportedModelNames?.length){let f=t.supportedModelNames.slice(0,3).join(" / ");u.push(`<span class="plan-advisor-chip">\u652F\u6301 ${i(f)}${t.supportedModelNames.length>3?" \u7B49":""}</span>`)}let o='<span class="plan-advisor-price-muted">\u4EF7\u683C\u8BF7\u4EE5\u5B98\u7F51\u4E3A\u51C6</span>';if(n){let f=n.cycle!=="\u6708\u4ED8"?`<span class="plan-advisor-cycle">${i(n.cycle)}</span>`:"",v=n.currency==="USD"?`<span class="plan-advisor-price-note">\u2248 \xA5${Ie(n.cny)}\uFF08\u6309 \xA5${7.2} \u6298\u7B97\uFF09</span>`:"";o=`<span class="plan-advisor-price">${Re(n.value,n.currency)}/\u6708</span>${f}${v}`}let p=F(t.url),b=p?H(t,p):null,m=b?`<a href="${i(b.href)}" target="_blank" rel="${b.rel}" ${q(t)} class="plan-advisor-link">\u5B98\u7F51 \u2192</a>`:"";return`
    <li class="plan-advisor-result">
      <div class="plan-advisor-result-head">
        ${E(t.providerIconUrl,d,"brand-icon plan-advisor-result-icon")}
        <div class="plan-advisor-result-name">
          <strong>${i(t.name)}</strong>
          <span>${i(d)}</span>
        </div>
        <div class="plan-advisor-result-price">${o}</div>
      </div>
      <div class="plan-advisor-result-chips">${u.join("")}</div>
      ${m}
    </li>
  `}function $t(e,a){let t=ne.some(n=>n.value===a.usage)?"":a.usage;return`
    <div class="plan-advisor-form">
      <div class="plan-advisor-field">
        <span class="plan-advisor-label">\u4E3B\u8981\u7528\u54EA\u4E2A\u6A21\u578B\u7CFB\uFF1F<small>\u53EF\u591A\u9009\uFF0C\u4E0D\u9009=\u4E0D\u9650</small></span>
        <div class="plan-advisor-options" data-advisor-families>
          ${e.map(n=>{let r=a.families.has(n.family);return`
              <button type="button" class="plan-advisor-option${r?" is-active":""}" data-family="${i(n.family)}" aria-pressed="${r}">
                ${i(n.family)}<span class="plan-advisor-option-count">${n.count}</span>
              </button>
            `}).join("")}
        </div>
      </div>
      <div class="plan-advisor-field">
        <span class="plan-advisor-label">\u6BCF\u6708\u5927\u7EA6\u8C03\u7528\u591A\u5C11\u6B21\uFF1F</span>
        <div class="plan-advisor-options" data-advisor-usage>
          ${ne.map(n=>{let r=n.value===a.usage;return`
              <button type="button" class="plan-advisor-option${r?" is-active":""}" data-usage="${n.value}" aria-pressed="${r}">
                ${i(n.label)}
              </button>
            `}).join("")}
          <input type="number" min="1" class="plan-advisor-input" data-advisor-usage-custom placeholder="\u81EA\u5B9A\u4E49\u6B21\u6570" aria-label="\u81EA\u5B9A\u4E49\u6BCF\u6708\u8C03\u7528\u6B21\u6570" value="${t}">
        </div>
      </div>
      <div class="plan-advisor-field plan-advisor-field--row">
        <label class="plan-advisor-budget">
          <span>\u9884\u7B97\u4E0A\u9650</span>
          <input type="number" min="0" class="plan-advisor-input" data-advisor-budget placeholder="\xA5/\u6708\uFF0C\u53EF\u4E0D\u586B" aria-label="\u6BCF\u6708\u9884\u7B97\u4E0A\u9650\uFF08\u5143\uFF09" value="${a.budget??""}">
        </label>
      </div>
    </div>
    <div class="plan-advisor-results" data-advisor-results aria-live="polite"></div>
  `}function kt(){return`
    <div class="plan-advisor-dialog" role="dialog" aria-modal="true" aria-labelledby="planAdvisorTitle" tabindex="-1">
      <div class="plan-advisor-head">
        <h2 id="planAdvisorTitle">\u54EA\u4E2A\u5957\u9910\u6700\u5212\u7B97\uFF1F</h2>
        <button type="button" class="plan-advisor-close" data-advisor-close aria-label="\u5173\u95ED\u8BA1\u7B97\u5668">\u2715</button>
      </div>
      <div class="plan-advisor-body"></div>
      <p class="plan-advisor-disclaimer">\u989D\u5EA6\u4E0E\u4EF7\u683C\u4E3A\u516C\u5F00\u8D44\u6599\u4F30\u7B97\uFF0C\u4EC5\u4F9B\u6BD4\u8F83\u53C2\u8003\uFF0C\u8BF7\u4EE5\u5382\u5546\u5B98\u7F51\u4E3A\u51C6\u3002</p>
    </div>
  `}function _t({root:e,plans:a,providerInfo:t={},modelCatalog:n=[],initialState:r={},onStateChange:s=null}){let{options:l,familyByModelId:d}=yt(n,a),u=new Set(l.map(m=>m.family)),o={families:new Set([...r.families||[]].filter(m=>u.has(m))),usage:Number.isFinite(r.usage)&&r.usage>0?r.usage:ne[1].value,budget:Number.isFinite(r.budget)&&r.budget>0?r.budget:null,showAll:!1};e.innerHTML=$t(l,o);let p=()=>{let m=e.querySelector("[data-advisor-results]"),{results:f,paygoCount:v}=ht(a,o,d);if(!f.length){m.innerHTML=`
        <p class="plan-advisor-empty">\u6CA1\u6709\u7B26\u5408\u6761\u4EF6\u7684\u5957\u9910\uFF0C\u8BD5\u8BD5\u653E\u5BBD\u6A21\u578B\u7CFB\u6216\u9884\u7B97\u9650\u5236\u3002</p>
        ${v?`<p class="plan-advisor-paygo">\u53E6\u6709 ${v} \u4E2A\u6309\u91CF\u8BA1\u8D39\u9009\u9879\u672A\u53C2\u4E0E\u6392\u5E8F\uFF0C\u53EF\u5728\u5957\u9910\u8868\u4E2D\u67E5\u770B\u3002</p>`:""}
      `;return}let y=o.showAll?f:f.slice(0,Fe);m.innerHTML=`
      <p class="plan-advisor-summary">\u6309\u6027\u4EF7\u6BD4\u4E3A\u4F60\u6392\u5E8F ${f.length} \u4E2A\u5957\u9910\uFF1A</p>
      <ol class="plan-advisor-list">
        ${y.map(g=>xt(g,t)).join("")}
      </ol>
      ${f.length>Fe&&!o.showAll?`<button type="button" class="plan-advisor-more" data-advisor-more>\u5C55\u5F00\u5168\u90E8 ${f.length} \u4E2A\u7ED3\u679C</button>`:""}
      ${v?`<p class="plan-advisor-paygo">\u53E6\u6709 ${v} \u4E2A\u6309\u91CF\u8BA1\u8D39\u9009\u9879\u672A\u53C2\u4E0E\u6392\u5E8F\uFF0C\u53EF\u5728\u5957\u9910\u8868\u4E2D\u67E5\u770B\u3002</p>`:""}
    `},b=()=>{s?.(o)};return e.addEventListener("click",m=>{let f=m.target.closest("[data-family]");if(f){let y=f.dataset.family;o.families.has(y)?o.families.delete(y):o.families.add(y);let g=o.families.has(y);f.classList.toggle("is-active",g),f.setAttribute("aria-pressed",String(g)),o.showAll=!1,p(),b();return}let v=m.target.closest("[data-usage]");if(v){o.usage=Number(v.dataset.usage),e.querySelectorAll("[data-usage]").forEach(g=>{let w=g===v;g.classList.toggle("is-active",w),g.setAttribute("aria-pressed",String(w))});let y=e.querySelector("[data-advisor-usage-custom]");y&&(y.value=""),o.showAll=!1,p(),b();return}m.target.closest("[data-advisor-more]")&&(o.showAll=!0,p())}),e.querySelector("[data-advisor-usage-custom]")?.addEventListener("input",m=>{let f=Number(m.target.value);Number.isFinite(f)&&f>0&&(o.usage=f,e.querySelectorAll("[data-usage]").forEach(v=>{v.classList.remove("is-active"),v.setAttribute("aria-pressed","false")})),o.showAll=!1,p(),b()}),e.querySelector("[data-advisor-budget]")?.addEventListener("input",m=>{let f=Number(m.target.value);o.budget=Number.isFinite(f)&&f>0?f:null,o.showAll=!1,p(),b()}),p(),{state:o,refresh:p}}function ia({plans:e,providerInfo:a={},modelCatalog:t=[],fab:n}){if(!n)return null;let r=null,s=null,l=null,d=()=>{r&&(r.hidden=!0,document.body.style.overflow="",l?.focus?.())},u=()=>{r||(r=document.createElement("div"),r.className="plan-advisor-overlay",r.hidden=!0,r.innerHTML=kt(),document.body.appendChild(r),s=_t({root:r.querySelector(".plan-advisor-body"),plans:e,providerInfo:a,modelCatalog:t}),r.addEventListener("click",p=>{p.target.closest("[data-advisor-close]")&&d()}),document.addEventListener("keydown",p=>{p.key==="Escape"&&r&&!r.hidden&&d()}))},o=()=>{u(),l=document.activeElement,r.hidden=!1,document.body.style.overflow="hidden",s.refresh(),r.querySelector(".plan-advisor-dialog")?.focus()};return n.addEventListener("click",o),{open:o,close:d}}var wt=new Set(["localhost","127.0.0.1","::1"]);function se(e=globalThis.location?.hostname||""){let a=String(e).trim().toLowerCase().replace(/^\[|\]$/g,"");return wt.has(a)||a.endsWith(".localhost")}function Be(e=globalThis.location?.hostname||""){return se(e)?"/api/models":"/data.json"}async function Pt(){let a=se()?"backend":"static",t=await St(Be());return{...Lt(t,a),dataUnavailable:!t}}async function ma(){let e=await Pt(),a=e.models.flatMap(r=>Ct(r)),t=e.modelCatalog||[],n=new Map(t.map(r=>[r.id,r.name]));for(let r of a)r.supportedModelNames=(r.modelIds||[]).map(s=>n.get(s)).filter(Boolean);return{...e,plans:a,providerInfo:e.providerInfo||{},modelCatalog:t}}function Lt(e,a){if(e&&Array.isArray(e.models)){let t=e.models.map(n=>Tt(n,a));if(t.length)return{source:a,lastUpdated:e.last_updated||Ft(t.map(n=>n.updatedAt)),models:t,rawModels:e.models,providerInfo:e.provider_info||{},modelCatalog:At(e.model_catalog)}}return{source:a,lastUpdated:e?.last_updated||"unknown",models:[],rawModels:[],providerInfo:e?.provider_info||{},modelCatalog:[]}}function At(e){return Array.isArray(e)?e.map(a=>({id:c(a.id),name:c(a.name,a.id||""),provider:c(a.provider,""),providerIconUrl:c(a.provider_icon_url,""),logoUrl:c(a.logo_url,""),sortOrder:k(a.sort_order),marketRegion:c(a.market_region,"")})).filter(a=>a.id):[]}async function St(e){try{let a=await fetch(e,{headers:{Accept:"application/json"}});return a.ok?await a.json():null}catch{return null}}function Tt(e,a){let t=Array.isArray(e.capabilities)?e.capabilities:[],n=k(e.input_price),r=k(e.context_length),s=G(e.plan_summary,e.access_notes,e.notes),l=Mt(e,n,r,t);return{id:c(e.id),vendor:c(e.provider,"\u5F85\u66F4\u65B0"),providerIconUrl:c(e.provider_icon_url,e.icon_url||""),modelName:c(e.name,"\u5F85\u66F4\u65B0"),inputPrice:He(e.input_price,e.currency),outputPrice:He(e.output_price,e.currency),contextLength:Et(e.context_length),multimodal:t.includes("vision")?"\u652F\u6301":"\u5F85\u786E\u8BA4",apiSupport:"\u652F\u6301",rmbRecharge:c(e.rmb_recharge_support,"\u8BF7\u4EE5\u5B98\u7F51\u4E3A\u51C6"),invoice:c(e.invoice_support,"\u8BF7\u4EE5\u5B98\u7F51\u4E3A\u51C6"),rmbRechargeRaw:e.rmb_recharge_support??null,invoiceRaw:e.invoice_support??null,accessLevel:c(e.access_level,""),marketRegion:c(e.market_region,""),marketRegionLabel:c(e.market_region_label,""),scenarios:l,suitableFor:c(e.suitable_for,s||"\u8BF7\u4EE5\u5B98\u7F51\u4E3A\u51C6"),updatedAt:c(e.last_updated,e.release_date||"\u5F85\u66F4\u65B0"),sourceUrl:c(e.docs_url,e.plan_url||""),packagePlans:Array.isArray(e.package_plans)?e.package_plans:[],source:a,raw:e}}function Ct(e){return(e.packagePlans||[]).filter(t=>t.status!=="discontinued").map(t=>{let n=k(t.monthly_price),r=k(t.quarterly_price),s=k(t.annual_price),l=Dt(t,e);return{id:c(t.id,`${e.id}-plan`),planId:c(t.planId,t.plan_id||""),brand:c(t.brand,t.brand_slug||""),name:c(t.name,"\u5F85\u66F4\u65B0\u5957\u9910"),provider:c(t.provider,e.vendor),providerIconUrl:c(t.provider_icon_url,t.icon_url,e.providerIconUrl),modelName:e.modelName,modelId:c(t.model_id,e.id),modelIds:Array.isArray(t.model_ids)?t.model_ids.map(d=>String(d||"").trim()).filter(Boolean):[],status:c(t.status,"unknown"),statusLabel:c(t.status_label,"\u5F85\u786E\u8BA4"),url:c(t.url,""),monthlyPrice:le(t.monthly_price,l),monthlyPriceValue:n,monthlyCurrency:l,monthlyCurrencyLabel:l==="USD"?"\u7F8E\u5143":"\u4EBA\u6C11\u5E01",quarterlyPrice:ie(t.quarterly_price,l,"\u5B63"),quarterlyPriceValue:r,quarterlyMonthlyPrice:r!=null?le(r/3,l):"",quarterlyMonthlyPriceValue:r!=null?r/3:null,annualPrice:ie(t.annual_price,l,"\u5E74"),annualPriceValue:s,annualMonthlyPrice:s!=null?le(s/12,l):"",annualMonthlyPriceValue:s!=null?s/12:null,includedCalls:c(t.included_calls,""),notes:c(t.notes,""),planType:c(t.plan_type,qe(t,e)),category:qe(t,e),rmbRecharge:e.rmbRecharge,invoice:e.invoice,rmbRechargeRaw:e.rmbRechargeRaw,invoiceRaw:e.invoiceRaw,accessLevel:e.accessLevel,marketRegion:e.marketRegion,marketRegionLabel:e.marketRegionLabel,firstMonthPrice:t.first_month_price!=null?t.first_month_price:null,fiveHoursRequests:c(t.five_hours_requests,""),weeklyRequests:c(t.weekly_requests,""),monthlyRequests:c(t.monthly_requests,""),measuredFiveHoursTokens:c(t.measured_five_hours_tokens,""),measuredWeeklyTokens:c(t.measured_weekly_tokens,""),measuredMonthlyTokens:c(t.measured_monthly_tokens,""),tokenLimit:c(t.token_limit,""),supportedModels:c(t.supported_models,""),benefits:c(t.benefits,""),rating:c(t.rating,""),tags:c(t.tags,""),sourceUrl:c(t.source_url,""),lastVerifiedAt:c(t.last_verified_at,""),refundPolicy:c(t.refund_policy,""),billingCycle:c(t.billing_cycle,""),creditsLimit:c(t.credits_limit,""),concurrencyLimit:c(t.concurrency_limit,""),resetRule:c(t.reset_rule,""),limitType:c(t.limit_type,Ut(t)),dataStatus:c(t.data_status,Nt(t)),confidenceScore:t.confidence_score!=null?t.confidence_score:null,sourceType:c(t.source_type,""),toolCompatibility:_(t.tool_compatibility_json,{}),modelMultiplier:_(t.model_multiplier_json,{}),derivedMetrics:_(t.derived_metrics_json,{}),measuredMetrics:_(t.measured_metrics_json,{}),risk:_(t.risk_json,{}),recommendation:_(t.recommendation_json,{}),changeSummary:_(t.change_summary_json,{}),linkType:c(t.link_type,"official"),hasAffiliate:t.has_affiliate===!0,domesticPayment:t.domestic_payment===!0||t.domestic_payment===1,hasFirstMonthDiscount:t.has_first_month_discount===!0||t.has_first_month_discount===1,recommendationText:c(t.recommendation_text,""),riskText:c(t.risk_text,""),sortOrder:k(t.sort_order),privacyOverride:_(t.privacy_override_json,{}),raw:t}})}function Mt(e,a,t,n){let r=G(e.name,e.provider,e.notes,e.plan_summary,e.access_notes).toLowerCase(),s=new Set(["enterprise-api"]);return a!=null&&a<=2&&s.add("low-cost"),t!=null&&t>=2e5&&s.add("long-context"),n.includes("vision")&&s.add("multimodal"),/个人|会员|订阅|聊天|kimi|豆包/.test(r)&&s.add("personal-use"),Array.from(s)}function _(e,a){if(!e||typeof e!="string")return e||a;try{return JSON.parse(e)}catch{return a}}function Ut(e){return e.five_hours_requests?"five_hours":e.weekly_requests?"weekly":e.monthly_requests?"monthly":e.token_limit?"token":e.credits_limit?"credits":"undisclosed"}function Nt(e){return e.last_verified_at?"verified":e.measured_monthly_tokens||e.measured_weekly_tokens?"measured":"pending"}function qe(e,a){let t=G(e.name,e.provider,e.notes,a.vendor,a.modelName).toLowerCase();return/聚合|路由|硅基|siliconflow/.test(t)?"aggregated_router":/会员|订阅|chat|清言|kimi|豆包/.test(t)?"personal_subscription":/maas|百炼|千帆|腾讯云|火山方舟|企业/.test(t)?"enterprise_maas":/开源|部署|私有化/.test(t)?"open_source_deploy":(/coding|qoder|claude code|cursor|trae/.test(t),"coding_plan")}function Dt(e,a){let t=c(e.monthly_currency).toUpperCase();if(t==="USD"||t==="CNY")return t;let n=c(e.provider,a.vendor),r=n.toLowerCase();if(r==="qoder"||r==="qoder cn"||r==="byteplus"||r==="z.ai")return"USD";let s=G(e.name,n,e.url,e.included_calls,e.notes).toLowerCase();return/\$|usd|美元|trae\.ai/.test(s)?"USD":"CNY"}function c(...e){let a=e.find(t=>t!=null&&String(t).trim());return a==null?"":String(a).trim()}function k(e){if(e==null||e==="")return null;let a=Number(e);return Number.isFinite(a)?a:null}function He(e,a){let t=k(e);return t==null?c(e,"\u5F85\u66F4\u65B0"):`${a==="USD"?"$":"\xA5"}${t.toLocaleString("zh-CN",{maximumFractionDigits:4})}/\u767E\u4E07 tokens`}function le(e,a="CNY"){return ie(e,a,"\u6708")}function ie(e,a="CNY",t="\u6708"){let n=k(e);return n==null?"\u8BF7\u4EE5\u5B98\u7F51\u4E3A\u51C6":`${a==="USD"?"$":"\xA5"}${n.toLocaleString("zh-CN",{maximumFractionDigits:2})}/${t}`}function Et(e){let a=k(e);return a==null?c(e,"\u8BF7\u4EE5\u5B98\u7F51\u4E3A\u51C6"):a>=1e6?`${(a/1e6).toLocaleString("zh-CN",{maximumFractionDigits:1})}M tokens`:a>=1e3?`${(a/1e3).toLocaleString("zh-CN",{maximumFractionDigits:0})}K tokens`:`${a.toLocaleString("zh-CN")} tokens`}function G(...e){return e.filter(a=>a!=null&&String(a).trim()).join(" ")}function Ft(e){return e.find(a=>a&&a!=="\u5F85\u66F4\u65B0")||"\u5F85\u66F4\u65B0"}export{Ae as a,Ot as b,tt as c,jt as d,E as e,Xt as f,_t as g,ia as h,ma as i};
