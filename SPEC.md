# 博客可视化网站规格说明

## 项目概述
- **项目名称**: 飞鱼博客统计站
- **类型**: 静态数据可视化网站
- **核心功能**: 展示博客文章的访问统计和时间线
- **目标用户**: 博客作者（老板）自己查看数据分析

## 技术栈
- **前端框架**: Vue 3 + Vite
- **图表库**: ECharts (功能强大，适合复杂可视化)
- **Markdown 解析**: gray-matter + marked
- **部署**: GitHub Pages

## 数据结构

### Markdown 文件格式 (posts/*.md)
```yaml
---
title: "文章标题"
date: "2024-01-15"
views: 1234
tags: ["Vue", "JavaScript"]
---
正文内容...
```

## 页面设计

### 首页 (/)
- 顶部：博客名称 + 简介
- 主体：两大可视化面板并排

### 可视化面板

#### 1. 访问统计 (左侧)
- 总访问量卡片
- 月度访问趋势折线图
- 最热门文章 Top 10 横向柱状图
- 标签分布饼图

#### 2. 文章时间线 (右侧)
- 时间轴展示所有文章
- 按月份/年份分组
- 悬停显示文章标题和访问量
- 点击可跳转（如有链接）

### 响应式布局
- 桌面端：双列并排
- 移动端：单列堆叠

## 视觉风格
- **主题**: 深色极简风
- **主色**: #1a1a2e (深蓝黑)
- **次色**: #16213e (深蓝)
- **强调色**: #e94560 (珊瑚红)
- **文字色**: #eaeaea (浅灰白)
- **字体**: "Noto Sans SC", sans-serif

## GitHub Pages 部署
- 使用 GitHub Actions 自动部署
- 构建输出: dist 目录
- 触发条件: push 到 main 分支

## 待实现功能
1. ✅ 项目初始化 (Vue + Vite)
2. ✅ Markdown 数据解析
3. ✅ 访问统计图表
4. ✅ 文章时间线
5. ✅ 响应式布局
6. ✅ GitHub Actions 部署配置

## 文件结构
```
blog-viz/
├── public/
│   └── posts/           # Markdown 文章目录
├── src/
│   ├── components/
│   │   ├── StatsPanel.vue
│   │   └── TimelinePanel.vue
│   ├── utils/
│   │   └── markdown.js
│   ├── App.vue
│   └── main.js
├── index.html
├── vite.config.js
├── package.json
└── .github/
    └── workflows/
        └── deploy.yml
```
