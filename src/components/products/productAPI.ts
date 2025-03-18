import api from "../../api/api";

const productURL = "/api/records/product";

const productAPI = {
  getProducts: async () => {
    const response = await api.get(productURL);
    return response.data;
  },
  getProductById: async (id: string) => {
    const response = await api.get(`${productURL}/${id}`);
    return response.data;
  },
  createProduct: async (product: any) => {
    const response = await api.post(productURL, product);
    return response.data;
  },
  updateProduct: async (id: string, product: any) => {
    const response = await api.put(`${productURL}/${id}`, product);
    return response.data;
  },
  deleteProduct: async (id: string) => {
    const response = await api.delete(`${productURL}/${id}`);
    return response.data;
  },
  batchUpdateQuantities: async (updates: any) => {
    const response = await api.put(`${productURL}/batch`, updates);
    return response.data;
  },
};

export default productAPI;
