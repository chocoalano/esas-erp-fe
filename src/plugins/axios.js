import axios from 'axios';
import { useAuthStore } from '@/stores/apps/auth';
import { baseApiUrl } from '@/utils/api';

// Create Axios instance
const api = axios.create({
  baseURL: baseApiUrl(),
  timeout: 10000,
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();
    if (authStore.isAuthenticated) {
      const token = localStorage.getItem('token') || authStore.token;

      if (token) {
        authStore.token = token; // Update token in the store if needed
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    console.error('Request Error:', error.message);
    return Promise.reject(error);
  }
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const authStore = useAuthStore();

    // Handle unauthorized error
    if (error.response?.status === 401) {
      console.warn('Unauthorized access detected. Removing credentials...');
      authStore.removeCredential();
    }
    if (error.response) {
      console.error(
        `Response Error: ${error.response.status} - ${error.response.statusText}`
      );
    } else {
      console.error('Response Error:', error.message);
    }

    return Promise.reject(error);
  }
);

export default api;
