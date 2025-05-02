import axios from 'axios';

const API = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}notes`, // → http://localhost:5001/api/notes
    withCredentials: true,
});

const uploadNote = async (title, subject, course, semester, file, token) => {
  const formData = new FormData();
  formData.append('title', title);
  formData.append('subject', subject);
  formData.append('course', course);
  formData.append('semester', semester);
  formData.append('file', file);

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`
    }
  };

  const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/notes/upload`, formData, config);
  return response.data;
};

const searchNotes = async (searchTerm = '') => {
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/notes/search?term=${searchTerm}`);
  return response.data;
};

const getAllNotes = async () => {
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/notes`);
  return response.data;
};

const downloadNote = async (noteId, token) => {
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    },
    responseType: 'blob'
  };
  
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/notes/${noteId}/download`, config);
  return response.data;
};

export default {
  uploadNote,
  searchNotes,
  getAllNotes,
  downloadNote
};