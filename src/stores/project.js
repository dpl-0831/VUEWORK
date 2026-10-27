import { defineStore } from 'pinia'
import { ref } from 'vue'
import request from '@/utils/request'

export const useProjectStore = defineStore('project', () => {
  const projects = ref([])
  const loading = ref(false)

  // 获取所有项目
  async function fetchProjects() {
    loading.value = true
    try {
      projects.value = (await request.get('/projects')).data
    } finally {
      loading.value = false
    }
  }
  

  // 新增项目，成功后刷新列表
  async function addProject(data) {
    await request.post('/projects', data)
    await fetchProjects()
  }

  // 修改项目，成功后刷新列表
  async function updateProject(id, data) {
    await request.put('/projects/' + id, data)
    await fetchProjects()
  }

  // 删除项目，成功后刷新列表
  async function deleteProject(id) {
    await request.delete('/projects/' + id)
    await fetchProjects()
  }

  return { projects, loading, fetchProjects, addProject, updateProject, deleteProject }
})