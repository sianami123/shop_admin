import { api_key, BASE_URL, getAuthorization } from "./api";

const orderAPI = {
  getOrders: async () => {
    const response = await fetch(`${BASE_URL}/api/records/orders`, {
      headers: {
        Authorization: getAuthorization(),
        api_key: api_key,
      },
    });
    return response.json();
  },
};

export default orderAPI;
