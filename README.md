# 飞鱼博客统计站 🐟

一个展示博客文章访问统计和时间线的可视化网站。

![Vue 3](https://img.shields.io/badge/Vue-3-green)
![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-blue)

## 功能特性

- 📊 访问量统计面板（总访问量、文章数、平均访问）
- 📈 月度访问趋势折线图
- 🔥 Top 10 热门文章排行
- 🏷️ 标签分布饼图
- 📅 文章发布时间线

## 快速开始

### 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 构建部署

```bash
# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 数据格式

在 `public/posts/` 目录下添加 Markdown 文件：

```yaml
---
title: "文章标题"
date: "2024-01-15"
views: 1234
tags: ["Vue", "JavaScript"]
---
正文内容...
```

## 部署到 GitHub Pages

1. 创建一个新的 GitHub 仓库
2. 将项目推送到仓库
3. 前往 Settings > Pages
4. Source 选择 "Deploy from a branch"
5. Branch 选择 "gh-pages" + "/(root)"
6. 保存后等待部署完成

或者使用 Actions 自动部署（已配置）。

## 自定义

- 修改 `vite.config.js` 中的 `base` 配置更改部署路径
- 修改 `src/style.css` 调整主题颜色

## License

MIT
