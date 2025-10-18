import axios from 'axios';

// Use relative URL for API calls - this will work with the ingress routing
// In preview/production: /api routes to backend:8001
// In local dev: need to proxy or use full URL
const API_URL = typeof window !== 'undefined' 
  ? '/api'  // Browser - use relative URL (works with ingress)
  : process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api';  // Server-side

console.log('API_URL configured as:', API_URL);

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Auth API
export const authAPI = {
  register: (data: any) => api.post('/auth/register', data),
  login: (data: any) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/me'),
};

// Contact API
export const contactAPI = {
  submit: (data: any) => api.post('/contact', data),
};

// Quotes API
export const quotesAPI = {
  create: (data: any) => api.post('/quotes', data),
  getUserQuotes: () => api.get('/quotes/user'),
};

// Tickets API
export const ticketsAPI = {
  create: (data: any) => api.post('/tickets', data),
  getUserTickets: () => api.get('/tickets/user'),
};

// Services API
export const servicesAPI = {
  getAll: () => api.get('/services'),
};

// Reviews API
export const reviewsAPI = {
  getGoogleReviews: () => api.get('/reviews'),
};

// Projects API
export const projectsAPI = {
  getAll: () => api.get('/projects'),
};

export default api;