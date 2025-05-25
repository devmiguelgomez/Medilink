import axios from 'axios';
import { logout } from '../services/authService';

// Función para configurar los interceptores de axios
export const setupInterceptors = () => {
  // Interceptor de solicitudes
  axios.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Interceptor de respuestas
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // Manejar errores 401 (No autorizado)
      if (error.response && error.response.status === 401) {
        console.error('Sesión expirada o token inválido');
        // Cerrar sesión y redirigir al login
        logout();
        window.location.href = '/';
      }
      
      return Promise.reject(error);
    }
  );
};
