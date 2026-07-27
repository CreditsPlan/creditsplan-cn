# CreditsPlan（国内站）

<p align="center">
  <a href="https://creditsplan.cn/"><img src="./logo.webp" alt="CreditsPlan Logo" width="120"></a>
</p>

<p align="center">
  <b>国内 AI Coding 套餐对比与订阅决策平台</b>
</p>

<p align="center">
  <a href="https://creditsplan.cn/">官网</a> ·
  <a href="https://www.creditsplan.com/">国际站</a> ·
  <a href="https://creditsplan.cn/methodology.html">方法论</a> ·
  <a href="https://creditsplan.cn/changelog.html">更新日志</a> ·
  <a href="https://creditsplan.cn/price-changes.xml">价格变动 RSS</a>
</p>

---

## 项目简介

CreditsPlan 是面向中文 AI 开发者的订阅决策平台，对国产 AI Coding 套餐的**价格、额度、支持模型与国内使用条件**进行结构化、可溯源的对比，并提供官方来源核对、价格历史与变动追踪。

本仓库为 [creditsplan.cn](https://creditsplan.cn/) 的静态站点发布仓库，欢迎通过 Issue 反馈数据勘误与建议。

## 数据特点

- ✅ **官方来源核对**：每个套餐的价格、额度与购买状态均对照厂商官方页面核对，并附来源链接
- 🕒 **最近核对日期**：每条记录标注核对日期，透明可查
- 📈 **价格历史追踪**：价格变动会归档（`price-history.json`），并通过 [RSS](https://creditsplan.cn/price-changes.xml) 发布
- 🇨🇳 **国内使用条件**：标注人民币支付、发票支持、账号门槛等国内开发者关心的信息

## 核心页面

| 页面 | 说明 |
| --- | --- |
| [套餐对比](https://creditsplan.cn/) | 跨品牌的 AI Coding 套餐结构化对比表，支持筛选与导出 |
| [品牌](https://creditsplan.cn/brands/) | 已核对品牌一览及品牌详情页 |
| [模型](https://creditsplan.cn/model) | 国产大模型 API 价格对比（输入/输出/缓存价格、上下文长度等） |
| [AI 动态](https://creditsplan.cn/news.html) | 市场与价格相关资讯 |
| [方法论](https://creditsplan.cn/methodology.html) | 数据核对方式、更新频率与纠错渠道 |
| [更新日志](https://creditsplan.cn/changelog.html) | 数据与价格更新记录 |

## 收录范围

目前已收录品牌包括：通义灵码 / 阿里云百炼、Qoder、智谱 BigModel（GLM Coding）、DeepSeek、Kimi（月之暗面）、MiniMax、百度千帆、腾讯 CodeBuddy、字节 Trae、火山引擎、阶跃星辰等，持续更新中。

## 目录结构

```
.
├── index.html              # 首页：套餐对比表
├── brands/                 # 品牌页与各品牌详情页
├── plans/                  # 各套餐详情页（静态化 SEO 页面）
├── news.html               # AI 动态
├── methodology.html        # 方法论
├── changelog.html          # 更新日志
├── data.json               # 套餐与模型核心数据
├── changelog.json          # 更新日志数据
├── price-history.json      # 价格历史数据
├── price-changes.xml       # 价格变动 RSS
├── sitemap.xml             # 站点地图
├── llms.txt                # 面向 LLM 的站点说明
├── js/                     # 前端脚本（原生 ES Module，无框架）
│   └── shared/             # 品牌、套餐、模型等共享工具模块
└── assets/                 # 字体与品牌图标资源
```

## 技术栈

- 纯静态站点：原生 HTML + ES Module JavaScript，无前端框架
- 样式：Tailwind CSS（预编译产物，带内容哈希）
- 数据驱动：页面统一从 `data.json` 等 JSON 文件渲染
- 支持深色/浅色主题切换

## 机器可读数据

- [`data.json`](https://creditsplan.cn/data.json)：套餐与模型结构化数据
- [`price-history.json`](https://creditsplan.cn/price-history.json)：价格历史
- [`sitemap.xml`](https://creditsplan.cn/sitemap.xml)：全部可索引页面
- [`price-changes.xml`](https://creditsplan.cn/price-changes.xml)：价格变动 RSS
- [`llms.txt`](https://creditsplan.cn/llms.txt)：面向 LLM 的站点说明

## 版权与许可

- 页面与代码：保留所有权利（All Rights Reserved），仅供浏览、学习与参考，未经授权不得用于搭建镜像或竞品站点
- 数据文件（`data.json` / `price-history.json` 等）：采用 [CC BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/deed.zh) 许可，允许注明来源的非商业性引用，禁止商用与改作
- 详见 [LICENSE](./LICENSE)；品牌名称与商标归各自权利人所有

## 引用与反馈

- 引用价格时请注明**套餐名称与核对日期**，并说明以厂商官网为准
- 数据勘误 / 合作建议：
  - 提交 [GitHub Issue](https://github.com/CreditsPlan/creditsplan-cn/issues)
  - 邮箱：feedback@creditsplan.cn

## 相关站点

- 国内站：[creditsplan.cn](https://creditsplan.cn/)（本仓库，人民币结算套餐）
- 国际站：[creditsplan.com](https://www.creditsplan.com/)（海外套餐 / 美元结算）
