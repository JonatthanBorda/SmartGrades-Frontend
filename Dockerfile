
FROM node:22-alpine AS dev-deps

WORKDIR /app

# Copia los archivos de dependencias
COPY package.json package-lock.json ./

# Instala las dependencias
RUN npm install

# - - - -- - - - - Paso 2 -- - - - -- - - - -- 
FROM node:22-alpine AS builder
    
WORKDIR /app

COPY --from=dev-deps /app/node_modules ./node_modules
COPY . .

# Usa el entorno de desarrollo o producción según una variable de entorno
ARG ENV=docker
RUN npm run build --configuration=$ENV

# - - - -- - - - - Paso 3 -- - - - -- - - - -- 
FROM nginx:alpine AS prod

# Expone el puerto 4200 para el entorno de desarrollo
EXPOSE 4200

# Copia el build generado al directorio de Nginx
COPY --from=builder /app/dist/frontend-gestion-de-tareas/browser /usr/share/nginx/html


# Arranca Nginx
CMD ["nginx", "-g", "daemon off;"]
    