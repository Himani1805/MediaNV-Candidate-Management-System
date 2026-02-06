import axios from 'axios';

const API = axios.create({
    baseURL: 'https://medianv-candidate-management-system.onrender.com/api', // Matches your Backend URL
});

export default API;
