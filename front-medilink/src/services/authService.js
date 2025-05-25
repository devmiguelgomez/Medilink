// src/services/authService.js
import axios from 'axios';
import { API_ENDPOINTS } from '../config/apiConfig';

// Token key para localStorage
const TOKEN_KEY = 'medilink_token';
const USER_DATA = 'medilink_user';

// Configurar el token en los headers de axios
export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

// Login
export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_ENDPOINTS.users}/login`, credentials);
    
    // Guardar token y datos del usuario
    localStorage.setItem(TOKEN_KEY, response.data.token);
    localStorage.setItem(USER_DATA, JSON.stringify({
      id: response.data._id,
      name: response.data.name,
      email: response.data.email,
      role: response.data.role
    }));
    
    // Configurar token para futuros requests
    setAuthToken(response.data.token);
    
    return response.data;
  } catch (error) {
    console.error('Error en login:', error);
    throw error;
  }
};

// Registro
export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_ENDPOINTS.users}/register`, userData);
    
    // Guardar token y datos del usuario
    localStorage.setItem(TOKEN_KEY, response.data.token);
    localStorage.setItem(USER_DATA, JSON.stringify({
      id: response.data._id,
      name: response.data.name,
      email: response.data.email,
      role: response.data.role
    }));
    
    // Configurar token para futuros requests
    setAuthToken(response.data.token);
    
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
  setAuthToken(null);
};

// Verificar autenticación
export const isAuthenticated = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  return !!token; // Retorna true si hay un token
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
    const response = await axios.get(`${API_ENDPOINTS.users}/profile`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener perfil del usuario:', error);
    throw error;
  }
};

// Establecer token al iniciar la aplicación
export const initializeAuth = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    setAuthToken(token);
  }
};
