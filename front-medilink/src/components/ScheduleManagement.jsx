// src/components/ScheduleManagement.jsx
import React, { useState, useEffect } from 'react';
import { getSchedules, createSchedule, deleteSchedule } from '../services/scheduleService';

function ScheduleManagement() {
  const [schedules, setSchedules] = useState([]);
  const [formData, setFormData] = useState({ day: '', startTime: '', endTime: '' });

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const data = await getSchedules();
      setSchedules(data);
    } catch (error) {
      console.error('Error al cargar horarios:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createSchedule(formData);
      setFormData({ day: '', startTime: '', endTime: '' });
      fetchSchedules();
    } catch (error) {
      console.error('Error al guardar horario:', error);
    }
  };

  const handleDelete = async (scheduleId) => {
    try {
      await deleteSchedule(scheduleId);
      fetchSchedules();
    } catch (error) {
      console.error('Error al eliminar horario:', error);
    }
  };

  return (
    <div>
      <h2>Gestión de Horarios</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="day"
          placeholder="Día"
          value={formData.day}
          onChange={handleInputChange}
          required
        />
        <input
          type="time"
          name="startTime"
          placeholder="Hora de inicio"
          value={formData.startTime}
          onChange={handleInputChange}
          required
        />
        <input
          type="time"
          name="endTime"
          placeholder="Hora de fin"
          value={formData.endTime}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Agregar Horario</button>
      </form>

      <h3>Horarios Disponibles</h3>
      <ul>
        {schedules.map((schedule) => (
          <li key={schedule.id}>
            {schedule.day} - {schedule.startTime} a {schedule.endTime}
            <button onClick={() => handleDelete(schedule.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ScheduleManagement;