import React from 'react';

function Footer() {
  return (
    <footer
      className="footer"
      style={{
        background: 'var(--primary)',
        color: '#fff',
        padding: '1.5rem 1rem', // Reducido el padding
        borderTopLeftRadius: '1rem', // Reducido el radio
        borderTopRightRadius: '1rem',
        boxShadow: '0 -4px 16px rgba(44, 78, 207, 0.08)',
        marginTop: '2rem',
        textAlign: 'center',
        position: 'relative'
      }}
    >
      <img
        src="https://cdn-icons-png.flaticon.com/512/4006/4006511.png"
        alt="MedLink Logo"
        style={{
          width: 36, // Reducido el tamaño
          marginBottom: 8,
          filter: 'brightness(0) invert(1)'
        }}
      />
      <h3 style={{ 
        fontFamily: 'Outfit, sans-serif',
        fontWeight: 600,
        fontSize: '1rem',
        margin: '0 0 0.5rem 0',
        letterSpacing: 0.5
      }}>
        MedLink - Conectando Salud y Tecnología
      </h3>
      <p style={{ 
        margin: 0,
        fontSize: '0.9rem',
        opacity: 0.9
      }}>
        &copy; {new Date().getFullYear()} MedLink. Todos los derechos reservados.
      </p>
      <div style={{ marginTop: 12, fontSize: '0.95rem' }}>
        <a
          href="mailto:contacto@medlink.com"
          style={{
            color: '#fff',
            margin: '0 1rem',
            textDecoration: 'underline',
            fontWeight: 500
          }}
        >
          contacto@medlink.com
        </a>
      </div>
    </footer>
  );
}

export default Footer;