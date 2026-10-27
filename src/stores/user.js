import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  // 每次初始化都是空字符串
  const token = ref('')

  const isLoggedIn = computed(() => !!token.value)

  function login(newToken) {
    token.value = newToken
    // 刷新页面即失效
  }

  function logout() {
    token.value = ''
  }

  return { token, isLoggedIn, login, logout }
})