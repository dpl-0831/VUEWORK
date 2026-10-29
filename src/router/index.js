import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'

// 注意：这里改成了 @/views/，并且修正了 ProjectDetail 的拼写
import HomeView from '@/view/HomeView.vue'
import ProjectsView from '@/view/ProjectsView.vue'
import ProjectList from '@/components/ProjectList.vue'
import ProjectDetail from '@/components/ProjectDetail.vue'
import AboutView from '@/view/AboutView.vue'
import NotFoundView from '@/view/NotFoundView.vue'
import EditProfileView from '@/view/EditProfileView.vue'
import LoginView from '@/view/LoginView.vue'
import ArticleList from '@/view/ArticleList.vue'
import ArticleManage from '@/view/ArticleManage.vue'
import AwardView from '@/view/AwardView.vue'

const routes = [
  { path: '/', redirect: '/home' },
  { 
    path: '/home', 
    name: 'home', 
    component: HomeView, 
    meta: { title: '首页' } 
  },
  { 
    path: '/about', 
    name: 'about', 
    component: AboutView, 
    meta: { title: '关于' } 
  },
  {
    path: '/awards',
    name: 'award',
    component: AwardView,
    meta: { title: '获奖经历' }
  },
  { path: '/articles',
    name: 'article-list', 
    component: ArticleList,
    meta: { title: '文章列表' } 
  },
  { 
    path: '/admin/articles', 
    name: 'admin-articles', 
    component: ArticleManage, 
    meta: { title: '文章管理', requiresAuth: true } 
  },
  {
    path: '/projects',
    component: ProjectsView,
    meta: { title: '项目中心' },
    children: [
      { 
        path: '', 
        name: 'project-list', 
        component: ProjectList, 
        meta: { title: '项目列表' } 
      },
      { 
        path: ':id', 
        name: 'project-detail', 
        component: ProjectDetail, 
        props: true, 
        meta: { title: '项目详情' } 
      }
    ]
  },
  // 新增：编辑页面
  { 
    path: '/edit', 
    name: 'edit-profile', 
    component: EditProfileView, 
    meta: { title: '编辑简介', requiresAuth: true } 
  },
  { 
    path: '/login', 
    name: 'login', 
    component: LoginView, 
    meta: { title: '登录' } 
  },
  { 
    path: '/:pathMatch(.*)*', 
    name: 'not-found', 
    component: NotFoundView, 
    meta: { title: '页面走丢了' } 
  }
]

const router = createRouter({
  // 使用 Vite 的 base（如 /VUEWORK/），保证子路径部署下路由前缀正确
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // 切换页面时自动回到顶部
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// 守卫：更新标题 + 权限控制
router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? `${to.meta.title} | 戴佩利的个人主页` : '戴佩利的个人主页'

  // ⚠️ 注意：Pinia Store 必须在守卫内部调用（确保 Pinia 已挂载）
  const userStore = useUserStore()

  // 权限判断：目标路由需要登录，且用户未登录
  if (to.meta.requiresAuth && !userStore.isLoggedIn) {
    // 跳转到登录页，并把当前路径存入 query.redirect，登录成功后可以跳回来
    next({ name: 'login', query: { redirect: to.fullPath } })
  } else {
    next()
  }
})

export default router