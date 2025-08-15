import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || "https://personal-finance-tracker-backend-rusc.onrender.com";

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData) => api.post("/api/auth/register", userData),
  login: (credentials) => api.post("/api/auth/login", credentials),
  getProfile: () => api.get("/api/auth/me"),
};

// Transactions API
export const transactionsAPI = {
  getAll: (params) => api.get("/api/transactions", { params }),
  create: (transaction) => api.post("/api/transactions", transaction),
  update: (id, transaction) => api.put(`/api/transactions/${id}`, transaction),
  delete: (id) => api.delete(`/api/transactions/${id}`),
  getCategories: () => api.get("/api/transactions/categories"),
};

// Reports API
export const reportsAPI = {
  getSummary: (params) => api.get("/api/reports/summary", { params }),
  getMonthly: (params) => api.get("/api/reports/monthly", { params }),
  getWeekly: (params) => api.get("/api/reports/weekly", { params }),
  getChartData: (params) => api.get("/api/reports/chart-data", { params }),
};

export default api;
