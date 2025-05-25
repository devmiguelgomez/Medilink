// src/services/scheduleService.js
import axios from 'axios';
import { API_ENDPOINTS } from '../config/apiConfig';

// Obtener todos los horarios
export const getSchedules = async () => {
  try {
    const response = await axios.get(API_ENDPOINTS.schedules);
    return response.data;
  } catch (error) {
    console.error('Error al obtener horarios:', error);
    throw error;
  }
};

// Crear un nuevo horario
export const createSchedule = async (scheduleData) => {
  try {
    const response = await axios.post(API_ENDPOINTS.schedules, scheduleData);
    return response.data;
  } catch (error) {
    console.error('Error al crear horario:', error);
    throw error;
  }
};

// Eliminar un horario
export const deleteSchedule = async (scheduleId) => {
  try {
    const response = await axios.delete(`${API_ENDPOINTS.schedules}/${scheduleId}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar horario:', error);
    throw error;
  }
};