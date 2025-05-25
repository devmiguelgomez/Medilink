// src/services/patientService.js
import axios from 'axios';
import { API_ENDPOINTS } from '../config/apiConfig';

export const getPatientProfile = async () => {
  try {
    const response = await axios.get(API_ENDPOINTS.patients);
    return response.data;
  } catch (error) {
    console.error('Error al obtener el perfil:', error);
    throw error;
  }
};

export const updatePatientProfile = async (profileData) => {
  try {
    const response = await axios.put(API_ENDPOINTS.patients, profileData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el perfil:', error);
    throw error;
  }
};