import axios from "axios";

const API_URL = "http://localhost:5000/api/interview";

const getConfig = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
};

export const startInterview = async (role, difficulty) => {
  const response = await axios.post(
    `${API_URL}/start`,
    {
      role,
      difficulty,
    },
    getConfig()
  );

  return response.data;
};

export const evaluateAnswer = async (
  role,
  difficulty,
  question,
  answer
) => {
  const response = await axios.post(
    `${API_URL}/evaluate`,
    {
      role,
      difficulty,
      question,
      answer,
    },
    getConfig()
  );

  return response.data;
};

export const getInterviewHistory = async () => {
  const response = await axios.get(
    `${API_URL}/history`,
    getConfig()
  );

  return response.data;
};