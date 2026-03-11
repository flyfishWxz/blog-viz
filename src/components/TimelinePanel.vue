<script setup>
import { computed } from 'vue'

const props = defineProps({
  posts: {
    type: Array,
    required: true
  }
})

const postsByYear = computed(() => {
  const grouped = {}
  props.posts.forEach(post => {
    const year = post.date.substring(0, 4)
    if (!grouped[year]) grouped[year] = []
    grouped[year].push(post)
  })
  
  // Sort years in descending order
  const sortedYears = Object.keys(grouped).sort((a, b) => b - a)
  const result = {}
  sortedYears.forEach(year => {
    result[year] = grouped[year].sort((a, b) => new Date(b.date) - new Date(a.date))
  })
  
  return result
})

const years = computed(() => Object.keys(postsByYear.value).sort((a, b) => b - a))

function formatDate(dateStr) {
  const date = new Date(dateStr)
  return `${date.getMonth() + 1}月${date.getDate()}日`
}
</script>

<template>
  <div class="panel">
    <h2 class="panel-title">
      <span class="icon">📅</span>
      文章时间线
    </h2>
    
    <div class="timeline">
      <div v-for="year in years" :key="year" class="timeline-year">
        <div class="timeline-year-label">{{ year }}年</div>
        
        <div 
          v-for="post in postsByYear[year]" 
          :key="post.date + post.title" 
          class="timeline-item"
        >
          <div class="date">{{ formatDate(post.date) }}</div>
          <div class="title">{{ post.title }}</div>
          <div class="views">👁️ {{ post.views.toLocaleString() }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.timeline {
  position: relative;
  padding-left: 2rem;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, #00d9ff, #ff006e, #8338ec);
  border-radius: 2px;
}

.timeline-year {
  margin-bottom: 2rem;
}

.timeline-year-label {
  font-size: 1rem;
  font-weight: 600;
  background: linear-gradient(135deg, #00d9ff 0%, #8338ec 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
}

.timeline-item {
  position: relative;
  padding: 1rem;
  margin-bottom: 0.75rem;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.timeline-item:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(0, 217, 255, 0.3);
  transform: translateX(8px);
}

.timeline-item::before {
  content: '';
  position: absolute;
  left: -2rem;
  top: 50%;
  transform: translateY(-50%);
  width: 10px;
  height: 10px;
  background: #00d9ff;
  border-radius: 50%;
  margin-left: -2.35rem;
  box-shadow: 0 0 15px rgba(0, 217, 255, 0.6);
}

.timeline-item .date {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 0.25rem;
}

.timeline-item .title {
  font-size: 0.95rem;
  font-weight: 500;
  color: #fff;
  line-height: 1.4;
}

.timeline-item .views {
  font-size: 0.75rem;
  color: #00d9ff;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}
</style>
