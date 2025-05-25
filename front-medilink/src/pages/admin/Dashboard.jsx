// src/pages/admin/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from '../../services/userService';
import {
  getSchedules,
  createSchedule,
  deleteSchedule,
} from '../../services/scheduleService';
import { getActivities } from '../../services/activityService';
import styles from './Dashboard.module.css';
import DatePicker from 'react-datepicker'; // Importa el componente DatePicker
import 'react-datepicker/dist/react-datepicker.css'; // Asegúrate de importar los estilos aquí también si no lo hiciste en el archivo principal

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [formDataUser, setFormDataUser] = useState({ name: '', role: '', email: '' });
  const [editingUserId, setEditingUserId] = useState(null);

  const [schedules, setSchedules] = useState([]);
  const [formDataSchedule, setFormDataSchedule] = useState({ day: '', startTime: '', endTime: '' });
  const [selectedDate, setSelectedDate] = useState(null); // Nuevo estado para la fecha seleccionada

  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetchUsers();
    fetchSchedules();
    fetchActivities();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
    }
  };

  const handleUserInputChange = (e) => {
    const { name, value } = e.target;
    setFormDataUser({ ...formDataUser, [name]: value });
  };

  const handleSubmitUser = async (e) => {
    e.preventDefault();
    try {
      if (editingUserId) {
        await updateUser(editingUserId, formDataUser);
        setEditingUserId(null);
      } else {
        await createUser(formDataUser);
      }
      setFormDataUser({ name: '', role: '', email: '' });
      fetchUsers();
    } catch (error) {
      console.error('Error al guardar usuario:', error);
    }
  };

  const handleEditUser = (user) => {
    setFormDataUser(user);
    setEditingUserId(user.id);
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      fetchUsers();
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
  };

  const fetchSchedules = async () => {
    try {
      const data = await getSchedules();
      setSchedules(data);
    } catch (error) {
      console.error('Error al cargar horarios:', error);
    }
  };

  const handleScheduleInputChange = (e) => {
    const { name, value } = e.target;
    setFormDataSchedule({ ...formDataSchedule, [name]: value });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    // Formatea la fecha al formato que esperas para tu backend (ej: YYYY-MM-DD)
    const formattedDate = date ? date.toLocaleDateString() : '';
    setFormDataSchedule({ ...formDataSchedule, day: formattedDate });
  };

  const handleSubmitSchedule = async (e) => {
    e.preventDefault();
    try {
      await createSchedule(formDataSchedule);
      setFormDataSchedule({ day: '', startTime: '', endTime: '' });
      setSelectedDate(null); // Resetea la fecha seleccionada
      fetchSchedules();
    } catch (error) {
      console.error('Error al guardar horario:', error);
    }
  };

  const handleDeleteSchedule = async (scheduleId) => {
    try {
      await deleteSchedule(scheduleId);
      fetchSchedules();
    } catch (error) {
      console.error('Error al eliminar horario:', error);
    }
  };

  const fetchActivities = async () => {
    try {
      const data = await getActivities();
      setActivities(data);
    } catch (error) {
      console.error('Error al cargar actividades:', error);
    }
  };

  return (
    <div className={styles.adminDashboard}>
      <h1 className={styles.dashboardTitle}>Panel de Administración</h1>

      {/* Gestión de Usuarios */}
      <section className={styles.dashboardSection}>
        <h2 className={styles.sectionTitle}>Gestión de Usuarios</h2>
        <form className={styles.form} onSubmit={handleSubmitUser}>
          <div className={styles.formGroup}>
            <label>Nombre:</label>
            <input
              type="text"
              name="name"
              placeholder="Nombre"
              value={formDataUser.name}
              onChange={handleUserInputChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Rol:</label>
            <input
              type="text"
              name="role"
              placeholder="Rol"
              value={formDataUser.role}
              onChange={handleUserInputChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Correo electrónico:</label>
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={formDataUser.email}
              onChange={handleUserInputChange}
              required
            />
          </div>
          <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`}>
            {editingUserId ? 'Actualizar Usuario' : 'Crear Usuario'}
          </button>
        </form>

        <h3 className={styles.sectionSubtitle}>Lista de Usuarios</h3>
        <ul className={styles.list}>
          {users.map((user) => (
            <li key={user.id} className={styles.listItem}>
              <span>{user.name} - {user.role} - {user.email}</span>
              <div className={styles.actions}>
                <button className={`${styles.btn} ${styles.btnEdit}`} onClick={() => handleEditUser(user)}>
                  Editar
                </button>
                <button className={`${styles.btn} ${styles.btnDelete}`} onClick={() => handleDeleteUser(user.id)}>
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Configuración de Horarios */}
      <section className={styles.dashboardSection}>
        <h2 className={styles.sectionTitle}>Configuración de Horarios</h2>
        <form className={styles.form} onSubmit={handleSubmitSchedule}>
          <div className={styles.formGroup}>
            <label>Día:</label>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy" // O el formato que prefieras
              placeholderText="Selecciona un día"
              className={`${styles.formControl} ${styles.input}`} // Puedes añadir tus propios estilos si lo deseas
            />
          </div>
          <div className={styles.formGroup}>
            <label>Hora de inicio:</label>
            <input
              type="time"
              name="startTime"
              placeholder="Hora de inicio"
              value={formDataSchedule.startTime}
              onChange={handleScheduleInputChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Hora de fin:</label>
            <input
              type="time"
              name="endTime"
              placeholder="Hora de fin"
              value={formDataSchedule.endTime}
              onChange={handleScheduleInputChange}
              required
            />
          </div>
          <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`}>Agregar Horario</button>
        </form>

        <h3 className={styles.sectionSubtitle}>Horarios Disponibles</h3>
        <ul className={styles.list}>
          {schedules.map((schedule) => (
            <li key={schedule.id} className={styles.listItem}>
              <span>{schedule.day} - {schedule.startTime} a {schedule.endTime}</span>
              <button className={`${styles.btn} ${styles.btnDelete}`} onClick={() => handleDeleteSchedule(schedule.id)}>
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Registro de Actividades */}
      <section className={styles.dashboardSection}>
        <h2 className={styles.sectionTitle}>Registro de Actividades</h2>
        <ul className={styles.list}>
          {activities.map((activity) => (
            <li key={activity.id} className={styles.listItem}>
              <span>{activity.timestamp} - {activity.user} realizó: {activity.action}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Dashboard;