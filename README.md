# CreditsPlan CN Static

[creditsplan.cn](https://www.creditsplan.cn) 的生产静态部署包——面向中文开发者的 AI Coding 订阅套餐比较平台。

本仓库是 [creditsplan_cn](https://github.com/CreditsPlan/creditsplan-cn) 源码项目通过 `deploy/build-static-package.ps1` 构建生成的纯静态产物，不包含任何构建工具、Node.js 依赖或后端服务。

## 站点功能

- 主流 AI 编程工具套餐价格与额度对比（DeepSeek、通义百炼、火山引擎、智谱、Kimi、MiniMax、百度千帆、阶跃星辰、Trae、CodeBuddy 等）
- 品牌详情页与单套餐详情页（含 JSON-LD 结构化数据）
- AI 动态聚合与日报页面
- 价格变动 RSS 订阅（`price-changes.xml`）
- 深色/浅色主题切换
- 全站 SEO 优化（sitemap、OG/Twitter Cards、预渲染 HTML）

## 目录结构

```text
index.html                 # 首页：套餐对比表
news.html                  # AI 动态聚合页
changelog.html             # 站点更新日志
methodology.html           # 数据核验方法说明
data.json                  # 套餐数据快照（从数据库导出）
changelog.json             # 更新日志数据
price-changes.xml          # 价格变动 RSS
sitemap.xml                # XML Sitemap
robots.txt                 # 搜索引擎爬虫规则
logo.png / logo.webp       # 站点图标

js/                        # 原生 JavaScript 模块
  plans-page.js            # 套餐列表主逻辑
  plans-table.js           # 套餐表格渲染
  plans-detail.js          # 套餐详情面板
  plans-filters.js         # 筛选逻辑
  public-data.js           # 数据加载与标准化
  news-page.js             # AI 动态页面
  shared/brands.js         # 品牌注册表
  shared/outbound-tracker.js  # 访问与外链埋点

assets/icons/brands/       # 品牌图标资源
brands/                    # 预渲染品牌详情页（11 个品牌）
plans/                     # 预渲染套餐详情页（50+ 套餐）
```

## 技术栈

- HTML + 原生 JavaScript（无框架）
- Tailwind CSS（预编译产物，无需运行时构建）
- 数据源：生产环境读取同源 `data.json`；本地开发时通过 `/api/models` 代理读取后端

## 部署

本目录是纯静态文件，用任何 Web 服务器直接托管即可。Nginx 推荐配置见源码仓库的 `deploy/nginx.conf`，部署脚本见 `deploy/deploy.sh`。

基本步骤：

1. 将本目录整体上传到服务器（如 `/opt/creditsplan_cn_static`）
2. 配置 Nginx 指向该目录作为 `root`
3. AI 动态功能需要反代 `/aihot-api/` 到 `https://aihot.virxact.com/api/public/`
4. 配置 SSL 证书并重载 Nginx

### 本地预览

用任意静态文件服务器即可预览，例如：

```bash
npx serve .
# 或
python -m http.server 8080
```

访问 `http://localhost:8080`（或对应端口）。注意新闻页面依赖 `/aihot-api/` 代理，本地直接打开时该功能不可用。

## 数据来源

`data.json` 由 creditsplan_cn 后端从 MySQL 数据库导出，包含各品牌 AI 模型的定价、额度、上下文长度、能力标签和套餐信息。数据最后更新时间见文件内的 `last_updated` 字段。

## 相关项目

- [creditsplan_cn](https://github.com/CreditsPlan/creditsplan-cn) — 源码仓库（Spring Boot + 前端 + 构建脚本）
- [creditsplan.com](https://www.creditsplan.com) — 国际版

## 许可证

当前项目尚未选择开源许可证。在添加 `LICENSE` 之前，代码默认保留所有权利。
