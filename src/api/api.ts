import axios from "axios";
import { IProduct } from "../interfaces/Iproduct";

const API_BASE_URL =
  "https://wordpress-x84owsw4g8wswwgcw8sc4c04.callfornia.com/";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor for debugging
apiClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Add response interceptor for debugging
apiClient.interceptors.response.use((response) => {
  if (response.status === 401 && response.config.url !== "/users/login") {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/login";
  }
  return response;
});

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  data: {
    jwt: string;
  };
  status: number;
}

export const authAPI = {
  login: async (credentials: LoginCredentials) => {
    const response = await apiClient.post<LoginResponse>(
      "/?rest_route=/simple-jwt-login/v1/auth",
      null,
      {
        params: {
          email: credentials.email,
          password: credentials.password,
        },
      }
    );
    console.log(response);
    return response;
  },
  logout: async () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  },
};

export const productsAPI = {
  getProducts: async (page?: number, perPage?: number) => {
    const response = await apiClient.get("/wp-json/wc/v3/products", {
      params: {
        page,
        per_page: perPage,
      },
    });
    console.log(response);
    return response;
  },
  createProduct: async ({ title, price, imageURL, inventory }: IProduct) => {
    try {
      const response = await apiClient.post("/wp-json/wc/v3/products", {
        title,
        price,
        imageURL,
        inventory,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  },
};
