import { ElMessage } from 'element-plus'
import { localApi } from '@/utils/localApi'

// 免后端模式：接口改由浏览器本地数据层（localApi.js）实现，
// 不再请求 localhost，线上部署后功能正常可用。
// 保持与原 axios 拦截器一致的语义：成功返回响应体，失败统一提示并 reject。

function dispatch(method, url, body) {
  return localApi(method, url, body).then(null, (error) => {
    ElMessage.error('网络请求失败，请检查后端服务')
    return Promise.reject(error)
  })
}

export default {
  get: (url) => dispatch('GET', url),
  post: (url, body) => dispatch('POST', url, body),
  put: (url, body) => dispatch('PUT', url, body),
  delete: (url) => dispatch('DELETE', url)
}
