# Proyecto de Gestión Médica

## 1. Requisitos Funcionales

| Código | Descripción |
|--------|-------------|
| RF1    | Gestión de usuarios (pacientes, profesionales, administrativos) con registro y autenticación. |
| RF2    | Reserva, modificación y cancelación de citas (presenciales/remotas) con validación de horarios. |
| RF3    | Mantenimiento de historiales médicos y prescripciones por parte de profesionales. |
| RF4    | Atenciones remotas con verificación de identidad y consentimiento del paciente. |
| RF5    | Generación de reportes analíticos (ej: uso de servicios, demografía de pacientes). |
| RF6    | Sistema de roles y permisos (paciente, profesional, administrativo). |

## 2. Requisitos No Funcionales

| Código | Descripción |
|--------|-------------|
| RNF1   | Escalabilidad para múltiples sedes médicas. |
| RNF2   | Seguridad de datos (encriptación, autenticación de dos factores). |
| RNF3   | Mantenibilidad mediante desarrollo modular (microservicios en Nest.js). |
| RNF4   | Usabilidad para pacientes con interfaz intuitiva (Angular). |
| RNF5   | Cumplimiento de normas sanitarias (HIPAA, GDPR) y registro de auditoría. |

## 3. Priorización de Atributos de Calidad

| Atributo       | Prioridad | Descripción |
|----------------|-----------|-------------|
| Seguridad      | Alta      | Protección de datos médicos sensibles y cumplimiento legal. |
| Escalabilidad  | Alta      | Soporte para múltiples sedes y crecimiento futuro. |
| Mantenibilidad | Alta      | Uso de microservicios y TypeScript para facilitar actualizaciones. |
| Usabilidad     | Media     | Interfaz amigable para pacientes y profesionales. |
| Rendimiento    | Media     | Respuesta rápida en consultas remotas y gestión de citas. |

## 4. ASR’s (Requisitos Arquitectónicamente Significativos)

| Código | Descripción |
|--------|-------------|
| ASR1   | Arquitectura de microservicios para módulos independientes (usuarios, citas, etc.). |
| ASR2   | Sistema de autenticación y autorización con JWT y roles. |
| ASR3   | Base de datos distribuida para historiales médicos y citas (ej: PostgreSQL). |
| ASR4   | Comunicación segura entre servicios con encriptación TLS. |
| ASR5   | Integración de WebSockets para atenciones remotas en tiempo real. |

## 5. Delegación de Funciones para los 4 Miembros

| Miembro   | Rol                   | Funciones |
|-----------|------------------------|-----------|
| Jairo Moran | Desarrollador Backend   | - Microservicio de usuarios (Nest.js).<br>- Autenticación con JWT y roles.<br>- API Gateway. |
| Aleja Altamiiran | Desarrollador Frontend  | - Interfaz de paciente (Angular).<br>- UI/UX para reservas y historiales.<br>- Integración con WebSockets. |
| Simon Hinojosa  | - Documentación técnica (Swagger).<br>- Pruebas unitarias y funcionales.<br>- Manual de usuario. |
| Miguel Gomez | DevOps y Analítica      | - Configuración de Docker y GitFlow.<br>- Despliegue en AWS/Google Cloud.<br>- Generación de reportes analíticos. |

