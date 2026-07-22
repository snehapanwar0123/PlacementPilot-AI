import axios from "axios";

const API_URL = "http://localhost:5000/api/coding";

const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
};

const getFilters = async () => {
  const response = await axios.get(
    `${API_URL}/topics`,
    getAuthHeader()
  );

  return response.data;
};

const getProblems = async (filters = {}) => {
  const response = await axios.get(
    `${API_URL}/problems`,
    {
      ...getAuthHeader(),
      params: filters,
    }
  );

  return response.data;
};

const completeProblem = async (problemId, notes = "") => {
  const response = await axios.post(
    `${API_URL}/complete`,
    {
      problemId,
      notes,
    },
    getAuthHeader()
  );

  return response.data;
};

const getProgress = async () => {
  const response = await axios.get(
    `${API_URL}/progress`,
    getAuthHeader()
  );

  return response.data;
};

const codingService = {
  getFilters,
  getProblems,
  completeProblem,
  getProgress,
};

export default codingService;