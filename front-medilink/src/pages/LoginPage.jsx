import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

function LoginPage() {
  const { login } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ name: 'Usuario Ejemplo', role: 'paciente' });
    alert('Inicio de sesión exitoso');
  };

  return (
    <div className="login-page" style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e3f0ff 0%, #ffffff 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* Introducción de la empresa */}
      <section style={{
        background: '#fff',
        borderRadius: '1rem',
        boxShadow: '0 8px 24px rgba(0,123,255,0.08)',
        padding: '2.5rem 2rem 1.5rem 2rem',
        maxWidth: 420,
        width: '100%',
        marginBottom: '2rem',
        textAlign: 'center'
      }}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
          alt="MedLink Logo"
          style={{ width: 70, marginBottom: 12 }}
        />
        <h1 style={{ color: '#007bff', fontWeight: 700, fontSize: '2rem', marginBottom: 8 }}>
          Bienvenido a MedLink
        </h1>
        <p style={{ color: '#212529', fontSize: '1.1rem', marginBottom: 0 }}>
          Tu plataforma digital para conectar pacientes y profesionales de la salud de manera rápida, segura y eficiente.
        </p>
      </section>

      {/* Formulario de inicio de sesión */}
      <div className="form-container" style={{
        background: '#f8f9fa',
        borderRadius: '1rem',
        boxShadow: '0 4px 16px rgba(0,123,255,0.10)',
        padding: '2rem',
        maxWidth: 400,
        width: '100%',
        marginBottom: '2rem'
      }}>
        <h2 style={{ color: '#007bff', fontWeight: 700, marginBottom: 16 }}>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={credentials.email}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '0.9rem',
              marginBottom: '1rem',
              border: '1.5px solid #b6d4fe',
              borderRadius: '0.5rem',
              fontSize: '1rem'
            }}
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={credentials.password}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '0.9rem',
              marginBottom: '1rem',
              border: '1.5px solid #b6d4fe',
              borderRadius: '0.5rem',
              fontSize: '1rem'
            }}
          />
          <button
            type="submit"
            className="primary"
            style={{
              width: '100%',
              background: 'linear-gradient(90deg, #007bff 60%, #00c6fb 100%)',
              color: '#fff',
              fontWeight: 700,
              fontSize: '1.1rem',
              borderRadius: '2rem',
              padding: '0.9rem',
              marginBottom: 8,
              border: 'none',
              boxShadow: '0 2px 8px rgba(0,123,255,0.10)'
            }}
          >
            Iniciar Sesión
          </button>
        </form>
        <p className="forgot-password" style={{ textAlign: 'center', marginTop: 8 }}>
          <a href="/forgot-password" style={{ color: '#dc3545', fontWeight: 500 }}>
            ¿Olvidaste tu contraseña?
          </a>
        </p>
      </div>

      {/* Opiniones de usuarios */}
      <section className="testimonials" style={{
        maxWidth: 700,
        width: '100%',
        margin: '0 auto',
        marginBottom: '2rem'
      }}>
        <h2 style={{
          color: '#007bff',
          textAlign: 'center',
          fontWeight: 700,
          marginBottom: 18
        }}>
          Lo que dicen nuestros usuarios
        </h2>
        <div className="testimonial-cards" style={{
          display: 'flex',
          gap: '1.5rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <div className="testimonial-card" style={{
            background: '#fff',
            borderLeft: '5px solid #007bff',
            borderRadius: '0.75rem',
            boxShadow: '0 2px 8px rgba(0,123,255,0.07)',
            padding: '1.2rem 1.1rem',
            maxWidth: 220,
            minWidth: 180
          }}>
            <p style={{ fontStyle: 'italic', marginBottom: 8 }}>
              "MedLink ha simplificado mis citas médicas. ¡Altamente recomendado!"
            </p>
            <span style={{ color: '#dc3545', fontWeight: 600 }}>- María G., Paciente</span>
          </div>
          <div className="testimonial-card" style={{
            background: '#fff',
            borderLeft: '5px solid #00c6fb',
            borderRadius: '0.75rem',
            boxShadow: '0 2px 8px rgba(0,123,255,0.07)',
            padding: '1.2rem 1.1rem',
            maxWidth: 220,
            minWidth: 180
          }}>
            <p style={{ fontStyle: 'italic', marginBottom: 8 }}>
              "Como profesional, valoro la organización y seguridad de esta plataforma."
            </p>
            <span style={{ color: '#007bff', fontWeight: 600 }}>- Dr. Juan P., Cardiólogo</span>
          </div>
          <div className="testimonial-card" style={{
            background: '#fff',
            borderLeft: '5px solid #dc3545',
            borderRadius: '0.75rem',
            boxShadow: '0 2px 8px rgba(0,123,255,0.07)',
            padding: '1.2rem 1.1rem',
            maxWidth: 220,
            minWidth: 180
          }}>
            <p style={{ fontStyle: 'italic', marginBottom: 8 }}>
              "La atención remota es excelente. ¡Gracias por hacerlo posible!"
            </p>
            <span style={{ color: '#007bff', fontWeight: 600 }}>- Carlos R., Usuario</span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LoginPage;