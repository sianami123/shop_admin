import api from "../../api/api";
import Cookies from "js-cookie";

const authAPI = {
  register: async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const response = await api.post("/api/users/register", {
      email,
      password,
    });
    return response.data;
  },
  login: async ({ email, password }: { email: string; password: string }) => {
    const response = await api.post("/api/users/login", { email, password });
    return response.data;
  },
  logout: async () => {
    Cookies.remove("accessToken");
  },
};

export default authAPI;
