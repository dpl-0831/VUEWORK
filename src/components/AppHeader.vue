<script setup>
const navs = [
  { path: '/home', label: '首页' },
  { path: '/projects', label: '项目' },
  { path: '/awards', label: '奖项' },
  { path: '/articles', label: '文章列表' },
  { path: '/admin/articles', label: '文章管理' },
  { path: '/about', label: '关于' }
]
</script>

<template>
  <header class="app-header">
    <div class="header-left">
      <RouterLink to="/home" class="name-link">
        {{ '戴佩利|前端开发工程师' }}
      </RouterLink>
    </div>

    <el-menu
      :default-active="$route.path"
      mode="horizontal"
      router
      class="header-nav"
      :ellipsis="false"
    >
      <el-menu-item v-for="item in navs" :key="item.path" :index="item.path">
        {{ item.label }}
      </el-menu-item>
    </el-menu>

    <div class="header-right"></div>
  </header>
</template>

<style scoped>
.app-header {
  position: fixed;
  top: 0; left: 0; width: 100%; height: 64px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
}

/* 左侧名字样式 */
.name-link {
  text-decoration: none;   /* 🌟 去掉下划线 */
  font-size: 20px;
  font-weight: 600;
  color: #2c3e50;          /* 🌟 改成深灰蓝色 */
  letter-spacing: 1px;
  transition: color 0.3s;
}
.name-link:hover {
  color: #4a90e2;
}

/* 导航布局 */
.header-nav {
  flex: 1;
  justify-content: center;
  border-bottom: none;
}
</style>

<style scoped>
.app-header {
  position: fixed;
  top: 0; left: 0; width: 100%; height: 64px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
}

/* 左侧名字样式 */
.name-link {
  text-decoration: none;
  font-size: 20px;
  font-weight: 600;
  color: #2c3e50;
  letter-spacing: 1px;
  transition: color 0.3s;
}
.name-link:hover {
  color: #4a90e2;
}

/* 导航布局 */
.header-nav {
  flex: 1;
  justify-content: center;
  border-bottom: none;
}
</style>