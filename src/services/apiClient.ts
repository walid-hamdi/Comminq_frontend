import axios, { CanceledError } from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ENDPOINT,
});

export { CanceledError };

export default apiClient;
