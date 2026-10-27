import axios from 'axios';
import { ElMessage } from 'element-plus';

// 创建 axios 实例
const request = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 5000
});

// 响应拦截器
request.interceptors.response.use(
  // 成功：直接返回后端数据
  (response) => response.data,
  // 失败：统一提示并抛出错误
  (error) => {
    ElMessage.error('网络请求失败，请检查后端服务');
    return Promise.reject(error);
  }
);

export default request;
