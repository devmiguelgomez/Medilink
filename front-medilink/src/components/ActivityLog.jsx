// src/components/ActivityLog.jsx
import React, { useState, useEffect } from 'react';
import { getActivities } from '../services/activityService';

function ActivityLog() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const data = await getActivities();
      setActivities(data);
    } catch (error) {
      console.error('Error al cargar actividades:', error);
    }
  };

  return (
    <div>
      <h2>Registro de Actividades</h2>
      <ul>
        {activities.map((activity) => (
          <li key={activity.id}>
            {activity.timestamp} - {activity.user} realizó: {activity.action}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ActivityLog;