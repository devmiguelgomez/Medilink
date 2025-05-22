import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { AppointmentsContext } from '../../context/AppointmentsContext';

function PatientDashboard() {
  const { user } = useContext(AuthContext);
  const { appointments } = useContext(AppointmentsContext);

  return (
    <div className="dashboard">
      <h2>Bienvenido, {user?.name}</h2>
      <h3>Tus Citas Programadas</h3>
      <ul>
        {appointments.map((appt) => (
          <li key={appt.id}>
            <span>
              <strong>Fecha:</strong> {appt.date} |{' '}
              <strong>Hora:</strong> {appt.time}
            </span>
            <span>
              <strong>Especialista:</strong> {appt.professional}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PatientDashboard;