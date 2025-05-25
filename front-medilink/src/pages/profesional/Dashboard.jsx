// src/pages/profesional/Dashboard.jsx
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import {
  getProfessionalProfile,
  updateProfessionalProfile,
} from '../../services/professionalService';
import {
  getAppointments,
  updateAppointment,
  cancelAppointment,
} from '../../services/consultationService';
import { getPatientHistory, addMedicalRecord } from '../../services/medicalHistoryService';

function ProfessionalDashboard() {
  const { user } = useContext(AuthContext);

  // Estado para el perfil del profesional
  const [profile, setProfile] = useState({
    fullName: '',
    specialty: '',
    medicalLicense: '',
    schedule: '',
    assignedOffices: '',
  });

  // Estado para citas médicas
  const [appointments, setAppointments] = useState([]);
  const [editingAppointmentId, setEditingAppointmentId] = useState(null);

  // Estado para el historial médico del paciente en consulta
  const [patientHistory, setPatientHistory] = useState([]);
  const [newRecord, setNewRecord] = useState({
    diagnosis: '',
    treatment: '',
    prescription: '',
  });

  useEffect(() => {
    fetchProfile();
    fetchAppointments();
  }, []);

  // Funciones para el perfil del profesional
  const fetchProfile = async () => {
    try {
      const data = await getProfessionalProfile(user.id); // Suponemos que el ID del usuario está en el contexto
      setProfile(data);
    } catch (error) {
      console.error('Error al cargar el perfil:', error);
    }
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmitProfile = async (e) => {
    e.preventDefault();
    try {
      await updateProfessionalProfile(profile);
      alert('Perfil actualizado exitosamente');
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
    }
  };

  // Funciones para citas médicas
  const fetchAppointments = async () => {
    try {
      const data = await getAppointments({ professionalId: user.id }); // Filtrar citas por profesional
      setAppointments(data);
    } catch (error) {
      console.error('Error al cargar citas:', error);
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    try {
      await cancelAppointment(appointmentId);
      fetchAppointments(); // Refrescamos las citas después de cancelar
    } catch (error) {
      console.error('Error al cancelar cita:', error);
    }
  };

  const handleStartConsultation = async (appointmentId, patientId) => {
    try {
      // Cargar el historial médico del paciente
      const historyData = await getPatientHistory(patientId);
      setPatientHistory(historyData);

      // Marcar la cita como "en progreso"
      await updateAppointment(appointmentId, { status: 'in-progress' });
      fetchAppointments(); // Refrescamos las citas
    } catch (error) {
      console.error('Error al iniciar consulta:', error);
    }
  };

  // Funciones para el historial médico
  const handleRecordChange = (e) => {
    const { name, value } = e.target;
    setNewRecord({ ...newRecord, [name]: value });
  };

  const handleSubmitRecord = async (patientId) => {
    try {
      await addMedicalRecord(patientId, newRecord);
      alert('Registro médico guardado exitosamente');
      setNewRecord({ diagnosis: '', treatment: '', prescription: '' });
      fetchAppointments(); // Refrescamos las citas
    } catch (error) {
      console.error('Error al guardar registro médico:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Bienvenido, Dr(a). {user?.name}</h2>

      {/* Gestión del perfil */}
      <section style={styles.section}>
        <h3>Mi Perfil</h3>
        <form style={styles.form} onSubmit={handleSubmitProfile}>
          <div style={styles.formGroup}>
            <label>Nombre completo:</label>
            <input
              type="text"
              name="fullName"
              value={profile.fullName}
              onChange={handleProfileChange}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label>Especialidad:</label>
            <input
              type="text"
              name="specialty"
              value={profile.specialty}
              onChange={handleProfileChange}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label>Licencia médica:</label>
            <input
              type="text"
              name="medicalLicense"
              value={profile.medicalLicense}
              onChange={handleProfileChange}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label>Horario de atención:</label>
            <input
              type="text"
              name="schedule"
              value={profile.schedule}
              onChange={handleProfileChange}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label>Consultorios asignados:</label>
            <input
              type="text"
              name="assignedOffices"
              value={profile.assignedOffices}
              onChange={handleProfileChange}
              required
            />
          </div>
          <button type="submit" style={styles.buttonPrimary}>
            Actualizar Perfil
          </button>
        </form>
      </section>

      {/* Citas médicas */}
      <section style={styles.section}>
        <h3>Citas Asignadas</h3>
        <ul style={styles.list}>
          {appointments.map((appointment) => (
            <li key={appointment.id} style={styles.listItem}>
              <span>
                <strong>Paciente:</strong> {appointment.patientName} |{' '}
                <strong>Fecha:</strong> {appointment.date} |{' '}
                <strong>Hora:</strong> {appointment.time}
              </span>
              <div style={styles.actions}>
                <button
                  style={styles.buttonPrimary}
                  onClick={() => handleStartConsultation(appointment.id, appointment.patientId)}
                >
                  Iniciar Consulta
                </button>
                <button
                  style={styles.buttonDelete}
                  onClick={() => handleCancelAppointment(appointment.id)}
                >
                  Cancelar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Historial médico del paciente en consulta */}
      {patientHistory.length > 0 && (
        <section style={styles.section}>
          <h3>Historial Clínico del Paciente</h3>
          <ul style={styles.list}>
            {patientHistory.map((record) => (
              <li key={record.id} style={styles.listItem}>
                <span>
                  {record.date} - {record.diagnosis} ({record.treatment})
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Registro de nueva consulta */}
      <section style={styles.section}>
        <h3>Registrar Nueva Consulta</h3>
        <form style={styles.form} onSubmit={(e) => e.preventDefault()}>
          <div style={styles.formGroup}>
            <label>Diagnóstico:</label>
            <input
              type="text"
              name="diagnosis"
              value={newRecord.diagnosis}
              onChange={handleRecordChange}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label>Tratamiento:</label>
            <input
              type="text"
              name="treatment"
              value={newRecord.treatment}
              onChange={handleRecordChange}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label>Receta:</label>
            <input
              type="text"
              name="prescription"
              value={newRecord.prescription}
              onChange={handleRecordChange}
              required
            />
          </div>
          <button
            type="button"
            style={styles.buttonPrimary}
            onClick={() => handleSubmitRecord(appointments.find((appt) => appt.status === 'in-progress')?.patientId)}
          >
            Guardar Registro Médico
          </button>
        </form>
      </section>
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '600px',
    margin: '0 auto',
  },
  section: {
    marginBottom: '2rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.5rem 0',
    borderBottom: '1px solid #ccc',
  },
  actions: {
    display: 'flex',
    gap: '0.5rem',
  },
  buttonPrimary: {
    padding: '0.5rem 1rem',
    backgroundColor: '#1e40af',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  buttonDelete: {
    padding: '0.5rem 1rem',
    backgroundColor: '#ef4444',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default ProfessionalDashboard;