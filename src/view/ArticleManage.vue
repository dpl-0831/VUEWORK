<script setup>
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useArticleStore } from '../stores/article'
import { ElMessage } from 'element-plus'

const articleStore = useArticleStore()
const { articles } = storeToRefs(articleStore)

onMounted(() => {
  articleStore.fetchArticles()
})

const dialogVisible = ref(false)

// 当前编辑的文章 id，null 表示新增
const editingId = ref(null)

const formRef = ref(null)

const form = ref({ title: '', content: '' })

// 表单校验规则
const rules = {
  title: [{ required: true, message: '请输入文章标题', trigger: 'blur' }],
  content: [{ required: true, message: '请输入文章内容', trigger: 'blur' }]
}
// 打开新增对话框
function openDialog() {
  editingId.value = null
  form.value = { title: '', content: '' }
  dialogVisible.value = true
}
// 打开编辑对话框，填入该行数据
function openEditDialog(row) {
  editingId.value = row.id
  form.value = { title: row.title, content: row.content }
  dialogVisible.value = true
}
// 新增 / 修改提交
function submitForm() {
  formRef.value.validate(async (valid) => {
    if (valid) {
      const payload = {
        title: form.value.title,
        content: form.value.content
      }
      if (editingId.value !== null) {
        await articleStore.updateArticle(editingId.value, payload)
        ElMessage.success('文章修改成功！')
      } else {
        await articleStore.addArticle(payload)
        ElMessage.success('文章发布成功！')
      }
      dialogVisible.value = false
    }
  })
}
// 删除文章
function handleDelete(id) {
  articleStore.deleteArticle(id)
  ElMessage.success('删除成功')
}
</script>

<template>
  <el-card class="manage-card" shadow="hover">
    <template #header>
      <div class="manage-header">
        <span>📝 文章管理</span>
        <el-button type="primary" @click="openDialog">+ 发布新文章</el-button>
      </div>
    </template>

    <!-- 文章表格 -->
    <el-table :data="articles" stripe style="width: 100%">
      <el-table-column prop="title" label="标题" min-width="120" />
      <el-table-column prop="content" label="内容" show-overflow-tooltip />
      <el-table-column label="操作" width="160" align="center">
        <template #default="scope">
          <el-button type="primary" size="small" text @click="openEditDialog(scope.row)">编辑</el-button>
          <el-popconfirm
            title="确定删除这篇文章吗？"
            @confirm="handleDelete(scope.row.id)"
          >
            <template #reference>
              <el-button type="danger" size="small" text>删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <el-empty v-if="articles.length === 0" description="暂无数据" />

    <!-- 新增 / 编辑文章对话框 -->
    <el-dialog v-model="dialogVisible" :title="editingId !== null ? '编辑文章' : '发布新文章'" width="500px">
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="80px"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入文章标题" />
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input
            v-model="form.content"
            type="textarea"
            :rows="4"
            placeholder="请输入文章内容"
          />
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm">
          {{ editingId !== null ? '保存' : '发布' }}
        </el-button>
      </template>
    </el-dialog>
  </el-card>
</template>

<style scoped>
.manage-card {
  max-width: 700px;
  margin: 0 auto;
  width: 100%;
}
.manage-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  font-size: 16px;
  color: #2c3e50;
}
</style>
