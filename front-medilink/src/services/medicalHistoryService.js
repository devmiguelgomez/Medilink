// src/services/medicalHistoryService.js
import axios from 'axios';
import { API_ENDPOINTS } from '../config/apiConfig';

export const getPatientHistory = async (patientId) => {
  try {
    const response = await axios.get(`${API_ENDPOINTS.medicalRecords}/patient/${patientId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener historial médico:', error);
    throw error;
  }
};

export const addMedicalRecord = async (patientId, recordData) => {
  try {
    const response = await axios.post(API_ENDPOINTS.medicalRecords, { 
      patientId, 
      ...recordData 
    });
    return response.data;
  } catch (error) {
    console.error('Error al agregar registro médico:', error);
    throw error;
  }
};