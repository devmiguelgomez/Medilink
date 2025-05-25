// src/pages/NotFoundPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <h1>404</h1>
        <h2>Página no encontrada</h2>
        <p>Lo sentimos, la página que está buscando no existe.</p>
        <Link to="/" className="btn primary">Volver al inicio</Link>
      </div>
    </div>
  );
}

export default NotFoundPage;