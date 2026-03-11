import matter from 'gray-matter'
import { marked } from 'marked'

// For static site, we'll fetch markdown files from public/posts/
export async function parsePosts(postsDir = '/posts/') {
  // In production, this would fetch all .md files
  // For now, return sample data structure
  // The actual parsing would look like:
  
  /*
  const modules = import.meta.glob('/public/posts/*.md', { as: 'raw', eager: true })
  const posts = Object.entries(modules).map(([path, content]) => {
    const { data } = matter(content)
    return {
      title: data.title,
      date: data.date,
      views: data.views || 0,
      tags: data.tags || [],
      url: path.replace('/public', '')
    }
  })
  */
  
  // Return processed posts sorted by date
  // This is a placeholder - actual implementation depends on build setup
  
  return {
    posts: [],
    totalViews: 0
  }
}

export function processPostsData(postsData) {
  // Calculate statistics
  const totalViews = postsData.reduce((sum, post) => sum + (post.views || 0), 0)
  
  // Monthly views
  const monthlyViews = {}
  postsData.forEach(post => {
    const month = post.date.substring(0, 7) // YYYY-MM
    monthlyViews[month] = (monthlyViews[month] || 0) + post.views
  })
  
  // Top posts
  const topPosts = [...postsData].sort((a, b) => b.views - a.views).slice(0, 10)
  
  // Tag distribution
  const tagCounts = {}
  postsData.forEach(post => {
    ;(post.tags || []).forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + post.views
    })
  })
  
  return {
    totalViews,
    monthlyViews,
    topPosts,
    tagCounts,
    postsByYear: groupByYear(postsData)
  }
}

function groupByYear(posts) {
  const grouped = {}
  posts.forEach(post => {
    const year = post.date.substring(0, 4)
    if (!grouped[year]) grouped[year] = []
    grouped[year].push(post)
  })
  return grouped
}
