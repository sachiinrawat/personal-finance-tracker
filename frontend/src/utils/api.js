import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_URL ||
  "https://personal-finance-tracker-backend-rusc.onrender.com";

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
  register: (userData) => api.post("/auth/register", userData),
  login: (credentials) => api.post("/auth/login", credentials),
  getProfile: () => api.get("/auth/me"),
};

// Transactions API
export const transactionsAPI = {
  getAll: (params) => api.get("/transactions", { params }),
  create: (transaction) => api.post("/transactions", transaction),
  update: (id, transaction) => api.put(`/transactions/${id}`, transaction),
  delete: (id) => api.delete(`/transactions/${id}`),
  getCategories: () => api.get("/transactions/categories"),
};

// Reports API
export const reportsAPI = {
  getSummary: (params) => api.get("/reports/summary", { params }),
  getMonthly: (params) => api.get("/reports/monthly", { params }),
  getWeekly: (params) => api.get("/reports/weekly", { params }),
  getChartData: (params) => api.get("/reports/chart-data", { params }),
};

export default api;
