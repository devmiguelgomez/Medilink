// src/services/appointmentService.js
import axios from 'axios';
import { API_ENDPOINTS } from '../config/apiConfig';

export const getAppointments = async () => {
  try {
    const response = await axios.get(API_ENDPOINTS.appointments);
    return response.data;
  } catch (error) {
    console.error('Error al obtener citas:', error);
    throw error;
  }
};

export const getAppointmentsList = async () => {
  try {
    const response = await axios.get(`${API_ENDPOINTS.appointments}/list`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener lista de citas:', error);
    throw error;
  }
};

export const getAppointmentDetails = async (appointmentId) => {
  try {
    const response = await axios.get(`${API_ENDPOINTS.appointments}/detail/${appointmentId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener detalles de la cita:', error);
    throw error;
  }
};

export const createAppointment = async (appointmentData) => {
  try {
    const response = await axios.post(API_ENDPOINTS.appointments, appointmentData);
    return response.data;
  } catch (error) {
    console.error('Error al crear cita:', error);
    throw error;
  }
};

export const updateAppointment = async (appointmentId, appointmentData) => {
  try {
    const response = await axios.put(`${API_ENDPOINTS.appointments}/update/${appointmentId}`, appointmentData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar cita:', error);
    throw error;
  }
};

export const cancelAppointment = async (appointmentId) => {
  try {
    const response = await axios.delete(`${API_ENDPOINTS.appointments}/remove/${appointmentId}`);
    return response.data;
  } catch (error) {
    console.error('Error al cancelar cita:', error);
    throw error;
  }
};