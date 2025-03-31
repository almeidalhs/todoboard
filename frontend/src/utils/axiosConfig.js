// src/utils/axiosConfig.js
import axios from "axios";

// 创建自定义 Axios 实例
const axiosInstance = axios.create({
  baseURL: "https://todoboard-backend.vercel.app/api/", // 你的后端 API 地址
  timeout: 10000, // 超时时间
});

// 请求拦截器：自动附加 Token 到请求头
axiosInstance.interceptors.request.use(
  (config) => {
    // 从 localStorage 读取 Token
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截器（可选）：处理 Token 刷新或错误
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token 失效时跳转登录页
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;