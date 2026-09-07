import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://vardha-project-2.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

export const contactService = {
  submit: async (data) => {
    const res = await api.post('/contact', data);
    return res.data;
  },
  getAll: async () => {
    const res = await api.get('/contact');
    return res.data;
  },
  updateStatus: async (id, status) => {
    const res = await api.patch(`/contact/${id}`, { status });
    return res.data;
  },
};

export const enquiryService = {
  submit: async (data) => {
    const res = await api.post('/enquiries', data);
    return res.data;
  },
  getAll: async () => {
    const res = await api.get('/enquiries');
    return res.data;
  },
  updateStatus: async (id, status) => {
    const res = await api.patch(`/enquiries/${id}`, { status });
    return res.data;
  },
};

export const authService = {
  login: async (credentials) => {
    const res = await api.post('/auth/admin/login', credentials);
    return res.data;
  },
  getProfile: async () => {
    const res = await api.get('/auth/admin/me');
    return res.data;
  },
  updateProfile: async (data) => {
    const res = await api.put('/auth/admin/me', data);
    return res.data;
  },
};

export const bookingService = {
  demoPayment: async (data) => {
    const res = await api.post('/bookings/demo-payment', data);
    return res.data;
  },
};

export const warehouseService = {
  getAll: async () => {
    const res = await api.get('/warehouses');
    return res.data;
  },
  getBySlug: async (slug) => {
    const res = await api.get(`/warehouses/${slug}`);
    return res.data;
  },
};

export default api;
