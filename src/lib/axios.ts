import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_JSON_TODOS_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default axiosInstance;
