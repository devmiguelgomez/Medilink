// src/services/activityService.js
import axios from 'axios';
import { API_ENDPOINTS } from '../config/apiConfig';

// Obtener todas las actividades registradas
export const getActivities = async () => {
  try {
    const response = await axios.get(API_ENDPOINTS.activities);
    return response.data;
  } catch (error) {
    console.error('Error al obtener actividades:', error);
    throw error;
  }
};