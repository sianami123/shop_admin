import api from "../../api/api";

const profileAPI = {
  getProfile: async () => {
    const response = await api.get("/api/users/me");
    return response.data;
  },
};

export default profileAPI;
