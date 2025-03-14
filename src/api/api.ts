import authAPI from "./authAPI";
import productAPI from "./productAPI";
import orderAPI from "./orderAPI";
import customerAPI from "./customerAPI";

export const BASE_URL = "http://api.alikooshesh.ir:3000";
export const api_key = "maktab_shop_key";

export const getAuthorization = () => {
  const accessToken = localStorage.getItem("accessToken");
  return accessToken ? `Bearer ${accessToken}` : "";
};

export { authAPI, productAPI, orderAPI, customerAPI };
