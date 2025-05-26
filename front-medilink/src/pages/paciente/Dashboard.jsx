// src/pages/paciente/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useAppointments } from '../../context/AppointmentsContext';
import {
  getPatientProfile,
  updatePatientProfile,
} from '../../services/patientService';
import {
  getAppointments,
  createAppointment,
  updateAppointment,
  cancelAppointment,
} from '../../services/appointmentService';
import { getPatientHistory } from '../../services/medicalHistoryService';
import { Navigate } from 'react-router-dom';

function PatientDashboard() {
  const { currentUser: user, isLoggedIn } = useAuth();
  const { appointments, loading: appointmentsLoading, error: appointmentsError } = useAppointments();

  // Estado para el perfil del paciente
  const [profile, setProfile] = useState({
    fullName: '',
    documentId: '',
    birthDate: '',
    contactInfo: '',
    healthCoverage: '',
  });

  // Estado para citas médicas
  const [appointmentsList, setAppointmentsList] = useState([]);
  const [newAppointment, setNewAppointment] = useState({
    reason: '',
    modality: 'presencial',
    professional: '',
    date: '',
  });
  const [editingAppointmentId, setEditingAppointmentId] = useState(null);

  // Estado para el historial médico
  const [medicalHistory, setMedicalHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (appointments) {
      setAppointmentsList(Array.isArray(appointments) ? appointments : []);
    }
  }, [appointments]);

  useEffect(() => {
    const fetchData = async () => {
      if (!isLoggedIn || !user) return;
      
      setLoading(true);
      setError(null);
      
      try {
        await Promise.all([
          fetchProfile(),
          fetchMedicalHistory()
        ]);
      } catch (err) {
        setError('Error al cargar los datos');
        console.error('Error al cargar datos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isLoggedIn, user]);

  // Funciones para el perfil del paciente
  const fetchProfile = async () => {
    try {
      const data = await getPatientProfile();
      if (data) {
        setProfile(data);
      }
    } catch (error) {
      console.error('Error al cargar el perfil:', error);
      setError('No se pudo cargar el perfil del paciente');
    }
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmitProfile = async (e) => {
    e.preventDefault();
    try {
      await updatePatientProfile(user.id, profile);
      alert('Perfil actualizado exitosamente');
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
      alert('Error al actualizar el perfil');
    }
  };

  // Funciones para citas médicas
  const fetchAppointments = async () => {
    try {
      const data = await getAppointments(user.id); // Suponemos que el ID del usuario está en el contexto
      setAppointmentsList(data);
    } catch (error) {
      console.error('Error al cargar citas:', error);
    }
  };

  const handleAppointmentChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment({ ...newAppointment, [name]: value });
  };

  const handleSubmitAppointment = async (e) => {
    e.preventDefault();
    try {
      if (editingAppointmentId) {
        await updateAppointment(editingAppointmentId, newAppointment);
        setEditingAppointmentId(null);
      } else {
        await createAppointment({ ...newAppointment, patientId: user.id }); // Asociamos la cita al paciente
      }
      setNewAppointment({
        reason: '',
        modality: 'presencial',
        professional: '',
        date: '',
      });
      fetchAppointments(); // Refrescamos las citas después de guardar
    } catch (error) {
      console.error('Error al guardar cita:', error);
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

  // Funciones para el historial médico
  const fetchMedicalHistory = async () => {
    try {
      const data = await getPatientHistory(user.id);
      setMedicalHistory(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error al cargar historial médico:', error);
      setMedicalHistory([]);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando datos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Reintentar</button>
      </div>
    );
  }

  // Si no está autenticado o no es paciente, redirigir
  if (!isLoggedIn || !user || user.role !== 'patient') {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="dashboard patient-dashboard">
      <h1>Panel del Paciente</h1>
      <div className="dashboard-welcome">
        <h2>Bienvenido/a, {user.name}</h2>
        <p>Desde aquí puede gestionar su información médica y citas.</p>
      </div>
      
      <div className="dashboard-cards">
        <div className="card">
          <h3>Próximas Citas</h3>
          <p>Vea sus próximas consultas médicas.</p>
          <a href="/paciente/citas" className="btn">Ver Citas</a>
        </div>
        
        <div className="card">
          <h3>Mi Historial Médico</h3>
          <p>Acceda a su historial médico completo.</p>
          <a href="/paciente/historial" className="btn">Ver Historial</a>
        </div>
        
        <div className="card">
          <h3>Mis Recetas</h3>
          <p>Revise sus recetas médicas actuales.</p>
          <a href="/paciente/recetas" className="btn">Ver Recetas</a>
        </div>
      </div>

      {/* Gestión del perfil */}
      <section className="dashboard-section">
        <h2>Mi Perfil</h2>
        <form className="form" onSubmit={handleSubmitProfile}>
          <div className="form-group">
            <label>Nombre completo:</label>
            <input
              type="text"
              name="fullName"
              value={profile.fullName}
              onChange={handleProfileChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Documento de identidad:</label>
            <input
              type="text"
              name="documentId"
              value={profile.documentId}
              onChange={handleProfileChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Fecha de nacimiento:</label>
            <input
              type="date"
              name="birthDate"
              value={profile.birthDate}
              onChange={handleProfileChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Información de contacto:</label>
            <input
              type="text"
              name="contactInfo"
              value={profile.contactInfo}
              onChange={handleProfileChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Cobertura de salud:</label>
            <input
              type="text"
              name="healthCoverage"
              value={profile.healthCoverage}
              onChange={handleProfileChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Actualizar Perfil
          </button>
        </form>
      </section>

      {/* Reserva de citas */}
      <section className="dashboard-section">
        <h2>Reservar Cita</h2>
        <form className="form" onSubmit={handleSubmitAppointment}>
          <div className="form-group">
            <label>Motivo:</label>
            <input
              type="text"
              name="reason"
              placeholder="Motivo de la consulta"
              value={newAppointment.reason}
              onChange={handleAppointmentChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Modalidad:</label>
            <select
              name="modality"
              value={newAppointment.modality}
              onChange={handleAppointmentChange}
              required
            >
              <option value="presencial">Presencial</option>
              <option value="remota">Remota</option>
            </select>
          </div>
          <div className="form-group">
            <label>Profesional:</label>
            <input
              type="text"
              name="professional"
              placeholder="Nombre del profesional"
              value={newAppointment.professional}
              onChange={handleAppointmentChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Fecha:</label>
            <input
              type="datetime-local"
              name="date"
              value={newAppointment.date}
              onChange={handleAppointmentChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            {editingAppointmentId ? 'Actualizar Cita' : 'Reservar Cita'}
          </button>
        </form>

        <h3>Mis Citas Programadas</h3>
        <div className="appointments-list">
          <h3>Mis Citas</h3>
          {appointmentsLoading ? (
            <p>Cargando citas...</p>
          ) : appointmentsError ? (
            <p>Error al cargar las citas: {appointmentsError}</p>
          ) : appointmentsList.length === 0 ? (
            <p>No tienes citas programadas</p>
          ) : (
            appointmentsList.map(appointment => (
              <div key={appointment.id} className="appointment-card">
                <span>
                  {appointment.date} - {appointment.reason} ({appointment.modality})
                </span>
                <div className="actions">
                  <button
                    className="btn btn-edit"
                    onClick={() => setEditingAppointmentId(appointment.id)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-delete"
                    onClick={() => handleCancelAppointment(appointment.id)}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Historial médico */}
      <section className="dashboard-section">
        <h2>Mi Historial Médico</h2>
        <ul className="list">
          {medicalHistory.map((record) => (
            <li key={record.id} className="list-item">
              <span>
                {record.date} - {record.diagnosis} ({record.treatment})
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default PatientDashboard;