-- Script para verificar los usuarios registrados en la base de datos

-- Mostrar todos los usuarios con sus campos (excepto la contraseña completa)
SELECT 
  id, 
  name, 
  email, 
  LEFT(password, 20) || '...' AS password_preview, 
  LENGTH(password) AS password_length,
  role,
  "createdAt",
  "updatedAt"
FROM users;

-- Verificar si hay usuarios con contraseñas no encriptadas (las contraseñas encriptadas con bcrypt comienzan con $2b$)
SELECT 
  id, 
  name, 
  email, 
  LEFT(password, 20) AS password_preview
FROM users 
WHERE password NOT LIKE '$2b$%' AND password NOT LIKE '$2a$%';
