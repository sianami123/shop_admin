import api from "../../api/api";

const orderAPI = {
  getOrders: async () => {
    const response = await api.get("/api/records/orders");
    return response.data;
  },
  getOrderById: async (id: string) => {
    const response = await api.get(`/api/records/orders/${id}`);
    return response.data;
  },
};

export default orderAPI;
