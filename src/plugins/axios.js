// src/plugins/axios.js
import axios from 'axios';
import { useAuthStore } from '@/stores/apps/auth';
import { baseApiUrl } from '@/utils/api';
const api = axios.create({
  baseURL: baseApiUrl(),
  timeout: 10000,
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();
    if (authStore.isAuthenticated) {
      authStore.token = localStorage.getItem('token')
      config.headers.Authorization = `Bearer ${authStore.token}`;
    }
    return config;
  },
  (error) => {
    console.log(error.response.status);
    return Promise.reject(error);
  }
);

// Response Interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const authStore = useAuthStore();
    if (error.response.status === 401) {
      authStore.removeCredential();
    }
    return Promise.reject(error);
  }
);

export default api;
