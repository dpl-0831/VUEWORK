import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProfileStore = defineStore('profile', () => {
  // 初始化时从 localStorage 读取
  const saved = localStorage.getItem('profile')
  const person = ref(saved ? JSON.parse(saved) : {
    avatar: 'https://pic1.zhimg.com/v2-6303b62324fc7ddb6e5163f3da9289e4_r.jpg',
    name: '戴佩利',
    major: '计算机科学与技术',
    class: '24计科1班',
    intro: '这是我的个人简介 249980404 戴佩利。',
    detail: '这里是详细内容。'
  })

  const skills = ref([
    { id: 1, name: 'Vue3', level: '学习中' },
    { id: 2, name: 'HTML/CSS', level: '熟练' },
    { id: 3, name: 'JavaScript', level: '较熟练' },
    { id: 4, name: 'Java', level: '了解' }
  ])

  // 修改并持久化
  function updateProfile(newIntro, newDetail) {
    person.value.intro = newIntro
    person.value.detail = newDetail
    localStorage.setItem('profile', JSON.stringify(person.value)) 
  }

  return { person, skills, updateProfile }
})