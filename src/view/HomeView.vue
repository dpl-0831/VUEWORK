<script setup>
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useProfileStore } from '../stores/profile'

const profileStore = useProfileStore()
const { person, skills } = storeToRefs(profileStore)

const showDetail = ref(false)
const keyword = ref('')

const filteredSkills = computed(() => {
  const key = keyword.value.trim().toLowerCase()
  if (!key) return skills.value
  return skills.value.filter(skill => skill.name.toLowerCase().includes(key))
})

//  时间线数据
const timeline = [
  { time: '2024-09', content: '进入重庆工程学院，就读计算机科学与技术专业' },
  { time: '2024-09', content: '任职校级教学信息员，负责教学信息反馈工作' },
  { time: '2025-06', content: '完成 HTML / CSS / JavaScript 基础学习' },
  { time: '2026-03', content: '学习 Vue3 框架，完成个人主页项目开发' },
  { time: '2026-09', content: '任职院级礼仪团负责人，负责组织学院礼仪活动' },
  { time: '2026-10', content: '学习 Pinia 状态管理与 Element Plus 组件库' }
]
</script>

<template>
  <el-card class="card" shadow="hover">
    <!-- 个人信息区 -->
    <div class="profile">
      <el-avatar :size="120" :src="person.avatar" class="avatar" />
      <h1>{{ person.name }}</h1>
      <p>{{ person.major }} · {{ person.class }}</p>
      <p class="intro-text">{{ person.intro }}</p>

      <el-button type="primary" @click="showDetail = !showDetail">
        {{ showDetail ? '收起详情' : '展开详情' }}
      </el-button>

      <el-alert
        v-if="showDetail"
        :title="person.detail"
        type="info"
        :closable="false"
        class="detail"
      />
    </div>

    <!-- 技能区 -->
    <el-divider />

    <div class="skills">
      <el-input
        v-model.trim="keyword"
        placeholder="搜索技能，例如 Vue"
        clearable
        class="skill-input"
      />

      <div class="skill-tags">
        <el-tag
          v-for="skill in filteredSkills"
          :key="skill.id"
          type="primary"
          effect="plain"
          size="large"
          class="skill-tag"
        >
          {{ skill.name }} —— {{ skill.level }}
        </el-tag>
      </div>

      <el-empty
        v-if="filteredSkills.length === 0"
        description="没有找到相关技能"
        :image-size="80"
      />
    </div>

    <!-- 🌟 时间线 -->
    <el-divider />
    <h3 class="timeline-title">📅 我的成长时间线</h3>
    <el-timeline>
      <el-timeline-item
        v-for="(item, index) in timeline"
        :key="index"
        :timestamp="item.time"
        placement="top"
        type="primary"
      >
        {{ item.content }}
      </el-timeline-item>
    </el-timeline>
  </el-card>
</template>

<style scoped>
.card {
  width: 100%;
  max-width: 500px;
}
.profile { text-align: center; }
.avatar {
  margin-bottom: 20px;
  border: 3px solid #f0f4f8;
}
h1 {
  font-size: 28px;
  color: #2c3e50;
  margin-bottom: 8px;
}
.profile p {
  font-size: 15px;
  color: #6c7a89;
  margin-bottom: 8px;
}
.intro-text {
  color: #95a5a6;
  line-height: 1.8;
  margin-top: 15px;
  margin-bottom: 25px;
}
.detail {
  margin-top: 20px;
  text-align: left;
}
.skills { padding-top: 5px; }
.skill-input { margin-bottom: 20px; }
.skill-tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}
.timeline-title {
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 16px;
}
</style>