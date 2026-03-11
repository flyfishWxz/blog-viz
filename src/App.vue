<script setup>
import { ref, onMounted } from 'vue'
import StatsPanel from './components/StatsPanel.vue'
import TimelinePanel from './components/TimelinePanel.vue'
import { parsePosts } from './utils/markdown'

const posts = ref([])
const totalViews = ref(0)
const loading = ref(true)

onMounted(async () => {
  try {
    const data = await parsePosts('/posts/')
    posts.value = data.posts
    totalViews.value = data.totalViews
  } catch (e) {
    console.error('Failed to load posts:', e)
    // Use sample data for demo
    posts.value = [
      { title: 'Vue3 响应式原理深入解析', date: '2024-12-15', views: 3250, tags: ['Vue', 'JavaScript'] },
      { title: '从零构建博客网站', date: '2024-11-20', views: 2890, tags: ['Tutorial'] },
      { title: 'TypeScript 高级类型实战', date: '2024-10-08', views: 2150, tags: ['TypeScript'] },
      { title: 'Node.js 性能优化指南', date: '2024-09-22', views: 1980, tags: ['Node.js'] },
      { title: 'CSS Grid 布局完全指南', date: '2024-08-14', views: 3420, tags: ['CSS'] },
      { title: 'React vs Vue: 深度对比', date: '2024-07-30', views: 4100, tags: ['React', 'Vue'] },
      { title: 'GraphQL 入门与实践', date: '2024-06-18', views: 1560, tags: ['GraphQL'] },
      { title: 'Docker 容器化部署', date: '2024-05-25', views: 2230, tags: ['DevOps'] },
      { title: 'RESTful API 设计原则', date: '2024-04-12', views: 1890, tags: ['API'] },
      { title: 'JavaScript 异步编程', date: '2024-03-05', views: 2780, tags: ['JavaScript'] },
      { title: 'Git 高级操作技巧', date: '2024-02-18', views: 1650, tags: ['Git'] },
      { title: 'Web 安全实战指南', date: '2024-01-10', views: 2340, tags: ['Security'] },
    ]
    totalViews.value = posts.value.reduce((sum, p) => sum + p.views, 0)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div id="app">
    <header>
      <h1>🐟 飞鱼博客统计站</h1>
      <p>记录每一篇文字，追踪每一次阅读</p>
    </header>

    <main v-if="!loading">
      <StatsPanel :posts="posts" :totalViews="totalViews" />
      <TimelinePanel :posts="posts" />
    </main>

    <div v-else class="loading">
      <p>加载中...</p>
    </div>

    <footer>
      <p>Powered by Vue 3 + ECharts | Deployed on GitHub Pages</p>
    </footer>
  </div>
</template>

<style scoped>
.loading {
  text-align: center;
  padding: 4rem;
  color: var(--text-dim);
}
</style>
