import axios, { CanceledError } from "axios";
import { useRouter } from "next/navigation";
// import Cookies from "js-cookie";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ENDPOINT, // Main API base URL
  // withCredentials: true,
});

apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = localStorage.getItem("token");

      if (token !== undefined)
        config.headers["Authorization"] = `Bearer ${token}`;

      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { CanceledError };

export { apiClient };
