import api from "../../api/api";

const customerAPI = {
  getCustomers: async () => {
    const response = await api.get("/api/customers");
    return response.data;
  },
};

export default customerAPI;
