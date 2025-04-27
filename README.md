# Proyecto de Gestión Médica

## 1. Requisitos Funcionales

| Tipo                | Código | Descripción |
|---------------------|--------|-------------|
| Requisito Funcional  | RF1    | Gestión de usuarios (pacientes, profesionales, administrativos) con registro y autenticación. |
| Requisito Funcional  | RF2    | Reserva, modificación y cancelación de citas (presenciales/remotas) con validación de horarios. |
| ... (continúan los requisitos) |

## 2. Requisitos No Funcionales

| Tipo                   | Código | Descripción |
|-------------------------|--------|-------------|
| Requisito No Funcional   | RNF1   | Escalabilidad para múltiples sedes médicas. |
| ... (continúan los requisitos) |

## 3. Priorización de Atributos de Calidad

| Atributo     | Prioridad | Descripción |
|--------------|-----------|-------------|
| Seguridad    | Alta      | Protección de datos médicos sensibles y cumplimiento legal. |
| ... |

## 4. ASR’s (Requisitos Arquitectónicamente Significativos)

| Código | Descripción |
|--------|-------------|
| ASR1   | Arquitectura de microservicios para módulos independientes. |
| ... |

## 5. Delegación de Funciones

| Miembro   | Rol                  | Funciones |
|-----------|-----------------------|-----------|
| Miembro 1 | Desarrollador Backend  | - Microservicio de usuarios (Nest.js).<br>- Autenticación con JWT y roles.<br>- API Gateway. |
| ... |
