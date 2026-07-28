import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/auth`,
});

export const login = async (userData) => {
  const { data } = await API.post("/login", userData);
  return data;
};

export const register = async (userData) => {
  const { data } = await API.post("/register", userData);
  return data;
};

export const logout = () => {
  localStorage.removeItem("user");
};

export default {
  logout,
};