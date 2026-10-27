<script setup>
import { computed, watch } from 'vue'
import ProjectCard from './ProjectCard.vue'

// ---------- 接收父组件传来的数据 ----------
const props = defineProps({
  person: { type: Object, required: true },
  skills: { type: Array, required: true },
  showDetail: { type: Boolean, default: false },
  projects: { type: Array, required: true }
})

const emit = defineEmits(['toggle-detail'])

// ---------- 双向绑定：搜索关键词 ----------
const keyword = defineModel('keyword', {
  type: String,
  default: ''
})


// ---------- 计算属性 ----------
const filteredSkills = computed(() => {
  const key = keyword.value.trim().toLowerCase()
  if (!key) return props.skills
  return props.skills.filter(skill =>
    skill.name.toLowerCase().includes(key)
  )
})

// ---------- 监听 ----------
watch(keyword, (newVal, oldVal) => {
  console.log('搜索关键词变化：', oldVal, '->', newVal)
})
</script>

<template>
  <section class="card">
    <!-- 个人信息区 -->
    <div class="profile">
      <img :src="person.avatar" alt="个人头像" class="avatar">
      <h1>{{ person.name }}</h1>
      <p>{{ person.major }} · {{ person.class }}</p>
      <p class="intro-text">{{ person.intro }}</p>

      <button @click="emit('toggle-detail')">
        {{ showDetail ? '收起详情' : '展开详情' }}
      </button>

      <div v-if="showDetail" class="detail">
        {{ person.detail }}
      </div>
    </div>

    <!-- 技能区 -->
    <div class="skills">
      <input v-model.trim="keyword" placeholder="搜索技能，例如 Vue">
      <ul>
        <li v-for="skill in filteredSkills" :key="skill.id">
          {{ skill.name }} —— {{ skill.level }}
        </li>
      </ul>
      <p v-if="filteredSkills.length === 0">没有找到相关技能</p>
    </div>
    <!-- ============ 项目区 ============ -->
<section class="project-section">
  <h2 class="section-title">我的项目</h2>

  <div class="project-list">
    <ProjectCard
      v-for="p in projects"
      :key="p.id"
      :highlight="p.status === '进行中'"
    >
      <!-- 具名插槽 header：项目名称 -->
      <template #header>
        {{ p.name }}
      </template>

      <!-- 默认插槽：简介 + 技术标签 -->
      <p>{{ p.desc }}</p>
      <div class="tags">
        <span v-for="tag in p.tags" :key="tag" class="tag">
          {{ tag }}
        </span>
      </div>

      <!-- 具名插槽 footer：状态 -->
      <template #footer>
        <span>状态：{{ p.status }}</span>
        <span class="more">查看详情 →</span>
      </template>
    </ProjectCard>
  </div>
</section>
  </section>
</template>

<style scoped>
.card {
  width: 100%;
  max-width: 500px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.06);
  padding: 40px 30px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  word-break: break-word;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.1);
}

.profile { text-align: center; }

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 20px;
  border: 3px solid #f0f4f8;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

h1 {
  font-size: 28px;
  color: #2c3e50;
  margin-bottom: 8px;
  letter-spacing: 1px;
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
  font-size: 14.5px;
  text-align: justify;
}

button {
  background-color: #4a90e2;
  color: white;
  border: none;
  padding: 10px 24px;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  outline: none;
}

button:hover {
  background-color: #357abd;
  box-shadow: 0 4px 12px rgba(74, 144, 226, 0.3);
}

.detail {
  margin-top: 20px;
  padding: 15px;
  background-color: #f8fafc;
  border-radius: 10px;
  color: #64748b;
  font-size: 14px;
  line-height: 1.6;
  text-align: left;
  border-left: 4px solid #4a90e2;
}

.skills {
  margin-top: 30px;
  padding-top: 25px;
  border-top: 1px solid #e2e8f0;
}

.skills input {
  width: 100%;
  padding: 12px 20px;
  border: 1px solid #e2e8f0;
  border-radius: 25px;
  font-size: 14px;
  margin-bottom: 20px;
  outline: none;
  transition: border 0.3s;
}

.skills input:focus {
  border-color: #4a90e2;
}

.skills ul {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}

.skills li {
  background-color: #f0f4f8;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  color: #4a5568;
}

.skills p {
  color: #a0aec0;
  font-size: 14px;
  text-align: center;
}

/* ============ 项目区 ============ */
.project-section {
  margin-top: 35px;
  padding-top: 25px;
  border-top: 1px solid #e2e8f0;
}

.section-title {
  font-size: 18px;
  color: #2c3e50;
  margin-bottom: 18px;
  text-align: center;
}

.project-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
}

.tag {
  background: #eef2f7;
  color: #4a90e2;
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 12px;
}

.more {
  color: #4a90e2;
  cursor: pointer;
}

.more:hover {
  text-decoration: underline;
}
</style>