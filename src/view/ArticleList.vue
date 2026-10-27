<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useArticleStore } from '../stores/article'

const articleStore = useArticleStore()
const { articles, loading } = storeToRefs(articleStore)

onMounted(() => {
  articleStore.fetchArticles()
})
</script>

<template>
  <div class="article-wrapper" v-loading="loading">
    <el-card
      v-for="a in articles"
      :key="a.id"
      class="article-card"
      shadow="hover"
    >
      <template #header>
        <div class="article-header">
          <el-icon><Document /></el-icon>
          <span class="title">{{ a.title }}</span>
        </div>
      </template>
      <p class="content">{{ a.content }}</p>
    </el-card>

    <el-empty v-if="articles.length === 0" description="暂无数据" />
  </div>
</template>

<style scoped>
.article-wrapper {
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.article-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  color: #2c3e50;
}
.title {
  font-size: 16px;
}
.content {
  color: #64748b;
  font-size: 14px;
  line-height: 1.8;
}
</style>
