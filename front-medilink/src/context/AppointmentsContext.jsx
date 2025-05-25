import React, { createContext, useState, useEffect, useContext } from 'react';
import { getAppointments } from '../services/appointmentService';
import { useAuth } from './AuthContext';

// Crear el contexto
export const AppointmentsContext = createContext();

// Hook personalizado para usar el contexto
export const useAppointments = () => {
  return useContext(AppointmentsContext);
};

// Proveedor del contexto
export const AppointmentsProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isLoggedIn, currentUser } = useAuth();

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!isLoggedIn || !currentUser) {
        setAppointments([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      
      try {
        const result = await getAppointments();
        setAppointments(result.data || []);
      } catch (err) {
        setError(err.message || 'Error al obtener las citas');
        console.error('Error al cargar citas:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [isLoggedIn, currentUser]);

  // Función para agregar una nueva cita al estado
  const addAppointment = (appointment) => {
    setAppointments(prevAppointments => [appointment, ...prevAppointments]);
  };

  // Función para actualizar una cita existente
  const updateAppointmentState = (updatedAppointment) => {
    setAppointments(prevAppointments => 
      prevAppointments.map(app => 
        app.id === updatedAppointment.id ? updatedAppointment : app
      )
    );
  };

  // Función para eliminar una cita
  const removeAppointment = (appointmentId) => {
    setAppointments(prevAppointments => 
      prevAppointments.filter(app => app.id !== appointmentId)
    );
  };

  // Valor para proveer al contexto
  const value = {
    appointments,
    loading,
    error,
    addAppointment,
    updateAppointmentState,
    removeAppointment,
    refreshAppointments: async () => {
      setLoading(true);
      try {
        const result = await getAppointments();
        setAppointments(result.data || []);
      } catch (err) {
        setError(err.message || 'Error al refrescar las citas');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <AppointmentsContext.Provider value={value}>
      {children}
    </AppointmentsContext.Provider>
  );
};