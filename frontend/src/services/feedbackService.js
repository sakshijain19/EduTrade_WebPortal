import axios from "axios";

// Axios instance for feedback endpoints
const API = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/feedback`, // http://localhost:5001/api/feedback
  withCredentials: true,
});

// Get all feedback (optional category filter)
export const getAllFeedback = async (category = null) => {
  const res = await API.get("/", {
    params: category ? { category } : {},
  });
  return res.data;
};

// Get a single feedback by ID
export const getFeedbackById = async (id) => {
  const res = await API.get(`/${id}`);
  return res.data;
};

// Submit feedback (requires token)
export const submitFeedback = async (data, token) => {
  const res = await API.post("/", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// Update feedback by ID (requires token)
export const updateFeedback = async (id, data, token) => {
  const res = await API.put(`/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// Delete feedback by ID (requires token)
export const deleteFeedback = async (id, token) => {
  const res = await API.delete(`/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// Get feedback stats (rating distribution, average, etc.)
export const getFeedbackStats = async (category = null) => {
  const res = await API.get("/stats", {
    params: category ? { category } : {},
  });
  return res.data;
};

export default {
  getAllFeedback,
  getFeedbackById,
  submitFeedback,
  updateFeedback,
  deleteFeedback,
  getFeedbackStats,
};
