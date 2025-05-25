import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

function LoginForm({ onClose }) {
  const { login } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    login(credentials);
  };

  return (
    <div className="login-modal-overlay" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(5px)'
    }}>
      <div className="login-modal" style={{
        background: 'white',
        borderRadius: '1rem',
        width: '90%',
        maxWidth: '400px',
        position: 'relative',
        animation: 'slideIn 0.3s ease-out',
        overflow: 'hidden'
      }}>
        <div style={{
          background: 'linear-gradient(90deg, #007bff 0%, #00c6fb 100%)',
          padding: '2rem',
          textAlign: 'center',
          color: 'white'
        }}>
          <h2 style={{ 
            fontSize: '1.5rem',
            fontWeight: 'bold',
            marginBottom: '0.5rem'
          }}>
            Bienvenido de nuevo
          </h2>
          <p>Accede a tu cuenta para continuar</p>
        </div>
        
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            right: '1rem',
            top: '1rem',
            background: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '30px',
            height: '30px',
            fontSize: '1.2rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}
        >
          ×
        </button>

        <form onSubmit={handleSubmit} style={{ padding: '2rem' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#444',
              fontSize: '0.9rem'
            }}>
              Correo electrónico
            </label>
            <input
              type="email"
              value={credentials.email}
              onChange={e => setCredentials({...credentials, email: e.target.value})}
              style={{
                width: '100%',
                padding: '0.8rem',
                borderRadius: '0.5rem',
                border: '2px solid #e1e1e1',
                transition: 'border-color 0.2s',
                outline: 'none'
              }}
              onFocus={e => e.target.style.borderColor = '#007bff'}
              onBlur={e => e.target.style.borderColor = '#e1e1e1'}
              required
            />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#444',
              fontSize: '0.9rem'
            }}>
              Contraseña
            </label>
            <input
              type="password"
              value={credentials.password}
              onChange={e => setCredentials({...credentials, password: e.target.value})}
              style={{
                width: '100%',
                padding: '0.8rem',
                borderRadius: '0.5rem',
                border: '2px solid #e1e1e1',
                transition: 'border-color 0.2s',
                outline: 'none'
              }}
              onFocus={e => e.target.style.borderColor = '#007bff'}
              onBlur={e => e.target.style.borderColor = '#e1e1e1'}
              required
            />
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '0.8rem',
              background: 'linear-gradient(90deg, #007bff 0%, #00c6fb 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '2rem',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={e => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 4px 15px rgba(0,123,255,0.3)';
            }}
            onMouseOut={e => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            Iniciar Sesión
          </button>

          <p style={{
            textAlign: 'center',
            marginTop: '1rem',
            fontSize: '0.9rem',
            color: '#666'
          }}>
            ¿Olvidaste tu contraseña?{' '}
            <a
              href="#"
              style={{
                color: '#007bff',
                textDecoration: 'none',
                fontWeight: '500'
              }}
            >
              Recuperar
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;