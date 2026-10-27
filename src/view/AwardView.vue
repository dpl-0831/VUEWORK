<script setup>
const awards = [
  {
    date: '2026-09',
    title: '三好学生',
    level: '校级荣誉',
    desc: '2025-2026 学年综合素质评定，获评校级三好学生。'
  },
  {
    date: '2026-09',
    title: '优秀学生二等奖学金',
    level: '校级二等奖',
    desc: '2025-2026 学年学业成绩优秀，获校级优秀学生二等奖学金。'
  },
  {
    date: '2026-06',
    title: '“挑战杯”中国大学生创业计划竞赛重庆市选拔赛',
    level: '省级三等奖',
    desc: '作品《红豆Redou——面向连续对话场景的大模型长期记忆解决方案》在第十五届“挑战杯”重庆市选拔赛中荣获三等奖。'
  },
  {
    date: '2026-03',
    title: '全国计算机等级考试二级',
    level: '国家级证书',
    desc: '参加2026年3月全国计算机等级考试二级 WPS Office 高级应用与设计考试，成绩良好，获得合格证书。'
  },
  {
    date: '2025-12',
    title: '全国大学英语四级考试（CET-4）',
    level: '国家级证书',
    desc: '参加2025年12月全国大学英语四级考试，总分435分，成绩合格。'
  },
  {
    date: '2025-11',
    title: '“一专一赛”物联网应用创新设计竞赛',
    level: '院级三等奖',
    desc: '在重庆工程学院“一专一赛”物联网应用创新设计竞赛中表现优异，荣获三等奖。'
  },
  {
    date: '2025-10',
    title: '优秀学生干部',
    level: '校级荣誉',
    desc: '2024-2025 学年担任班委，工作表现突出，获评优秀学生干部。'
  },
  {
    date: '2025-10',
    title: '三等优秀学生奖学金',
    level: '校级三等奖',
    desc: '2024-2025 学年学业成绩排名前列，获三等优秀学生奖学金。'
  },
  {
    date: '2025-06',
    title: '大学生数学建模竞赛',
    level: '校级优秀奖',
    desc: '在2025年重庆工程学院大学生数学建模竞赛中荣获优秀奖。'
  },
  {
    date: '2025-05',
    title: '第十五届“挑战杯”校赛',
    level: '校级一等奖',
    desc: '作品《红豆(Redou)——大模型记忆增强系统》在重庆工程学院第十五届“挑战杯”校赛中荣获一等奖。'
  },
  {
    date: '2025-05',
    title: '第十五届“挑战杯”校赛',
    level: '校级二等奖',
    desc: '作品《知几安全——大模型检索防护安全系统》在重庆工程学院第十五届“挑战杯”校赛中荣获二等奖。'
  },
  {
    date: '2025-05',
    title: '重庆市大学生健美操比赛',
    level: '省级第四名',
    desc: '在重庆市大学生健美操比赛中，荣获甲组啦啦操规定花球初级A套第四名。'
  },
  {
    date: '2024-09',
    title: '教学信息员',
    level: '校级聘书',
    desc: '被聘任为重庆工程学院教学信息员，聘期：2024年9月至2025年8月。'
  }
]
</script>

<template>
  <el-card class="award-card" shadow="hover">
    <template #header>
      <div class="award-header">
        <el-icon :size="22"><Trophy /></el-icon>
        <span>🏆 我的获奖与荣誉</span>
      </div>
    </template>

    <el-timeline>
      <el-timeline-item
        v-for="(item, index) in awards"
        :key="index"
        :timestamp="item.date"
        placement="top"
        type="success"
      >
        <el-card class="award-item" shadow="never">
          <div class="award-top">
            <span class="award-title">{{ item.title }}</span>
            <el-tag :type="item.level.includes('国家级') ? 'danger' : (item.level.includes('省级') ? 'warning' : 'success')" size="small" effect="light">
              {{ item.level }}
            </el-tag>
          </div>
          <p class="award-desc">{{ item.desc }}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </el-card>
</template>

<style scoped>
.award-card {
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
}
.award-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
}
.award-item {
  border-left: 3px solid #4a90e2;
}
.award-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}
.award-title {
  font-weight: 600;
  color: #2c3e50;
  font-size: 15px;
}
.award-desc {
  color: #64748b;
  font-size: 13px;
  line-height: 1.7;
}
</style>