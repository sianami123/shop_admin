import { api_key, BASE_URL, getAuthorization } from "./api";

const productAPI = {
  getProducts: async () => {
    const response = await fetch(`${BASE_URL}/api/records/products`, {
      headers: {
        Authorization: getAuthorization(),
        api_key: api_key,
      },
    });
    return response.json();
  },
  getProductById: async (id: string) => {
    const response = await fetch(`${BASE_URL}/api/records/products/${id}`, {
      headers: {
        Authorization: getAuthorization(),
        api_key: api_key,
      },
    });
    return response.json();
  },
  createProduct: async (product: any) => {
    const response = await fetch(`${BASE_URL}/api/records/products`, {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
        Authorization: getAuthorization(),
        api_key: api_key,
      },
    });
    return response.json();
  },
  updateProduct: async (id: string, product: any) => {
    const response = await fetch(`${BASE_URL}/api/records/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
        Authorization: getAuthorization(),
        api_key: api_key,
      },
    });
    return response.json();
  },
  deleteProduct: async (id: string) => {
    const response = await fetch(`${BASE_URL}/api/records/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: getAuthorization(),
        api_key: api_key,
      },
    });
    return response.json();
  },
  batchUpdateQuantities: async (updates: any) => {
    const response = await fetch(`${BASE_URL}/api/records/products/batch`, {
      method: "PUT",
      body: JSON.stringify(updates),
      headers: {
        Authorization: getAuthorization(),
        api_key: api_key,
      },
    });
    return response.json();
  },
};

export default productAPI;
