# Etapa de compilación con optimización de espacio
FROM node:18-alpine as build

# Configurar variables de entorno para reducir el tamaño de npm
ENV NPM_CONFIG_LOGLEVEL=warn
ENV NODE_ENV=production

WORKDIR /app

# Copiar solo los archivos necesarios para instalar dependencias
COPY package*.json ./

# Instalar solo las dependencias de producción
RUN npm ci --only=production && npm cache clean --force

# Ahora copiar el resto del código fuente
COPY . .

# Construir la aplicación - con opciones para reducir el tamaño de la compilación
RUN npm run build -- --configuration=production

# Etapa de producción
FROM nginx:alpine

# Copiar la configuración de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar solo los archivos de la aplicación construida
COPY --from=build /app/dist/front-medilink/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
