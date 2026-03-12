import axios from "axios";

// ✅ Create Axios instance
const axiosInstance = axios.create({
  baseURL: "/api", // 🔹 Backend API base URL
});

// ✅ Add request interceptor to add the JWT token to the headers
axiosInstance.interceptors.request.use(
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

// Optional: Add interceptors for request/response
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global errors here
    console.error("Axios error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
