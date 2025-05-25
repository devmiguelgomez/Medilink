// src/mocks/browser.js
import { setupWorker } from 'msw';
import { handlers } from './handlers';

// Configurar el mock server
export const worker = setupWorker(...handlers);