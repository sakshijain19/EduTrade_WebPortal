import axios from 'axios';

// Create an axios instance with the backend base URL and credentials
const API = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/books`,  // e.g. http://localhost:5001/api/books
  withCredentials: true,
});

// Helper to get Authorization header
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Fetch all books with optional filter query params
const getAllBooks = async (filters = {}) => {
  try {
    const response = await API.get('/', { params: filters });
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

// Fetch a single book by ID
const getBookById = async (id) => {
  try {
    const response = await API.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching book by ID:', error);
    throw error;
  }
};

// Create a new book listing (with image upload)
const createBook = async (bookData) => {
  try {
    const formData = new FormData();
    Object.entries(bookData).forEach(([key, value]) => {
      if (key === 'bookImage') {
        formData.append('image', value);
      } else {
        formData.append(key, value);
      }
    });

    const response = await API.post('/list', formData, {
      headers: {
        ...getAuthHeader(),
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating book listing:', error);
    throw error;
  }
};

// Update an existing book (with optional new image)
const updateBook = async (id, bookData) => {
  try {
    const formData = new FormData();
    Object.entries(bookData).forEach(([key, value]) => {
      if (key === 'bookImage' && value) {
        formData.append('image', value);
      } else if (value !== undefined) {
        formData.append(key, value);
      }
    });

    const response = await API.put(`/${id}`, formData, {
      headers: {
        ...getAuthHeader(),
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating book:', error);
    throw error;
  }
};

// Delete a book listing by ID
const deleteBook = async (id) => {
  try {
    const response = await API.delete(`/${id}`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting book:', error);
    throw error;
  }
};

// Send a message to the seller for a given book
const sendMessageToSeller = async (bookId, messageData) => {
  try {
    const response = await API.post(`/${bookId}/message`, messageData, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error('Error sending message to seller:', error);
    throw error;
  }
};

export default {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  sendMessageToSeller,
};
