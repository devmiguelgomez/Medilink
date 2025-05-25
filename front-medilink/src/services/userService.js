// src/services/userService.js
import axios from 'axios';

// Usar una variable de entorno o una URL de respaldo para el API
const API_URL = import.meta.env.VITE_API_URL || 'https://medilink-backend-flax.vercel.app/api/users';

// Función para verificar la disponibilidad del API
export const checkApiStatus = async () => {
  try {
    const response = await axios.get(API_URL.replace('/users', ''));
    return {
      status: true,
      message: response.data.message || 'API disponible'
    };
  } catch (error) {
    console.error('Error al verificar la API:', error);
    return {
      status: false,
      message: error.message || 'API no disponible'
    };
  }
};

// Obtener todos los usuarios
export const getUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw error;
  }
};

// Crear un nuevo usuario
export const createUser = async (userData) => {
  try {
    const response = await axios.post(API_URL, userData);
    return response.data;
  } catch (error) {
    console.error('Error al crear usuario:', error);
    throw error;
  }
};

// Actualizar un usuario existente
export const updateUser = async (userId, userData) => {
  try {
    const response = await axios.put(`${API_URL}/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    throw error;
  }
};

// Eliminar un usuario
export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${API_URL}/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    throw error;
  }
};