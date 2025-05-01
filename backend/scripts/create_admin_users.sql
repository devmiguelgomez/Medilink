-- Script para crear usuarios administrativos y profesionales en la base de datos

-- Nota: Las contraseñas están hasheadas con bcrypt
-- La contraseña para todos es "password123"
-- El hash debe ser generado con la biblioteca bcrypt de Node.js

-- Insertar usuario administrativo
INSERT INTO users (name, email, password, role, "createdAt", "updatedAt")
VALUES (
  'Admin Usuario',
  'admin@medilink.com',
  '$2b$10$xJEr4E98LH5f9RWxq0QW6OKGcYV37uf4.mwl.IRGsdWNATCFC8Nfu', -- password123
  'administrativo',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
) ON CONFLICT (email) DO NOTHING;

-- Insertar usuarios profesionales
INSERT INTO users (name, email, password, role, "createdAt", "updatedAt")
VALUES (
  'Dr. Juan Médico',
  'doctor@medilink.com',
  '$2b$10$xJEr4E98LH5f9RWxq0QW6OKGcYV37uf4.mwl.IRGsdWNATCFC8Nfu', -- password123
  'profesional',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
) ON CONFLICT (email) DO NOTHING;

INSERT INTO users (name, email, password, role, "createdAt", "updatedAt")
VALUES (
  'Dra. María Especialista',
  'doctora@medilink.com',
  '$2b$10$xJEr4E98LH5f9RWxq0QW6OKGcYV37uf4.mwl.IRGsdWNATCFC8Nfu', -- password123
  'profesional',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
) ON CONFLICT (email) DO NOTHING;

-- Verificar usuarios insertados
SELECT id, name, email, role FROM users;
