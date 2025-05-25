// src/services/appointmentService.js
import axios from 'axios';

const API_URL = 'https://medilink-backend-flax.vercel.app/api/appointments'; // URL del backend

export const getAppointments = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error al obtener citas:', error);
    throw error;
  }
};

export const createAppointment = async (appointmentData) => {
  try {
    const response = await axios.post(API_URL, appointmentData);
    return response.data;
  } catch (error) {
    console.error('Error al crear cita:', error);
    throw error;
  }
};

export const updateAppointment = async (appointmentId, appointmentData) => {
  try {
    const response = await axios.put(`${API_URL}/${appointmentId}`, appointmentData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar cita:', error);
    throw error;
  }
};

export const cancelAppointment = async (appointmentId) => {
  try {
    const response = await axios.delete(`${API_URL}/${appointmentId}`);
    return response.data;
  } catch (error) {
    console.error('Error al cancelar cita:', error);
    throw error;
  }
};