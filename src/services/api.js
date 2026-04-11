import axios from 'axios';

const api = axios.create({
  // Dynamically uses your .env.local file URL, with a smart fallback just in case!
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptor to inject token from localStorage
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Add interceptor to handle common errors
api.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response?.status === 401) {
    // Optional: auto logout or refresh token logic
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }
  return Promise.reject(error);
});

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/profile', data),
  getUserProfile: (username) => api.get(`/auth/dev/${username}`),
};

export const postsAPI = {
  getAllPublic: (username) => api.get('/posts/public', { params: { username } }),
  getUserPosts: (params) => api.get('/posts', { params: { author: 'me', ...params } }),
  getOne: (id) => api.get(`/posts/${id}`),
  create: (data) => api.post('/posts', data),
  update: (id, data) => api.put(`/posts/${id}`, data),
  delete: (id) => api.delete(`/posts/${id}`),
};

export default api;
