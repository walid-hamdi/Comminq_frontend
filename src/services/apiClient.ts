import axios, { CanceledError } from "axios";

const mainApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ENDPOINT, // Main API base URL
});

const googleApiClient = axios.create({
  baseURL: "https://www.googleapis.com/oauth2/v1", // Google API base URL
});

export { CanceledError };

export { mainApiClient, googleApiClient };
