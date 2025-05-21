-- Script para inicializar la base de datos
SET client_encoding = 'UTF8';

-- Eliminar tablas si existen para recrearlas con la estructura correcta
DROP TABLE IF EXISTS users CASCADE;

-- Crear la tabla de usuarios con la estructura correcta
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'paciente',
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear un usuario administrativo para pruebas con contraseña encriptada (password123)
INSERT INTO users (name, email, password, role, "createdAt", "updatedAt")
VALUES (
  'Admin Usuario',
  'admin@medilink.com',
  '$2b$10$xJEr4E98LH5f9RWxq0QW6OKGcYV37uf4.mwl.IRGsdWNATCFC8Nfu',
  'administrativo',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
) ON CONFLICT (email) DO NOTHING;

-- Aplicar permisos adecuados
ALTER TABLE users OWNER TO postgres;

-- Mostrar un mensaje de confirmación
\echo 'Base de datos inicializada correctamente'
