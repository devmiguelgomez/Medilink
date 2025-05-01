#!/bin/bash
# Script para crear el directorio del volumen de PostgreSQL

# Crear directorio si no existe
mkdir -p postgres-data

# Dar los permisos adecuados
chmod 777 postgres-data

echo "Directorio para volumen de PostgreSQL creado correctamente"
