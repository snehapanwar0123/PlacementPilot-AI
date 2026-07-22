import axios from "axios";

const API_URL = "http://localhost:5000/api/job";

export const matchJob = async (resumeText, jobDescription) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const response = await axios.post(
    `${API_URL}/match`,
    {
      resumeText,
      jobDescription,
    },
    {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }
  );

  return response.data;
};