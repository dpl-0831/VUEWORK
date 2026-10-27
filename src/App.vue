<script setup>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>

<template>
  <!-- 使用 Element Plus 的布局容器 -->
  <el-container class="app-layout">
    <!-- 顶部：固定导航 -->
    <el-header class="app-header-wrapper" height="60px">
      <AppHeader />
    </el-header>

    <!-- 主体：路由出口 -->
    <el-main class="app-main-wrapper">
      <RouterView />
    </el-main>

    <!-- 底部：版权信息 -->
    <el-footer class="app-footer-wrapper" height="auto">
      <AppFooter
        github="https://github.com/你的用户名"
        email="你的邮箱@example.com"
        copyright="©2026 戴佩利 All rights reserved."
      />
    </el-footer>
  </el-container>
</template>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  background-color: #f4f6f9;
}


.app-layout {
  min-height: 100vh;
}

/* 顶部导航固定在页面上方 */
.app-header-wrapper {
  padding: 0;
  position: sticky;
  top: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

/* 主体内容：居中展示 */
.app-main-wrapper {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 30px 20px;
  min-height: calc(100vh - 60px - 100px); /* 预留上下空间 */
}

/* 底部 */
.app-footer-wrapper {
  padding: 0;
}
</style>