import axios from "axios";
import { IProduct } from "../interfaces/Iproduct";
import Cookies from "js-cookie";
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
  // const accessToken = localStorage.getItem("accessToken");
  const accessToken = Cookies.get("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Add response interceptor for debugging
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("Response error:", error);

    if (
      error.response.status === 401 &&
      !error.config.url?.includes("/login")
    ) {
      console.log("Unauthorized access, redirecting to login...");
      Cookies.remove("accessToken");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

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
      "/wp-json/simple-jwt-login/v1/auth",
      null,
      {
        params: {
          email: credentials.email,
          password: credentials.password,
        },
      }
    );
    return response;
  },
  register: async (credentials: { email: string; password: string }) => {
    const response = await apiClient.post(
      "/wp-json/simple-jwt-login/v1/users",
      {
        email: credentials.email,
        password: credentials.password,
      }
    );
    console.log(response.data);
    return response;
  },
  validateToken: async () => {
    const response = await apiClient.post(
      "/wp-json/simple-jwt-login/v1/auth/validate"
    );
    console.log(response.data);
    return response;
  },
  logout: async () => {
    Cookies.remove("accessToken");
    // window.location.href = "/login";
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
  getProductById: async (id: string) => {
    const response = await apiClient.get(`/wp-json/wc/v3/products/${id}`);
    return response;
  },
  createProduct: async ({ title, price, imageURL }: IProduct) => {
    try {
      const response = await apiClient.post("/wp-json/wc/v3/products", {
        name: title,
        regular_price: price.toString(),
        images: imageURL ? [{ src: imageURL }] : [],
        status: "publish",
      });
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  updateProduct: async (id: string, product: Partial<IProduct>) => {
    const response = await apiClient.put(
      `/wp-json/wc/v3/products/${id}`,
      product
    );
    console.log(response);
    console.log(product);
    return response;
  },
  deleteProduct: async (id: string) => {
    const response = await apiClient.delete(`/wp-json/wc/v3/products/${id}`);
    return response;
  },
  batchUpdateQuantities: async (
    quantities: Array<{
      id: number;
      stock_quantity: number;
    }>
  ) => {
    const updates = quantities.map((item) => ({
      id: item.id,
      stock_quantity: item.stock_quantity,
      manage_stock: true, // Enable stock management for the product
    }));

    const response = await apiClient.post("/wp-json/wc/v3/products/batch", {
      update: updates,
    });

    console.log("Batch update response:", response);
    return response;
  },
};

export const ordersAPI = {
  getOrders: async () => {
    const response = await apiClient.get("/wp-json/wc/v3/orders");
    return response;
  },
  getOrderById: async (id: string) => {
    const response = await apiClient.get(`/wp-json/wc/v3/orders/${id}`);
    return response;
  },
};

export const customersAPI = {
  getCustomers: async () => {
    try {
      const response = await apiClient.get("/wp-json/wc/v3/customers", {
        params: {
          per_page: 100,
          role: "all",
        },
      });
      console.log("Customers API Response:", response);
      return response;
    } catch (error: any) {
      console.error("Error fetching customers:", error);
      if (error.response) {
        console.error("Error response:", error.response.data);
        console.error("Error status:", error.response.status);
      }
      throw error;
    }
  },
};
