import axios from "axios";

const API_URL = "${import.meta.env.VITE_API_URL}/api/resume";

export const analyzeResume = async (file) => {
  const formData = new FormData();
  formData.append("resume", file);

  const user = JSON.parse(localStorage.getItem("user"));

  const response = await axios.post(
    `${API_URL}/upload`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const getMyResumes = async () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });

  return response.data;
};
export const improveResume = async (resumeText) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const response = await axios.post(
    "${import.meta.env.VITE_API_URL}/api/improve",
    { resumeText },
    {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }
  );

  return response.data;
};