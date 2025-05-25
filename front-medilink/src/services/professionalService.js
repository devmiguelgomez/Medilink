// src/services/professionalService.js
import axios from 'axios';
import { API_ENDPOINTS } from '../config/apiConfig';

// Obtener el perfil del profesional
export const getProfessionalProfile = async (userId) => {
  try {
    const response = await axios.get(`${API_ENDPOINTS.professionals}/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener el perfil del profesional:', error);
    throw error;
  }
};

// Actualizar el perfil del profesional
export const updateProfessionalProfile = async (profileData) => {
  try {
    const response = await axios.put(`${API_ENDPOINTS.professionals}/${profileData.id}`, profileData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el perfil del profesional:', error);
    throw error;
  }
};