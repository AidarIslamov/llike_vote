import Axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost/api';

export const api = Axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  withXSRFToken: true,
});

api.interceptors.response.use(
  response => response,
  async error => {
    const message =
      error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : error.message;

    console.error(message);
    return Promise.reject(error?.response?.data);
  }
);
