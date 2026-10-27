<script setup>
</script>

<template>
  <el-card class="about-card" shadow="hover">
    <template #header>
      <div class="about-header">
        <el-icon :size="22"><User /></el-icon>
        <span>关于我</span>
      </div>
    </template>

    <el-descriptions :column="1" border>
      <el-descriptions-item label="姓名">戴佩利</el-descriptions-item>
      <el-descriptions-item label="学号">249980404</el-descriptions-item>
      <el-descriptions-item label="专业">计算机科学与技术</el-descriptions-item>
      <el-descriptions-item label="班级">24 计科 1 班</el-descriptions-item>
      <el-descriptions-item label="方向">前端开发</el-descriptions-item>
    </el-descriptions>

    <el-divider />

    <p class="intro">
      我是戴佩利，一名计算机科学与技术专业的学生。
      热爱前端开发，正在努力学习 Vue3 和 Java 全栈技术。
    </p>

    <div class="contact">
      <el-tag type="primary" effect="plain" size="large">
        <el-icon><Message /></el-icon> mine-email@example.com
      </el-tag>
    </div>
  </el-card>
</template>

<style scoped>
.about-card {
  max-width: 500px;
  margin: 0 auto;
  width: 100%;
}
.about-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
}
.intro {
  color: #64748b;
  line-height: 1.9;
  font-size: 14px;
}
.contact {
  margin-top: 20px;
  text-align: center;
}
</style>