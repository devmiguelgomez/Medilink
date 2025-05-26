import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://medilink-backend-flax.vercel.app/api',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // 10 segundos de timeout
});

// Interceptor para agregar el token de autenticación
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('medilink_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor para manejar errores
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            // El servidor respondió con un código de estado fuera del rango 2xx
            if (error.response.status === 401) {
                // Token expirado o inválido
                localStorage.removeItem('medilink_token');
                window.location.href = '/login';
            }
            console.error('Error en la respuesta:', error.response.data);
        } else if (error.request) {
            // La petición fue hecha pero no se recibió respuesta
            console.error('No se recibió respuesta del servidor');
        } else {
            // Algo sucedió al configurar la petición
            console.error('Error en la configuración de la petición:', error.message);
        }
        return Promise.reject(error);
    }
);

export default axiosInstance; 