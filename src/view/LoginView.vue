<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '../stores/user'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const password = ref('')
const errorMsg = ref('')

function handleLogin() {
  if (password.value === '123456') {
    userStore.login('mock-token-2026') // 调用 Store 的 action，写入 token
    alert('登录成功！')
    // 跳回原来想去的页面，如果没有就跳首页
    router.replace(route.query.redirect || '/home')
  } else {
    errorMsg.value = '密码错误，请重新输入（提示：123456）'
  }
}
</script>

<template>
  <div class="card">
    <h2>🔐 管理员登录</h2>
    <p class="tip">您正在访问需要权限的页面，请先登录</p>

    <input
      v-model="password"
      type="password"
      placeholder="请输入管理密码"
      @keyup.enter="handleLogin"
    >

    <p v-if="errorMsg" class="error">{{ errorMsg }}</p>

    <button @click="handleLogin">登录</button>
  </div>
</template>

<style scoped>
.card {
  width: 100%; max-width: 400px; margin: 0 auto;
  background: #fff; padding: 40px; border-radius: 16px;
  text-align: center; box-shadow: 0 10px 40px rgba(0,0,0,0.06);
}
h2 { color: #2c3e50; margin-bottom: 10px; }
.tip { color: #64748b; font-size: 14px; margin-bottom: 25px; }
input {
  width: 100%; padding: 12px 16px; margin-bottom: 15px;
  border: 1px solid #e2e8f0; border-radius: 8px;
  font-size: 14px; outline: none; transition: border 0.3s;
}
input:focus { border-color: #4a90e2; }
.error { color: #e74c3c; font-size: 13px; margin-bottom: 15px; }
button {
  width: 100%; padding: 12px;
  background: #4a90e2; color: #fff;
  border: none; border-radius: 8px;
  font-size: 15px; cursor: pointer; transition: background 0.3s;
}
button:hover { background: #357abd; }
</style>