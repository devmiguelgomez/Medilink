// src/services/activityService.js
import axios from 'axios';

const API_URL = 'https://medilink-backend-flax.vercel.app/api/activities'; // URL del backend

// Obtener todas las actividades registradas
export const getActivities = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error al obtener actividades:', error);
    throw error;
  }
};