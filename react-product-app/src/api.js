import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:7051/Producto' // Cambia a la URL de tu API
});

export default api;