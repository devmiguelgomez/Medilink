import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { AppointmentsContext } from '../../context/AppointmentsContext';

function AdminDashboard() {
  const { user } = useContext(AuthContext);
  const { appointments } = useContext(AppointmentsContext);

  return (
    <div className="dashboard">
      <h2>Bienvenido, Administrador {user?.name}</h2>
      <h3>Resumen de Citas</h3>
      <ul>
        {appointments.map((appt) => (
          <li key={appt.id}>
            <span>
              <strong>Paciente:</strong> {appt.patient} |{' '}
              <strong>Especialista:</strong> {appt.professional} |{' '}
              <strong>Fecha:</strong> {appt.date} |{' '}
              <strong>Hora:</strong> {appt.time}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;