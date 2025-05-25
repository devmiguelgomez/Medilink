// src/services/professionalService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/professionals'; // URL del backend

// Obtener el perfil del profesional
export const getProfessionalProfile = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener el perfil del profesional:', error);
    throw error;
  }
};

// Actualizar el perfil del profesional
export const updateProfessionalProfile = async (profileData) => {
  try {
    const response = await axios.put(`${API_URL}/${profileData.id}`, profileData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el perfil del profesional:', error);
    throw error;
  }
};