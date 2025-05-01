FROM node:20-alpine AS builder

# Configurar variables de entorno para reducir el tamaño de npm
ENV NPM_CONFIG_LOGLEVEL=warn
ENV NODE_ENV=production

WORKDIR /app

# Copiar solo package.json y package-lock.json primero
COPY package*.json ./

# Instalar dependencias con optimización de espacio
RUN npm ci --only=production && npm cache clean --force

# Copiar el código fuente
COPY . .

# Construir la aplicación
RUN npm run build

# Etapa de producción
FROM node:20-alpine

WORKDIR /app

# Copiar solo los archivos necesarios desde la etapa de construcción
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

# Exponer el puerto
EXPOSE 3000

# Configurar el comando de inicio
CMD ["node", "dist/main"]
