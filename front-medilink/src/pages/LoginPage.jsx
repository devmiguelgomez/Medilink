import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';

function LoginPage() {
  const [showLoginForm, setShowLoginForm] = useState(false);

  return (
    <div className="landing-page" style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #f3f9ff, #ffffff)',
      fontFamily: 'Outfit, sans-serif',
      padding: '2rem'
    }}>
      {/* Hero Section */}
      <section style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: '800px',
        margin: '2rem auto',
        background: '#fff',
        borderRadius: '1.5rem',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.06)',
        overflow: 'hidden',
        padding: '2rem',
        gap: '2rem'
      }}>
        {/* Text Section */}
        <div style={{
          flex: 1,
          padding: '1rem'
        }}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/4006/4006511.png"
            alt="MedLink Logo"
            style={{
              width: '50px',
              marginBottom: '1rem'
            }}
          />
          <h1 style={{
            fontSize: '1.8rem',
            color: '#1c3faa',
            marginBottom: '1rem',
            lineHeight: '1.4'
          }}>
            La atención médica del <br />
            <span style={{ color: '#e74c3c' }}>futuro comienza hoy</span>
          </h1>
          <p style={{
            fontSize: '1rem',
            color: '#555',
            marginBottom: '1.5rem',
            maxWidth: '90%'
          }}>
            Agenda tus citas, consulta tu historial y accede a profesionales certificados sin salir de casa. MedLink lo hace fácil.
          </p>
          <button
            onClick={() => setShowLoginForm(true)}
            style={{
              background: 'linear-gradient(90deg, #1c3faa, #4a90e2)',
              color: 'white',
              padding: '0.9rem 2rem',
              borderRadius: '30px',
              fontSize: '1rem',
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 8px 20px rgba(76, 115, 255, 0.2)',
              transition: '0.3s ease'
            }}
            onMouseOver={e => e.target.style.transform = 'scale(1.05)'}
            onMouseOut={e => e.target.style.transform = 'scale(1)'}
          >
            Comenzar Ahora
          </button>
        </div>

        {/* Image Section */}
        <div style={{
          flex: 0.9,
          borderRadius: '1rem',
          overflow: 'hidden'
        }}>
          <img
            src="https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&q=80"
            alt="Doctora con paciente"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '1rem'
            }}
          />
        </div>
      </section>

      {/* Statistics Section */}
      <section style={{
        maxWidth: '1000px',
        margin: '3rem auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '2rem',
        textAlign: 'center'
      }}>
        {[
          { number: '1000+', label: 'Profesionales', color: '#1c3faa' },
          { number: '50,000+', label: 'Pacientes Atendidos', color: '#00c6fb' },
          { number: '98%', label: 'Satisfacción', color: '#dc3545' }
        ].map((stat, index) => (
          <div key={index} style={{
            background: '#fff',
            padding: '2rem',
            borderRadius: '1rem',
            border: `1.5px solid ${stat.color}33`,
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.05)'
          }}>
            <h3 style={{
              fontSize: '2rem',
              color: stat.color,
              marginBottom: '0.5rem',
              fontWeight: 'bold'
            }}>{stat.number}</h3>
            <p style={{ color: '#666' }}>{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Testimonials Section */}
      <section style={{
        maxWidth: '1100px',
        margin: '2rem auto',
        padding: '2rem'
      }}>
        <h2 style={{
          textAlign: 'center',
          fontSize: '1.8rem',
          color: '#1c3faa',
          marginBottom: '2rem'
        }}>
          Lo que dicen nuestros usuarios
        </h2>
        <div style={{
          display: 'flex',
          overflowX: 'auto',
          gap: '1.5rem',
          paddingBottom: '1rem'
        }}>
          {[
            {
              image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80',
              text: '"El servicio es excepcional. Puedo agendar mis citas en minutos y sin complicaciones."',
              author: 'María García',
              role: 'Paciente'
            },
            {
              image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80',
              text: '"Como médico, valoro la organización y eficiencia que MedLink me ofrece."',
              author: 'Dr. Juan Pérez',
              role: 'Cardiólogo'
            },
            {
              image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80',
              text: '"Es una herramienta intuitiva que ha mejorado la relación con mis pacientes."',
              author: 'Dra. Ana Martínez',
              role: 'Pediatra'
            }
          ].map((testimonial, index) => (
            <div key={index} style={{
              background: '#fff',
              borderRadius: '1rem',
              padding: '1.5rem',
              boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
              minWidth: '280px',
              flex: '0 0 auto'
            }}>
              <img
                src={testimonial.image}
                alt={testimonial.author}
                style={{
                  width: '70px',
                  height: '70px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  marginBottom: '1rem'
                }}
              />
              <p style={{
                color: '#444',
                fontSize: '0.95rem',
                lineHeight: '1.5',
                marginBottom: '0.8rem'
              }}>{testimonial.text}</p>
              <strong style={{ color: '#1c3faa' }}>{testimonial.author}</strong>
              <span style={{ color: '#777' }}> • {testimonial.role}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Login Form Modal */}
      {showLoginForm && <LoginForm onClose={() => setShowLoginForm(false)} />}
    </div>
  );
}

export default LoginPage;
