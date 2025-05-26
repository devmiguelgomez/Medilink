// src/services/authService.js
import axiosInstance from './axios.config';

// Token key para localStorage
const TOKEN_KEY = 'medilink_token';
const USER_DATA = 'medilink_user';

// Login
export const login = async (credentials) => {
  try {
    const response = await axiosInstance.post('/users/login', credentials);
    
    // Guardar token y datos del usuario
    localStorage.setItem(TOKEN_KEY, response.data.token);
    localStorage.setItem(USER_DATA, JSON.stringify({
      id: response.data._id,
      name: response.data.name,
      email: response.data.email,
      role: response.data.role
    }));
    
    return response.data;
  } catch (error) {
    console.error('Error en login:', error);
    throw error;
  }
};

// Registro
export const register = async (userData) => {
  try {
    const response = await axiosInstance.post('/users/register', userData);
    
    // Guardar token y datos del usuario
    localStorage.setItem(TOKEN_KEY, response.data.token);
    localStorage.setItem(USER_DATA, JSON.stringify({
      id: response.data._id,
      name: response.data.name,
      email: response.data.email,
      role: response.data.role
    }));
    
    return response.data;
  } catch (error) {
    console.error('Error en registro:', error);
    throw error;
  }
};

// Logout
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_DATA);
};

// Verificar autenticación
export const isAuthenticated = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  return !!token;
};

// Obtener token
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

// Obtener datos del usuario autenticado
export const getCurrentUser = () => {
  try {
    const userData = localStorage.getItem(USER_DATA);
    if (userData) {
      return JSON.parse(userData);
    }
    return null;
  } catch (error) {
    console.error('Error al parsear datos del usuario:', error);
    return null;
  }
};

// Obtener perfil del usuario
export const getUserProfile = async () => {
  try {
    const response = await axiosInstance.get('/users/profile');
    return response.data;
  } catch (error) {
    console.error('Error al obtener perfil del usuario:', error);
    throw error;
  }
};

// Inicializar autenticación
export const initializeAuth = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    // El token se maneja automáticamente por el interceptor de axios
    return true;
  }
  return false;
};
