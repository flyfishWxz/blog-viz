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
    <h2 class="panel-title">📅 文章时间线</h2>
    
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
/* Timeline styles are in global style.css */
</style>
