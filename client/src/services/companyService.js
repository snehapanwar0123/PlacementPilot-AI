import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/companies`;

const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
};

export const getCompanies = async () => {
  const response = await axios.get(API_URL, getAuthHeader());
  return response.data;
};

export const createCompany = async (companyData) => {
  const response = await axios.post(
    API_URL,
    companyData,
    getAuthHeader()
  );

  return response.data;
};

export const updateCompany = async (id, companyData) => {
  const response = await axios.put(
    `${API_URL}/${id}`,
    companyData,
    getAuthHeader()
  );

  return response.data;
};

export const deleteCompany = async (id) => {
  const response = await axios.delete(
    `${API_URL}/${id}`,
    getAuthHeader()
  );

  return response.data;
};