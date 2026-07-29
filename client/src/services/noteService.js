import axios from "axios";

const API_URL = "${import.meta.env.VITE_API_URL}/api/notes";

const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
};

export const generateSmartNote = async (roadmapId, topic) => {
  const response = await axios.post(
    API_URL,
    {
      roadmapId,
      topic,
    },
    getAuthHeader()
  );

  return response.data;
};

export const getAllNotes = async () => {
  const response = await axios.get(API_URL, getAuthHeader());
  return response.data;
};

export const getNoteById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`, getAuthHeader());
  return response.data;
};

export const deleteNote = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, getAuthHeader());
  return response.data;
};