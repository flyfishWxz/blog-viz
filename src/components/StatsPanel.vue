<script setup>
import { computed, onMounted, ref } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  posts: {
    type: Array,
    required: true
  },
  totalViews: {
    type: Number,
    required: true
  }
})

const trendChartRef = ref(null)
const topPostsChartRef = ref(null)
const tagsChartRef = ref(null)

const postCount = computed(() => props.posts.length)

onMounted(() => {
  initTrendChart()
  initTopPostsChart()
  initTagsChart()
})

function initTrendChart() {
  if (!trendChartRef.value) return
  
  const chart = echarts.init(trendChartRef.value)
  
  // Group views by month
  const monthlyData = {}
  props.posts.forEach(post => {
    const month = post.date.substring(0, 7)
    monthlyData[month] = (monthlyData[month] || 0) + post.views
  })
  
  const sortedMonths = Object.keys(monthlyData).sort()
  const data = sortedMonths.map(m => monthlyData[m])
  
  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(18, 18, 26, 0.9)',
      borderColor: 'rgba(255, 255, 255, 0.1)',
      textStyle: { color: '#fff' }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: sortedMonths,
      axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.1)' } },
      axisLabel: { color: 'rgba(255, 255, 255, 0.5)' }
    },
    yAxis: {
      type: 'value',
      axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.1)' } },
      axisLabel: { color: 'rgba(255, 255, 255, 0.5)' },
      splitLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.05)' } }
    },
    series: [{
      name: '访问量',
      type: 'line',
      smooth: true,
      data: data,
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(0, 217, 255, 0.4)' },
          { offset: 1, color: 'rgba(0, 217, 255, 0.05)' }
        ])
      },
      lineStyle: { color: '#00d9ff' },
      itemStyle: { color: '#00d9ff' }
    }]
  }
  
  chart.setOption(option)
  window.addEventListener('resize', () => chart.resize())
}

function initTopPostsChart() {
  if (!topPostsChartRef.value) return
  
  const chart = echarts.init(topPostsChartRef.value)
  
  const topPosts = [...props.posts].sort((a, b) => b.views - a.views).slice(0, 10)
  const titles = topPosts.map(p => p.title.length > 18 ? p.title.substring(0, 18) + '...' : p.title)
  const views = topPosts.map(p => p.views)
  
  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: 'rgba(18, 18, 26, 0.9)',
      borderColor: 'rgba(255, 255, 255, 0.1)',
      textStyle: { color: '#fff' }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.1)' } },
      axisLabel: { color: 'rgba(255, 255, 255, 0.5)' },
      splitLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.05)' } }
    },
    yAxis: {
      type: 'category',
      data: titles.reverse(),
      axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.1)' } },
      axisLabel: { color: 'rgba(255, 255, 255, 0.7)' }
    },
    series: [{
      name: '访问量',
      type: 'bar',
      data: views.reverse(),
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
          { offset: 0, color: '#ff006e' },
          { offset: 1, color: '#ffbe0b' }
        ])
      },
      barWidth: '60%'
    }]
  }
  
  chart.setOption(option)
  window.addEventListener('resize', () => chart.resize())
}

function initTagsChart() {
  if (!tagsChartRef.value) return
  
  const chart = echarts.init(tagsChartRef.value)
  
  const tagCounts = {}
  props.posts.forEach(post => {
    ;(post.tags || []).forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + post.views
    })
  })
  
  const tags = Object.keys(tagCounts)
  const data = tags.map(tag => ({ name: tag, value: tagCounts[tag] }))
  
  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(18, 18, 26, 0.9)',
      borderColor: 'rgba(255, 255, 255, 0.1)',
      textStyle: { color: '#fff' }
    },
    series: [{
      name: '标签分布',
      type: 'pie',
      radius: ['45%', '70%'],
      center: ['50%', '50%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: 'rgba(10, 10, 15, 0.8)',
        borderWidth: 3
      },
      label: {
        show: false
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 14,
          fontWeight: 'bold',
          color: '#fff'
        }
      },
      labelLine: {
        show: false
      },
      data: data,
      color: ['#00d9ff', '#ff006e', '#8338ec', '#ffbe0b', '#4ecdc4', '#06d6a0', '#ef476f', '#ffd166']
    }]
  }
  
  chart.setOption(option)
  window.addEventListener('resize', () => chart.resize())
}
</script>

<template>
  <div class="panel">
    <h2 class="panel-title">
      <span class="icon">📊</span>
      访问统计
    </h2>
    
    <div class="stat-cards">
      <div class="stat-card">
        <div class="value">{{ totalViews.toLocaleString() }}</div>
        <div class="label">总访问量</div>
      </div>
      <div class="stat-card">
        <div class="value">{{ postCount }}</div>
        <div class="label">文章总数</div>
      </div>
      <div class="stat-card">
        <div class="value">{{ Math.round(totalViews / postCount) }}</div>
        <div class="label">平均访问</div>
      </div>
    </div>
    
    <div class="chart-container">
      <div ref="trendChartRef" style="width: 100%;%;"></div>
 height: 100    </div>
    
    <h3 class="chart-title">🔥 Top 10 热门文章</h3>
    <div class="chart-container chart-container-small">
      <div ref="topPostsChartRef" style="width: 100%; height: 100%;"></div>
    </div>
    
    <h3 class="chart-title">🏷️ 标签分布</h3>
    <div class="chart-container chart-container-small">
      <div ref="tagsChartRef" style="width: 100%; height: 100%;"></div>
    </div>
  </div>
</template>

<style scoped>
.chart-title {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-dim);
  margin: 1.25rem 0 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.chart-title::before {
  content: '';
  width: 3px;
  height: 14px;
  background: var(--accent);
  border-radius: 2px;
}
</style>
