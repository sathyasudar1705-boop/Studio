import axios from "axios";

// Base API instance
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // optional (cookies use panna)
});

// ===============================
// REQUEST INTERCEPTOR
// ===============================
API.interceptors.request.use(
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

// ===============================
// RESPONSE INTERCEPTOR
// ===============================
API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors globally

    if (error.response) {
      const status = error.response.status;

      // Unauthorized → token invalid/expired
      if (status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }

      // Forbidden
      if (status === 403) {
        console.log("Access denied");
      }

      // Server error
      if (status >= 500) {
        console.log("Server error. Try again later.");
      }
    } else {
      console.log("Network error");
    }

    return Promise.reject(error);
  }
);

// ===============================
// HELPER FUNCTIONS (optional)
// ===============================

// Save token
export const setToken = (token) => {
  localStorage.setItem("token", token);
};

// Get token
export const getToken = () => {
  return localStorage.getItem("token");
};

// Remove token (logout)
export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};

export default API;