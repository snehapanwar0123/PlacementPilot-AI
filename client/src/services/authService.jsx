import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/auth",
});

export const login = async (userData) => {
  const { data } = await API.post("/login", userData);
  return data;
};

export const register = async (userData) => {
  const { data } = await API.post("/register", userData);
  return data;
};
const logout = () => {
  localStorage.removeItem("user");
};

export default {
  logout,
};