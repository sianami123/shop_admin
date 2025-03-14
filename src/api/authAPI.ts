import { BASE_URL, api_key } from "./api";

const authAPI = {
  register: async ({
    email,
    password,
    role,
  }: {
    email: string;
    password: string;
    role: string;
  }) => {
    const response = await fetch(`${BASE_URL}/api/users/register`, {
      method: "POST",
      body: JSON.stringify({ email, password, role }),
      headers: {
        "Content-Type": "application/json",
        api_key: api_key,
      },
    });
    return response.json();
  },
  login: async ({ email, password }: { email: string; password: string }) => {
    const response = await fetch(`${BASE_URL}/api/users/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
        api_key: api_key,
      },
    });
    return response.json();
  },
};

export default authAPI;
