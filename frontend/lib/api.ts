import axios from 'axios';

// Determine the API URL based on environment
// In production/preview: Use /api which gets routed by ingress to backend:8001
// In local development: Use the backend URL directly
const getApiUrl = () => {
  // If we're in the browser
  if (typeof window !== 'undefined') {
    // Check if we're in production (not localhost)
    const isProduction = !window.location.hostname.includes('localhost') && 
                        !window.location.hostname.includes('127.0.0.1');
    
    if (isProduction) {
      // In production, use /api prefix (ingress will route to backend)
      return '/api';
    } else {
      // In local development, use direct backend URL
      return 'http://localhost:8001/api';
    }
  }
  
  // Server-side rendering - use env variable or default
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api';
};

const API_URL = getApiUrl();

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