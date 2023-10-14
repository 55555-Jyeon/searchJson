import axios from "axios";

// core.jsx
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true,
});

// search.api.jsx
export const getKeywords = async (key) => {
  // const response = await axiosInstance.get("/search");
  const response = await axios.get(`http://localhost:3000/search?key=${key}`);
  return response.data;
};
