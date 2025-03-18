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
  // Social login functions
  googleLogin: async () => {
    const response = await api.get("/api/auth/google");
    return response.data;
  },
  facebookLogin: async () => {
    const response = await api.get("/api/auth/facebook");
    return response.data;
  },
  twitterLogin: async () => {
    const response = await api.get("/api/auth/twitter");
    return response.data;
  },
  linkedinLogin: async () => {
    const response = await api.get("/api/auth/linkedin");
    return response.data;
  },
};

export default authAPI;
