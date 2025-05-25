FROM node:20-alpine AS builder

# Update packages to fix potential vulnerabilities
RUN apk update && apk upgrade --no-cache

# Configurar variables de entorno
ENV NPM_CONFIG_LOGLEVEL=warn

WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar TODAS las dependencias, incluyendo devDependencies
RUN npm install && npm cache clean --force

# Copiar el código fuente
COPY . .

# Construir la aplicación
RUN npm run build

# Etapa de producción
FROM node:20-alpine

# Update packages to fix potential vulnerabilities
RUN apk update && apk upgrade --no-cache

# Configurar variables de entorno para producción
ENV NODE_ENV=production

WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar solo dependencias de producción en la imagen final
RUN npm install --only=production && npm cache clean --force

# Copiar el código compilado desde la etapa de construcción
COPY --from=builder /app/dist ./dist

# Exponer el puerto
EXPOSE 3000

# Configurar el comando de inicio
CMD ["node", "dist/main"]
