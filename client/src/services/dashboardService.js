import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/dashboard`;

const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
};

const getDashboardStats = async () => {
  const response = await axios.get(
    `${API_URL}/stats`,
    getAuthHeader()
  );

  return response.data;
};

export default {
  getDashboardStats,
};