<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useProfileStore } from '../stores/profile'
import { ElMessage } from 'element-plus'

const router = useRouter()
const profileStore = useProfileStore()

// 用局部副本编辑，避免直接修改 Store
const form = ref({
  intro: profileStore.person.intro,
  detail: profileStore.person.detail
})

function save() {
  profileStore.updateProfile(form.value.intro, form.value.detail)
  ElMessage.success('保存成功，正在返回首页...')
  setTimeout(() => router.push('/home'), 800)
}

function cancel() {
  router.push('/home')
}
</script>

<template>
  <el-card class="edit-card" shadow="hover">
    <template #header>
      <div class="edit-header">
        <el-icon :size="22"><EditPen /></el-icon>
        <span>编辑个人简介</span>
      </div>
    </template>

    <el-form label-width="80px">
      <el-form-item label="个人简介">
        <el-input
          v-model="form.intro"
          type="textarea"
          :rows="3"
          placeholder="请输入个人简介"
        />
      </el-form-item>

      <el-form-item label="详细内容">
        <el-input
          v-model="form.detail"
          type="textarea"
          :rows="5"
          placeholder="请输入详细内容"
        />
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="footer-btns">
        <el-button @click="cancel">取消修改</el-button>
        <el-button type="primary" @click="save">保存修改</el-button>
      </div>
    </template>
  </el-card>
</template>

<style scoped>
.edit-card {
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
}
.edit-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
}
.footer-btns {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>