import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/roadmap`;

const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
};

export const generateRoadmap = async (roadmapData) => {
  const response = await axios.post(
    API_URL,
    roadmapData,
    getAuthHeader()
  );

  return response.data;
};

export const getRoadmap = async () => {
  const response = await axios.get(
    API_URL,
    getAuthHeader()
  );

  return response.data;
};