import axios from "axios";

// search.api.jsx
export const getKeywords = async (key) => {
  // const response = await axiosInstance.get("/search");
  const response = await axios.get(`http://localhost:3000/search?key=${key}`);
  return response.data;
};
