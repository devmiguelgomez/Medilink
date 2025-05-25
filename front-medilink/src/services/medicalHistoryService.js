// src/services/medicalHistoryService.js
import axios from 'axios';

const API_URL = 'https://medilink-backend-flax.vercel.app/api/medical-history';

export const getPatientHistory = async (patientId) => {
  try {
    const response = await axios.get(`${API_URL}?patientId=${patientId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener historial médico:', error);
    throw error;
  }
};

export const addMedicalRecord = async (patientId, recordData) => {
  try {
    const response = await axios.post(API_URL, { patientId, ...recordData });
    return response.data;
  } catch (error) {
    console.error('Error al agregar registro médico:', error);
    throw error;
  }
};