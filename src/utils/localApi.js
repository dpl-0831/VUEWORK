// ============================================================
// 免后端数据层：REST 接口的浏览器端实现
// 数据 = 种子数据（导出自本机 MySQL 的 my_homepage 库）+ localStorage 持久化
// 路径与响应包络 { code, message, data } 与 server.js 保持一致
// 说明：增删改结果仅保存在当前浏览器，清缓存后回到种子数据
// ============================================================

const SEED_ARTICLES = [
  { id: 8, title: '接口测试新增', content: '这是一篇用来演示增删改查的文章', created_at: '2026-10-23T02:45:41.000Z' },
  { id: 6, title: '我的学习规划', content: '111222333', created_at: '2026-10-23T01:05:42.000Z' },
  { id: 2, title: 'Vue3 入门指南', content: '从响应式、组合式 API 到组件化开发，带你快速上手 Vue3。', created_at: '2026-10-23T00:40:42.000Z' },
  { id: 3, title: 'MySQL 使用笔记', content: '记录数据库日常开发中常用的建表、查询与优化技巧。', created_at: '2026-10-23T00:40:42.000Z' }
]

const SEED_PROJECTS = [
  { id: 1, name: '个人主页', desc: '基于 Vue3 + Vite 的个人主页项目，包含博客与作品展示。', status: '进行中', tags: 'Vue3,TypeScript,Vite' },
  { id: 2, name: '博客管理系统', desc: '支持 Markdown 编辑、文章分类与标签管理的内容平台。', status: '已完成', tags: 'Vue3,Node.js,MySQL' },
  { id: 3, name: '待办清单', desc: '一个简单易用的待办事项应用，支持本地持久化。', status: '待开发', tags: 'Vue3,Pinia' }
]

const KEY_ARTICLES = 'my_homepage_articles_v1'
const KEY_PROJECTS = 'my_homepage_projects_v1'

// 读取列表：优先 localStorage，缺失或损坏时回退种子数据（深拷贝，避免污染种子）
function readList(key, seed) {
  try {
    const raw = localStorage.getItem(key)
    if (raw) return JSON.parse(raw)
  } catch (_) { /* 忽略：隐私模式或数据损坏 */ }
  return JSON.parse(JSON.stringify(seed))
}

function writeList(key, list) {
  try {
    localStorage.setItem(key, JSON.stringify(list))
  } catch (_) { /* 忽略：隐私模式下仅本次会话内生效 */ }
}

// 构造与 axios 相近的错误对象，带上 response 包络
function apiError(status, message) {
  const err = new Error(message)
  err.response = { status, data: { code: status, message, data: null } }
  return err
}

const ok = (data, message = '操作成功', code = 200) => ({ code, message, data })
const nextId = (list) => list.reduce((m, x) => Math.max(m, Number(x.id) || 0), 0) + 1
const normalizeId = (raw) => {
  const id = Number(raw)
  return Number.isInteger(id) && id > 0 ? id : null
}
const normTags = (tags) => (Array.isArray(tags) ? tags.join(',') : tags || '')

// 与 server.js 对应的路由分发
function route(method, url, body) {
  const parts = url.replace(/^\//, '').split('/').filter(Boolean)
  const [resource, idPart] = parts
  const hasId = idPart !== undefined
  const id = hasId ? normalizeId(idPart) : null

  if (resource === 'articles') {
    const list = readList(KEY_ARTICLES, SEED_ARTICLES)
    if (method === 'GET' && !hasId) {
      const sorted = [...list].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      return ok(sorted, sorted.length > 0 ? '查询成功' : '暂无数据')
    }
    if (method === 'POST' && !hasId) {
      const { title, content } = body || {}
      if (!title || !content) throw apiError(400, '标题和内容不能为空')
      const item = { id: nextId(list), title, content, created_at: new Date().toISOString() }
      list.push(item)
      writeList(KEY_ARTICLES, list)
      return ok({ id: item.id, title, content }, '创建成功', 201)
    }
    if (method === 'PUT' && hasId) {
      if (id === null) throw apiError(400, '无效的文章 ID')
      const item = list.find((x) => x.id === id)
      if (!item) throw apiError(404, '文章不存在')
      const { title, content } = body || {}
      if (!title || !content) throw apiError(400, '标题和内容不能为空')
      item.title = title
      item.content = content
      writeList(KEY_ARTICLES, list)
      return ok({ id, title, content }, '更新成功')
    }
    if (method === 'DELETE' && hasId) {
      if (id === null) throw apiError(400, '无效的文章 ID')
      const idx = list.findIndex((x) => x.id === id)
      if (idx === -1) throw apiError(404, '文章不存在')
      list.splice(idx, 1)
      writeList(KEY_ARTICLES, list)
      return ok(null, '删除成功')
    }
  }

  if (resource === 'projects') {
    const list = readList(KEY_PROJECTS, SEED_PROJECTS)
    if (method === 'GET' && !hasId) {
      return ok(list, list.length > 0 ? '查询成功' : '暂无数据')
    }
    if (method === 'POST' && !hasId) {
      const { name, desc, status, tags } = body || {}
      if (!name) throw apiError(400, '项目名称不能为空')
      const item = { id: nextId(list), name, desc: desc || '', status: status || '进行中', tags: normTags(tags) }
      list.push(item)
      writeList(KEY_PROJECTS, list)
      return ok(item, '创建成功', 201)
    }
    if (method === 'PUT' && hasId) {
      if (id === null) throw apiError(400, '无效的项目 ID')
      const item = list.find((x) => x.id === id)
      if (!item) throw apiError(404, '项目不存在')
      const { name, desc, status, tags } = body || {}
      if (!name) throw apiError(400, '项目名称不能为空')
      Object.assign(item, { name, desc: desc || '', status: status || '进行中', tags: normTags(tags) })
      writeList(KEY_PROJECTS, list)
      return ok({ ...item }, '更新成功')
    }
    if (method === 'DELETE' && hasId) {
      if (id === null) throw apiError(400, '无效的项目 ID')
      const idx = list.findIndex((x) => x.id === id)
      if (idx === -1) throw apiError(404, '项目不存在')
      list.splice(idx, 1)
      writeList(KEY_PROJECTS, list)
      return ok(null, '删除成功')
    }
  }

  throw apiError(404, '接口不存在')
}

// 统一入口：返回 Promise，结构与原 axios 实例调用方式一致
export function localApi(method, url, body) {
  return new Promise((resolve, reject) => {
    // 模拟网络异步，保留 loading 状态的展示时机
    setTimeout(() => {
      try {
        resolve(route(method, url, body))
      } catch (err) {
        reject(err)
      }
    }, 60)
  })
}
