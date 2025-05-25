import React, { createContext, useState } from 'react';

const AppointmentsContext = createContext();

function AppointmentsProvider({ children }) {
  const [appointments, setAppointments] = useState([]);

  const addAppointment = (appointment) => {
    setAppointments([...appointments, appointment]);
  };

  const updateAppointment = (id, updatedData) => {
    setAppointments((prevAppointments) =>
      prevAppointments.map((appt) =>
        appt.id === id ? { ...appt, ...updatedData } : appt
      )
    );
  };

  const deleteAppointment = (id) => {
    setAppointments(appointments.filter((appt) => appt.id !== id));
  };

  return (
    <AppointmentsContext.Provider
      value={{ appointments, addAppointment, updateAppointment, deleteAppointment }}
    >
      {children}
    </AppointmentsContext.Provider>
  );
}

export { AppointmentsContext, AppointmentsProvider };