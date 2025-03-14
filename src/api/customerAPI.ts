import { BASE_URL } from "./api";

const customerAPI = {
  getCustomers: async () => {
    const response = await fetch(`${BASE_URL}/api/customers`);
    return response.json();
  },
};

export default customerAPI;
