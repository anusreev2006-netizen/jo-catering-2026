import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jo-catering-2026.onrender.com/',
});

export default api;