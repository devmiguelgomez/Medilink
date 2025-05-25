// src/services/scheduleService.js
import axios from 'axios';

const API_URL = 'https://medilink-backend-flax.vercel.app/api/schedules'; // URL del backend

// Obtener todos los horarios
export const getSchedules = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error al obtener horarios:', error);
    throw error;
  }
};

// Crear un nuevo horario
export const createSchedule = async (scheduleData) => {
  try {
    const response = await axios.post(API_URL, scheduleData);
    return response.data;
  } catch (error) {
    console.error('Error al crear horario:', error);
    throw error;
  }
};

// Eliminar un horario
export const deleteSchedule = async (scheduleId) => {
  try {
    const response = await axios.delete(`${API_URL}/${scheduleId}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar horario:', error);
    throw error;
  }
};