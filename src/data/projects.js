import {ref } from 'vue'
export const projects = ref( [
  {
    id: 1,
    name: '大学生积分管理系统',
    desc: '面向高校学生综合素质积分的记录与管理平台，支持积分录入、查询与统计。',
    status: '已完成',
    tags: ['Vue3', 'Java', 'MySQL']
  },
  {
    id: 2,
    name: '智能仓库管理系统',
    desc: '面向中小型仓库的智能化管理系统，支持入库、出库、库存预警等功能。',
    status: '已完成',
    tags: ['Vue3', 'SpringBoot', 'MySQL']
  },
  {
    id: 3,
    name: '小兔鲜购物网站',
    desc: '仿电商平台的购物网站，包含商品列表、购物车、订单结算等核心模块。',
    status: '进行中',
    tags: ['Vue3', 'Vite', 'Pinia']
  }
])