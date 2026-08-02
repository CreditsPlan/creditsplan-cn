# CreditsPlan (CN Site)

**English | [中文](README.md)**

<p align="center">
  <a href="https://creditsplan.cn/"><img src="./logo.webp" alt="CreditsPlan Logo" width="120"></a>
</p>

<p align="center">
  <b>Domestic AI Coding Plan Comparison & Subscription Decision Platform</b>
</p>

<p align="center">
  <a href="https://creditsplan.cn/">Website</a> ·
  <a href="https://www.creditsplan.com/">International Site</a> ·
  <a href="https://creditsplan.cn/methodology.html">Methodology</a> ·
  <a href="https://creditsplan.cn/changelog.html">Changelog</a> ·
  <a href="https://creditsplan.cn/price-changes.xml">Price Changes RSS</a>
</p>

---

## Overview

CreditsPlan is a subscription decision platform for Chinese AI developers, providing structured, source-verified comparisons of domestic AI Coding plans across **price, quota, supported models, and local usage conditions**, with official source verification, price history, and change tracking.

This repository is the static site publish mirror for [creditsplan.cn](https://creditsplan.cn/). Issues for data corrections and suggestions are welcome.

## Data Highlights

- ✅ **Official Source Verified**: Every plan's price, quota, and purchase status is cross-checked against the vendor's official page with source links
- 🕒 **Last Verified Date**: Each record shows the verification date for transparency
-  **Price History Tracking**: Price changes are archived (`price-history.json`) and published via [RSS](https://creditsplan.cn/price-changes.xml)
- 🇳 **Domestic Usage Conditions**: CNY payment, invoice support, account requirements, and other information relevant to Chinese developers

## Core Pages

| Page | Description |
| --- | --- |
| [Plan Comparison](https://creditsplan.cn/) | Cross-brand AI Coding plan structured comparison table with filtering and export |
| [Brands](https://creditsplan.cn/brands/) | Verified brand index and brand detail pages |
| [Models](https://creditsplan.cn/model) | Domestic API model price comparison (input/output/cache pricing, context length, etc.) |
| [AI News](https://creditsplan.cn/news.html) | Market and pricing news |
| [Methodology](https://creditsplan.cn/methodology.html) | Data verification methods, update frequency, and correction channels |
| [Changelog](https://creditsplan.cn/changelog.html) | Data and price update records |

## Covered Brands

Currently includes: Tongyi Lingma / Alibaba Cloud Bailian, Qoder, Zhipu BigModel (GLM Coding), DeepSeek, Kimi (Moonshot), MiniMax, Baidu Qianfan, Tencent CodeBuddy, Byte Trae, Volcengine, StepFun, and more — continuously updated.

## Directory Structure

```
.
├── index.html              # Homepage: plan comparison table
├── brands/                 # Brand index and brand detail pages
├── plans/                  # Plan detail pages (static SEO pages)
├── news.html               # AI news
├── methodology.html        # Methodology
── changelog.html          # Changelog
├── data.json               # Core plan and model data
── changelog.json          # Changelog data
── price-history.json      # Price history data
── price-changes.xml       # Price changes RSS
├── sitemap.xml             # Sitemap
├── llms.txt                # LLM-friendly site description
├── js/                     # Frontend scripts (native ES Modules, no framework)
│   └── shared/             # Shared utility modules for brands, plans, models
└── assets/                 # Fonts and brand icon resources
```

## Tech Stack

- Pure static site: native HTML + ES Module JavaScript, no frontend framework
- Styling: Tailwind CSS (pre-compiled with content hashes)
- Data-driven: pages render from `data.json` and other JSON files
- Dark/light theme toggle

## Machine-Readable Data

- [`data.json`](https://creditsplan.cn/data.json): structured plan and model data
- [`price-history.json`](https://creditsplan.cn/price-history.json): price history
- [`sitemap.xml`](https://creditsplan.cn/sitemap.xml): all indexable pages
- [`price-changes.xml`](https://creditsplan.cn/price-changes.xml): price changes RSS
- [`llms.txt`](https://creditsplan.cn/llms.txt): LLM-friendly site description

## Copyright & License

- Pages and code: All Rights Reserved, for browsing, learning, and reference only. Unauthorized mirroring or competing sites are prohibited.
- Data files (`data.json` / `price-history.json` etc.): [CC BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/) — non-commercial attribution allowed, no commercial use or derivative works.
- See [LICENSE](./LICENSE); brand names and trademarks belong to their respective owners.

## Citation & Feedback

- When citing prices, please note the **plan name and verification date**, and state that the vendor's official site is authoritative.
- Data corrections / collaboration suggestions:
  - Submit a [GitHub Issue](https://github.com/CreditsPlan/creditsplan-cn/issues)
  - Email: feedback@creditsplan.cn

## Related Sites

- CN: [creditsplan.cn](https://creditsplan.cn/) (this repo, CNY settlement)
- International: [creditsplan.com](https://www.creditsplan.com/) (USD settlement plans)
