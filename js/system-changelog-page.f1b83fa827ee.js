import{a as g}from"./chunk.EVWXKJNP.js";import{a as t}from"./chunk.XJPUQ4O3.js";var u={catalog:"\u5957\u9910\u4E0E\u54C1\u724C",data:"\u6570\u636E\u66F4\u65B0",feature:"\u7AD9\u70B9\u529F\u80FD"},m={in_progress:{label:"\u5F00\u53D1\u4E2D",cls:"progress"},planned:{label:"\u5DF2\u89C4\u5212",cls:"planned"},evaluating:{label:"\u8BC4\u4F30\u4E2D",cls:"evaluating"}},h=["in_progress","planned","evaluating"],$={monthly_price:"\u6708\u8D39",first_month_price:"\u9996\u6708\u4EF7",quarterly_price:"\u5B63\u8D39",yearly_price:"\u5E74\u8D39",annual_price:"\u6309\u5E74\u4EF7",monthly_currency:"\u5E01\u79CD",included_calls:"\u5305\u542B\u989D\u5EA6",token_limit:"Token \u4E0A\u9650",five_hours_requests:"5 \u5C0F\u65F6\u9650\u989D",weekly_requests:"\u6BCF\u5468\u9650\u989D",monthly_requests:"\u6BCF\u6708\u9650\u989D",benefits:"\u6743\u76CA",refund_policy:"\u9000\u6B3E\u653F\u7B56",billing_cycle:"\u8BA1\u8D39\u5468\u671F",credits_limit:"Credits \u4E0A\u9650",reset_rule:"\u91CD\u7F6E\u89C4\u5219",notes:"\u5907\u6CE8",url:"\u8D2D\u4E70\u94FE\u63A5",url_en:"\u8D2D\u4E70\u94FE\u63A5",sort_order:"\u6392\u5E8F",input_price:"\u8F93\u5165\u4EF7",output_price:"\u8F93\u51FA\u4EF7",cache_read_price:"\u7F13\u5B58\u8BFB\u4EF7",cache_write_price:"\u7F13\u5B58\u5199\u4EF7",currency:"\u5E01\u79CD",context_length:"\u4E0A\u4E0B\u6587\u957F\u5EA6",max_output:"\u6700\u5927\u8F93\u51FA",lifecycle_status:"\u751F\u547D\u5468\u671F\u72B6\u6001",release_date:"\u53D1\u5E03\u65E5\u671F"},o={count:document.getElementById("changelogEntryCount"),error:document.getElementById("changelogError"),list:document.getElementById("changelogList"),loading:document.getElementById("changelogLoading"),roadmapList:document.getElementById("roadmapList"),roadmapSection:document.getElementById("roadmapSection"),updatedAt:document.getElementById("changelogUpdatedAt")};function p(e){let a=/^(\d{4})-(\d{2})-(\d{2})$/.exec(String(e||""));return a?`${a[1]}.${a[2]}.${a[3]}`:"\u2014"}function f(e){return e==null||String(e).trim()===""?"\u2014":String(e)}function _(e){let a=e?.scope==="model",s=e?.action==="create",n=a?e?.model_name||e?.canonical_id||"":e?.plan_name||e?.plan_id||"",r=`${s?"\u65B0\u589E":"\u66F4\u65B0"}${a?"\u6A21\u578B":"\u5957\u9910"}`,l=e?.changes&&typeof e.changes=="object"?Object.entries(e.changes):[];return`
    <li class="changelog-diff-item">
      <div class="changelog-diff-head">
        <span class="changelog-diff-action changelog-diff-action--${s?"create":"update"}">${t(r)}</span>
        ${e?.provider?`<span class="changelog-diff-provider">${t(e.provider)}</span>`:""}
        <span class="changelog-diff-subject">${t(n)}</span>
      </div>
      ${l.length?`
      <dl class="changelog-diff-fields">
        ${l.map(([d,c])=>`
        <div class="changelog-diff-field">
          <dt>${t($[d]||d)}</dt>
          <dd><del>${t(f(c?.from))}</del><span class="changelog-diff-arrow" aria-hidden="true">\u2192</span><ins>${t(f(c?.to))}</ins></dd>
        </div>`).join("")}
      </dl>`:""}
    </li>`}function y(e){let a=Object.hasOwn(u,e?.kind)?e.kind:"data",s=String(e?.date||""),n=Array.isArray(e?.items)?e.items:[],r=Array.isArray(e?.change_items)?e.change_items:[];return`
    <article class="changelog-release" data-changelog-kind="${t(a)}">
      <div class="changelog-date">
        <time datetime="${t(s)}">${t(p(s))}</time>
        <span>${t(s.slice(0,4))}</span>
      </div>
      <div class="changelog-release-body">
        <div class="changelog-release-meta">
          <span>${t(e?.edition||p(s))}</span>
          <span class="changelog-kind changelog-kind--${t(a)}">${t(u[a])}</span>
        </div>
        <h3>${t(e?.title||"\u5185\u5BB9\u66F4\u65B0")}</h3>
        ${e?.summary?`<p class="changelog-release-summary">${t(e.summary)}</p>`:""}
        <ul>
          ${n.map(l=>`
            <li><span class="changelog-item-mark" aria-hidden="true"></span><span>${t(l)}</span></li>`).join("")}
        </ul>
        ${r.length?`
        <ul class="changelog-diff-list" aria-label="\u53D8\u66F4\u660E\u7EC6">
          ${r.map(_).join("")}
        </ul>`:""}
      </div>
    </article>`}function i(e,a){e&&(e.hidden=!a)}function v(e){let a=m[e?.status]||m.planned,s=Number(e?.votes)>0?Number(e.votes):0,n=Array.isArray(e?.users)?e.users.filter(Boolean):[],r=n.length?n.length>2?`${n[0]}\u3001${n[1]} \u7B49 ${n.length} \u4EBA`:n.join("\u3001"):"",l=[e?.platform?t(e.platform):"",r?t(r):"",e?.date?`${p(e.date)} \u63D0\u51FA`:""].filter(Boolean).join(" \xB7 ");return`
    <li class="roadmap-item roadmap-item--${a.cls}">
      <span class="roadmap-status">${a.label}</span>
      <div class="roadmap-body">
        <h3>${t(e?.title||"")}</h3>
        ${e?.note?`<p>${t(e.note)}</p>`:""}
        ${l?`<p class="roadmap-meta">${l}</p>`:""}
      </div>
      ${s?`<span class="roadmap-votes" title="\u7528\u6237\u8BC4\u8BBA\u63D0\u53CA\u6B21\u6570">${s} \u4EBA\u63D0\u53CA</span>`:""}
    </li>`}function b(e){let a=Array.isArray(e)?e.filter(n=>n&&n.title):[];if(!a.length||!o.roadmapList||!o.roadmapSection)return;let s=[...a].sort((n,r)=>{let l=d=>{let c=h.indexOf(d.status);return c===-1?h.length:c};return l(n)-l(r)||(Number(r.votes)||0)-(Number(n.votes)||0)});o.roadmapList.innerHTML=s.map(v).join(""),i(o.roadmapSection,!0)}function j(e){let a=Array.isArray(e?.entries)?[...e.entries].sort((n,r)=>String(r?.date||"").localeCompare(String(n?.date||""))):[],s=e?.last_updated||a[0]?.date||"";o.updatedAt.textContent=p(s),o.updatedAt.dateTime=s,o.count.textContent=a.length.toLocaleString("zh-CN"),o.list.innerHTML=a.length?a.map(y).join(""):'<div class="changelog-empty"><h3>\u8FD8\u6CA1\u6709\u516C\u5F00\u8BB0\u5F55</h3><p>\u540E\u53F0\u53D1\u5E03\u66F4\u65B0\u65E5\u5FD7\u540E\uFF0C\u4F1A\u81EA\u52A8\u663E\u793A\u5728\u8FD9\u91CC\u3002</p></div>',i(o.loading,!1),i(o.error,!1),i(o.list,!0)}async function A(){try{let e=await fetch("./changelog.json",{cache:"no-cache"});if(!e.ok)throw new Error("Changelog unavailable");j(await e.json())}catch{i(o.loading,!1),i(o.list,!1),i(o.error,!0)}}async function k(){try{let e=await fetch("./roadmap.json",{cache:"no-cache"});if(!e.ok)return;let a=await e.json();b(a?.items)}catch{}}g();A();k();
