import { defineStore } from 'pinia'
import { ref } from 'vue'
import request from '@/utils/request'

export const useArticleStore = defineStore('article', () => {
  const articles = ref([])
  const loading = ref(false)

  // 获取所有文章
  async function fetchArticles() {
    loading.value = true
    try {
      const res = await request.get('/articles')
      articles.value = res.data
    } finally {
      loading.value = false
    }
  }

  // 新增文章，成功后刷新列表
  async function addArticle(data) {
    await request.post('/articles', data)
    await fetchArticles()
  }

  // 修改文章，成功后刷新列表
  async function updateArticle(id, data) {
    await request.put('/articles/' + id, data)
    await fetchArticles()
  }

  // 删除文章，成功后刷新列表
  async function deleteArticle(id) {
    await request.delete('/articles/' + id)
    await fetchArticles()
  }

  return { articles, loading, fetchArticles, addArticle, updateArticle, deleteArticle }
})