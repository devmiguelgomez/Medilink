// src/mocks/handlers.js
import { rest } from 'msw';

export const handlers = [
  // Simular el endpoint de inicio de sesión
  rest.post('/api/login', (req, res, ctx) => {
    const { email, password } = req.body;

    if (email === 'usuario@example.com' && password === 'contraseña123') {
      return res(
        ctx.status(200),
        ctx.json({ message: 'Inicio de sesión exitoso', user: { id: 1, name: 'Juan Pérez', role: 'paciente' } })
      );
    } else {
      return res(
        ctx.status(401),
        ctx.json({ message: 'Credenciales incorrectas' })
      );
    }
  }),

  // Simular el endpoint para obtener el perfil del paciente
  rest.get('/api/patients/:id', (req, res, ctx) => {
    const { id } = req.params;

    return res(
      ctx.status(200),
      ctx.json({
        id,
        fullName: 'Juan Pérez',
        documentId: '12345678',
        birthDate: '1990-01-01',
        contactInfo: 'juan@example.com',
        healthCoverage: 'Plan Básico',
      })
    );
  }),
];