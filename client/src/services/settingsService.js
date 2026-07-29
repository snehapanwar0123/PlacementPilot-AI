import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/settings`;

const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
};

const getSettings = async () => {
  const response = await axios.get(
    API_URL,
    getAuthHeader()
  );

  return response.data;
};

const updateSettings = async (settingsData) => {
  const response = await axios.put(
    API_URL,
    settingsData,
    getAuthHeader()
  );

  return response.data;
};

const changePassword = async (passwordData) => {
  const response = await axios.put(
    `${import.meta.env.VITE_API_URL}/api/auth/change-password`,
    passwordData,
    getAuthHeader()
  );

  return response.data;
};

export default {
  getSettings,
  updateSettings,
  changePassword,
};