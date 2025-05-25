// Configuración de la URL base de la API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://medilink-backend-flax.vercel.app/api';

// Endpoints específicos
const API_ENDPOINTS = {
  users: `${API_BASE_URL}/users`,
  appointments: `${API_BASE_URL}/appointments`,
  medicalRecords: `${API_BASE_URL}/medical-records`,
  prescriptions: `${API_BASE_URL}/prescriptions`,
  clinics: `${API_BASE_URL}/clinics`,
  professionals: `${API_BASE_URL}/professionals`,
  patients: `${API_BASE_URL}/patients`,
  schedules: `${API_BASE_URL}/schedules`,
  consultations: `${API_BASE_URL}/consultations`,
  activities: `${API_BASE_URL}/activities`,
};

// Función para verificar el estado de la API
const checkApiStatus = async () => {
  try {
    const response = await fetch(API_BASE_URL);
    const data = await response.json();
    return { 
      status: true, 
      message: data.message || 'API disponible' 
    };
  } catch (error) {
    console.error('Error al verificar la API:', error);
    return { 
      status: false, 
      message: error.message || 'API no disponible' 
    };
  }
};

export { API_BASE_URL, API_ENDPOINTS, checkApiStatus };
