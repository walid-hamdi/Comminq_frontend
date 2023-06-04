import axios, { CanceledError } from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ENDPOINT, // Main API base URL
});

export { CanceledError };

export { apiClient };
