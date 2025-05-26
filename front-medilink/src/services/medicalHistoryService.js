// src/services/medicalHistoryService.js
import axiosInstance from './axios.config';

export const getPatientHistory = async (patientId) => {
  try {
    const response = await axiosInstance.get(`/medical-records/patient/${patientId}`);
    return response.data || [];
  } catch (error) {
    console.error('Error al obtener historial médico:', error);
    return []; // Retornamos un array vacío en caso de error
  }
};

export const addMedicalRecord = async (patientId, recordData) => {
  try {
    const response = await axiosInstance.post('/medical-records', { 
      patientId, 
      ...recordData 
    });
    return response.data;
  } catch (error) {
    console.error('Error al agregar registro médico:', error);
    throw error;
  }
};