import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import '../assets/styles.css';

function LoginForm({ onClose }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setCurrentUser, setIsLoggedIn } = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const userData = await login(formData);
      
      setCurrentUser({
        id: userData._id,
        name: userData.name,
        email: userData.email,
        role: userData.role
      });
      
      setIsLoggedIn(true);
      
      // Redireccionar según el rol del usuario
      if (userData.role === 'patient') {
        navigate('/paciente/dashboard');
      } else if (userData.role === 'doctor') {
        navigate('/profesional/dashboard');
      } else if (userData.role === 'admin') {
        navigate('/admin/dashboard');
      }
      
      if (onClose) onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Error al iniciar sesión. Por favor, intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container login-form">
      <h2>Iniciar Sesión</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            placeholder="ejemplo@correo.com"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            placeholder="Ingrese su contraseña"
          />
        </div>
        
        <button 
          type="submit" 
          className="btn primary" 
          disabled={loading}
        >
          {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
        </button>
      </form>
      
      <p className="form-footer">
        ¿No tiene una cuenta? <a href="/register">Regístrese aquí</a>
      </p>
    </div>
  );
}

export default LoginForm;