// src/services/consultationService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/consultations'; // URL del backend

// Obtener citas médicas (filtradas por profesional o paciente)
export const getAppointments = async (filters) => {
  try {
    const response = await axios.get(API_URL, { params: filters });
    return response.data;
  } catch (error) {
    console.error('Error al obtener citas:', error);
    throw error;
  }
};

// Actualizar una cita médica (por ejemplo, cambiar el estado a "en progreso" o "completada")
export const updateAppointment = async (consultationId, consultationData) => {
  try {
    const response = await axios.put(`${API_URL}/${consultationId}`, consultationData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar cita:', error);
    throw error;
  }
};

// Cancelar una cita médica
export const cancelAppointment = async (consultationId) => {
  try {
    const response = await axios.delete(`${API_URL}/${consultationId}`);
    return response.data;
  } catch (error) {
    console.error('Error al cancelar cita:', error);
    throw error;
  }
};