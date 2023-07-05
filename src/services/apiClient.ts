import axios, { CanceledError } from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ENDPOINT, // Main API base URL
});

// Add request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("comminq-token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Add the bearer token to the request header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { CanceledError };

export { apiClient };
