import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { AppointmentsContext } from '../../context/AppointmentsContext';

function ProfessionalDashboard() {
  const { user } = useContext(AuthContext);
  const { appointments } = useContext(AppointmentsContext);

  return (
    <div style={styles.container}>
      <h2>Bienvenido, Dr(a). {user?.name}</h2>
      <h3>Citas Asignadas</h3>
      <ul>
        {appointments.map((appt) => (
          <li key={appt.id}>
            <strong>Paciente:</strong> {appt.patient} |{' '}
            <strong>Fecha:</strong> {appt.date} |{' '}
            <strong>Hora:</strong> {appt.time}
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '600px',
    margin: '0 auto',
  },
};

export default ProfessionalDashboard;