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

## 4. Estructura del Proyecto

```
/workspaces/Medilink
├── backend/                # Backend desarrollado con Nest.js
│   ├── src/                # Código fuente del backend
│   ├── Dockerfile          # Configuración de Docker para el backend
│   ├── scripts/            # Scripts de inicialización de la base de datos
│   └── README.md           # Documentación específica del backend
├── front-medilink/         # Frontend desarrollado con Angular
│   ├── src/                # Código fuente del frontend
│   ├── Dockerfile          # Configuración de Docker para el frontend
│   └── README.md           # Documentación específica del frontend
├── docker-compose.yml      # Configuración de Docker Compose
├── create_volume_dir.sh    # Script para crear directorios de volúmenes
└── README.md               # Documentación general del proyecto
```

## 5. Configuración con Docker

El proyecto utiliza Docker para facilitar el despliegue y la ejecución de los servicios. A continuación, se describen los servicios configurados:

### Servicios

1. **Frontend**:
   - Construido con Angular.
   - Disponible en el puerto `4200`.
   - Configuración en `front-medilink/Dockerfile`.

2. **Backend**:
   - Construido con Nest.js.
   - Disponible en el puerto `3000`.
   - Configuración en `backend/Dockerfile`.

3. **Base de Datos (PostgreSQL)**:
   - Imagen oficial de PostgreSQL.
   - Configuración de volúmenes para persistencia de datos.
   - Inicialización con scripts en `backend/scripts/`.

4. **PgAdmin (opcional)**:
   - Herramienta de administración para PostgreSQL.
   - Disponible en el puerto `5050`.

### Comandos para Iniciar el Proyecto

1. Crear el directorio para los volúmenes de PostgreSQL:
   ```bash
   ./create_volume_dir.sh
   ```

2. Construir y levantar los servicios con Docker Compose:
   ```bash
   docker-compose up --build
   ```

3. Detener los servicios:
   ```bash
   docker-compose down
   ```

## 6. ASR’s (Requisitos Arquitectónicamente Significativos)

| Código | Descripción |
|--------|-------------|
| ASR1   | Arquitectura de microservicios para módulos independientes (usuarios, citas, etc.). |
| ASR2   | Sistema de autenticación y autorización con JWT y roles. |
| ASR3   | Base de datos distribuida para historiales médicos y citas (ej: PostgreSQL). |
| ASR4   | Comunicación segura entre servicios con encriptación TLS. |
| ASR5   | Integración de WebSockets para atenciones remotas en tiempo real. |

## 7. Delegación de Funciones para los 4 Miembros

| Miembro   | Rol                   | Funciones |
|-----------|------------------------|-----------|
| Jairo Moran | Desarrollador Backend   | - Microservicio de usuarios (Nest.js).<br>- Autenticación con JWT y roles.<br>- API Gateway. |
| Aleja Altamiiran | Desarrollador Frontend  | - Interfaz de paciente (Angular).<br>- UI/UX para reservas y historiales.<br>- Integración con WebSockets. |
| Simon Hinojosa  | - Documentación técnica (Swagger).<br>- Pruebas unitarias y funcionales.<br>- Manual de usuario. |
| Miguel Gomez | DevOps y Analítica      | - Configuración de Docker y GitFlow.<br>- Generación de reportes analíticos. |

