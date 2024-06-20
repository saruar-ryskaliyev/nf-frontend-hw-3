import axios from 'axios';
import nookies from 'nookies';

const axiosInstance = axios.create({
  baseURL: 'https://spotify-backend-r80g.onrender.com/api',
  withCredentials: true, // Ensure cookies are sent with requests
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window === 'undefined') {
      const token = nookies.get({ req: (config as any).req }).accessToken;
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    } else {
      const token = nookies.get(null).accessToken;
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // console.error('Response error:', error.response);
    } else if (error.request) {
      // console.error('Request error:', error.request);
    } else {
      // console.error('Error message:', error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
