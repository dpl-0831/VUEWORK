<script setup>
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useProjectStore } from '../stores/project'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()
const projectStore = useProjectStore()
const { projects } = storeToRefs(projectStore)

onMounted(() => {
  projectStore.fetchProjects()
})

// 跳转详情
function goDetail(id) {
  router.push({ name: 'project-detail', params: { id } })
}

// ===== 项目编辑 =====
const dialogVisible = ref(false)
const editingId = ref(null)
const formRef = ref(null)
const form = ref({ name: '', desc: '', status: '进行中', tags: '' })

const rules = {
  name: [{ required: true, message: '请输入项目名称', trigger: 'blur' }]
}

// 打开编辑对话框，填入该行数据
function openEditDialog(p) {
  editingId.value = p.id
  form.value = {
    name: p.name,
    desc: p.desc || '',
    status: p.status || '进行中',
    tags: p.tags || ''
  }
  dialogVisible.value = true
}

// 提交修改
function submitEdit() {
  formRef.value.validate(async (valid) => {
    if (valid) {
      await projectStore.updateProject(editingId.value, { ...form.value })
      ElMessage.success('项目修改成功！')
      dialogVisible.value = false
    }
  })
}
</script>

<template>
  <div class="project-list">
    <el-card
      v-for="p in projects"
      :key="p.id"
      class="project-card"
      :class="{ highlight: p.status === '进行中' }"
      shadow="hover"
      @click="goDetail(p.id)"
    >
      <!-- 头部：项目名 + 删除按钮 -->
      <template #header>
        <div class="card-header">
          <span class="title">{{ p.name }}</span>
          <span class="header-actions">
            <el-button type="primary" size="small" text @click.stop="openEditDialog(p)">编辑</el-button>
            <el-popconfirm
              title="确定要删除这个项目吗？"
              @confirm="projectStore.deleteProject(p.id)"
            >
              <template #reference>
                <el-button type="danger" size="small" text @click.stop>删除</el-button>
              </template>
            </el-popconfirm>
          </span>
        </div>
      </template>

      <!-- 内容：描述 + 标签 -->
      <p class="desc">{{ p.desc }}</p>
      <div class="tags">
        <el-tag
          v-for="tag in (p.tags || '').split(',').filter(Boolean)"
          :key="tag"
          size="small"
          type="info"
          class="tag"
        >
          {{ tag }}
        </el-tag>
      </div>

      <!-- 底部：状态 + 详情 -->
      <template #footer>
        <div class="footer">
          <el-tag :type="p.status === '进行中' ? 'warning' : 'success'" size="small">
            {{ p.status }}
          </el-tag>
          <el-link type="primary" :underline="false">查看详情 →</el-link>
        </div>
      </template>
    </el-card>

    <el-empty v-if="projects.length === 0" description="暂无数据" />

    <!-- 编辑项目对话框 -->
    <el-dialog v-model="dialogVisible" title="编辑项目" width="500px" @click.stop>
      <el-form ref="formRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入项目名称" />
        </el-form-item>
        <el-form-item label="描述" prop="desc">
          <el-input v-model="form.desc" type="textarea" :rows="3" placeholder="请输入项目描述" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择状态">
            <el-option label="进行中" value="进行中" />
            <el-option label="已完成" value="已完成" />
            <el-option label="待开发" value="待开发" />
          </el-select>
        </el-form-item>
        <el-form-item label="标签" prop="tags">
          <el-input v-model="form.tags" placeholder="多个标签用英文逗号分隔，如 Vue3,Pinia" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitEdit">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.project-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.project-card {
  cursor: pointer;
}
.project-card.highlight {
  border: 1px solid #4a90e2;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.title {
  font-weight: 600;
  color: #2c3e50;
}
.header-actions {
  display: flex;
  align-items: center;
  gap: 4px;
}
.desc {
  color: #64748b;
  font-size: 14px;
  margin-bottom: 10px;
}
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
