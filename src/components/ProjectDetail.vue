<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useProjectStore } from '../stores/project'
import { ElMessage } from 'element-plus'

const route = useRoute()
const router = useRouter()
const projectStore = useProjectStore()
const { projects } = storeToRefs(projectStore)

const id = Number(route.params.id)
const project = computed(() => projects.value.find(p => p.id === id))

// 无效详情地址处理
if (!project.value) {
  ElMessage.warning('无效的项目 ID，将返回项目列表')
  router.replace({ name: 'project-list' })
}
</script>

<template>
  <el-card v-if="project" class="detail-card" shadow="hover">
    <template #header>
      <div class="detail-header">
        <el-icon :size="22"><FolderOpened /></el-icon>
        <span class="title">{{ project.name }}</span>
      </div>
    </template>

    <el-descriptions :column="1" border>
      <el-descriptions-item label="项目描述">
        {{ project.desc }}
      </el-descriptions-item>
      <el-descriptions-item label="项目状态">
        <el-tag :type="project.status === '进行中' ? 'warning' : 'success'" size="small">
          {{ project.status }}
        </el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="技术栈">
        <div class="tags">
          <el-tag
            v-for="tag in (project.tags || '').split(',').filter(Boolean)"
            :key="tag"
            size="small"
            type="info"
            class="tag"
          >
            {{ tag }}
          </el-tag>
        </div>
      </el-descriptions-item>
    </el-descriptions>

    <template #footer>
      <div class="footer-btns">
        <el-button @click="router.go(-1)">返回上一页</el-button>
        <el-button type="primary" @click="router.push({ name: 'project-list' })">
          返回项目列表
        </el-button>
      </div>
    </template>
  </el-card>
</template>

<style scoped>
.detail-card {
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
}
.detail-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
}
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.footer-btns {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>