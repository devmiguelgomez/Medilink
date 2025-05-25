// src/services/userService.js
import axios from 'axios';
import { API_ENDPOINTS, checkApiStatus } from '../config/apiConfig';

// Exportar la función de verificación de API
export { checkApiStatus };

// Obtener todos los usuarios
export const getUsers = async () => {
  try {
    const response = await axios.get(API_ENDPOINTS.users);
    return response.data;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw error;
  }
};

// Crear un nuevo usuario
export const createUser = async (userData) => {
  try {
    const response = await axios.post(API_ENDPOINTS.users, userData);
    return response.data;
  } catch (error) {
    console.error('Error al crear usuario:', error);
    throw error;
  }
};

// Registrar un nuevo usuario
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_ENDPOINTS.users}/register`, userData);
    return response.data;
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    throw error;
  }
};

// Login de usuario
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_ENDPOINTS.users}/login`, credentials);
    return response.data;
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    throw error;
  }
};

// Actualizar un usuario existente
export const updateUser = async (userId, userData) => {
  try {
    const response = await axios.put(`${API_ENDPOINTS.users}/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    throw error;
  }
};

// Eliminar un usuario
export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${API_ENDPOINTS.users}/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    throw error;
  }
};