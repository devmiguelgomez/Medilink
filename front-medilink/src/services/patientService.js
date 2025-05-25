// src/services/patientService.js
import axios from 'axios';

const API_URL = 'https://medilink-backend-flax.vercel.app/api/patients'; // URL del backend

export const getPatientProfile = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error al obtener el perfil:', error);
    throw error;
  }
};

export const updatePatientProfile = async (profileData) => {
  try {
    const response = await axios.put(API_URL, profileData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el perfil:', error);
    throw error;
  }
};