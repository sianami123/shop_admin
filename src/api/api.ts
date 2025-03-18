import axios from "axios";
import Cookies from "js-cookie";

export const BASE_URL = "http://api.alikooshesh.ir:3000";
export const api_key = "maktab124_shop";

const accessToken = Cookies.get("accessToken");

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    api_key: api_key,
  },
});

api.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401 || error.response.status === 403) {
      Cookies.remove("accessToken");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
