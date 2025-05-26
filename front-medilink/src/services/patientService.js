// src/services/patientService.js
import axiosInstance from './axios.config';

export const getPatientProfile = async (patientId) => {
  try {
    const response = await axiosInstance.get(`/users/profile`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener el perfil:', error);
    throw error;
  }
};

export const updatePatientProfile = async (patientId, profileData) => {
  try {
    const response = await axiosInstance.put(`/users/profile`, profileData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el perfil:', error);
    throw error;
  }
};