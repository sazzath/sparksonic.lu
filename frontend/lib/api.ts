import axios from 'axios';

// Determine the API URL based on environment
// In production/preview: Use /api which gets routed by ingress to backend:8001
// In local development: Use the backend URL directly
const getApiUrl = () => {
  // If we're in the browser
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    
    // Check if we're in LOCAL development (localhost or 127.0.0.1)
    const isLocalDev = hostname.includes('localhost') || hostname.includes('127.0.0.1');
    
    if (isLocalDev) {
      // In local development, use direct backend URL
      return 'http://localhost:8001/api';
    } else {
      // In production/preview, use /api prefix (ingress will route to backend)
      return '/api';
    }
  }
  
  // Server-side rendering - use /api for production builds
  // This will be routed correctly by the ingress
  return '/api';
};

const API_URL = getApiUrl();

if (typeof window !== 'undefined') {
  console.log('API_URL configured as:', API_URL, 'for hostname:', window.location.hostname);
}

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