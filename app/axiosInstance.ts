import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://dummyjson.com/',
});

axiosInstance.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
      config.headers['Content-Type'] = 'application/json';
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;
