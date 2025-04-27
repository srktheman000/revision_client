// lib/axiosClient.ts
import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api", // adjust to your backend
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
