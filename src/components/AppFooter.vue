<script setup>
defineProps({
  github: {
    type: String,
    default: 'https://github.com/mine-github'
  },
  email: {
    type: String,
    default: 'mine-email@example.com'
  },
  copyright: {
    type: String,
    default: '©2026 戴佩利 All rights reserved.'
  }
})
</script>

<template>
  <footer class="app-footer">
    <div class="footer-inner">
      <!-- 左边：GitHub、邮箱 -->
      <div class="footer-left">
        <a :href="github" target="_blank" rel="noopener">GitHub</a>
        <span class="divider">|</span>
        <a :href="`mailto:${email}`">邮箱</a>
      </div>
      
      <!-- 右边：版权 -->
      <div class="footer-right">
        {{ copyright }}
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* 外层：深色背景，横向铺满整个屏幕宽度 */
.app-footer {
  width: 100%;
  background-color: #2c3e50;
  color: #ffffff;
  padding: 24px 40px;
  box-sizing: border-box;
}

/* 内层：左右两栏布局，和 Header 一样的感觉 */
.footer-inner {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.footer-left a {
  color: #cbd5e1;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s ease;
}

.footer-left a:hover {
  color: #4a90e2;
  text-decoration: underline;
}

.divider {
  color: #64748b;
}

.footer-right {
  font-size: 13px;
  color: #94a3b8;
  letter-spacing: 0.5px;
}

.app-footer {
  position: fixed;          /* 固定在视口 */
  bottom: 0;                /* 贴着底部 */
  left: 0;
  width: 100%;              /* 横跨整个屏幕 */
  background-color: #2c3e50;
  color: #ffffff;
  padding: 20px 40px;
  box-sizing: border-box;
  z-index: 999;             /* 保证在最上层，不被内容遮挡 */
}
</style>