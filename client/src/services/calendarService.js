import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/calendar`;

const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
};

const getEvents = async () => {
  const response = await axios.get(
    API_URL,
    getAuthHeader()
  );

  return response.data;
};

const createEvent = async (eventData) => {
  const response = await axios.post(
    API_URL,
    eventData,
    getAuthHeader()
  );

  return response.data;
};

const updateEvent = async (id, eventData) => {
  const response = await axios.put(
    `${API_URL}/${id}`,
    eventData,
    getAuthHeader()
  );

  return response.data;
};

const deleteEvent = async (id) => {
  const response = await axios.delete(
    `${API_URL}/${id}`,
    getAuthHeader()
  );

  return response.data;
};

export default {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};