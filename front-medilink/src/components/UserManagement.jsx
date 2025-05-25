// src/components/UserManagement.jsx
import React, { useState, useEffect } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from '../services/userService';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: '', role: '', email: '' });
  const [editingUserId, setEditingUserId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUserId) {
        await updateUser(editingUserId, formData);
        setEditingUserId(null);
      } else {
        await createUser(formData);
      }
      setFormData({ name: '', role: '', email: '' });
      fetchUsers();
    } catch (error) {
      console.error('Error al guardar usuario:', error);
    }
  };

  const handleEdit = (user) => {
    setFormData(user);
    setEditingUserId(user.id);
  };

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      fetchUsers();
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
  };

  return (
    <div>
      <h2>Gestión de Usuarios</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="role"
          placeholder="Rol"
          value={formData.role}
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <button type="submit">{editingUserId ? 'Actualizar' : 'Crear'} Usuario</button>
      </form>

      <h3>Lista de Usuarios</h3>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.role} - {user.email}
            <button onClick={() => handleEdit(user)}>Editar</button>
            <button onClick={() => handleDelete(user.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserManagement;