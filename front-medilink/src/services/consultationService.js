// src/services/consultationService.js
import axios from 'axios';
import { API_ENDPOINTS } from '../config/apiConfig';

// Obtener citas médicas (filtradas por profesional o paciente)
export const getAppointments = async (filters) => {
  try {
    const response = await axios.get(API_ENDPOINTS.consultations, { params: filters });
    return response.data;
  } catch (error) {
    console.error('Error al obtener citas:', error);
    throw error;
  }
};

// Actualizar una cita médica (por ejemplo, cambiar el estado a "en progreso" o "completada")
export const updateAppointment = async (consultationId, consultationData) => {
  try {
    const response = await axios.put(`${API_ENDPOINTS.consultations}/update/${consultationId}`, consultationData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar cita:', error);
    throw error;
  }
};

// Cancelar una cita médica
export const cancelAppointment = async (consultationId) => {
  try {
    const response = await axios.delete(`${API_ENDPOINTS.consultations}/remove/${consultationId}`);
    return response.data;
  } catch (error) {
    console.error('Error al cancelar cita:', error);
    throw error;
  }
};