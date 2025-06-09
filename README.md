# Frontend - Gestión de Series Animadas

Este es el repositorio del frontend de la aplicación de gestión de series animadas, desarrollado con **Angular 19**. La aplicación permite realizar operaciones CRUD sobre series y está diseñada con una estructura modular clara y bien organizada.

## 📁 Estructura del Proyecto

El proyecto sigue una estructura modular para facilitar la escalabilidad y el mantenimiento:

- **`src/app/core`**: Contiene la configuración principal, incluyendo:
  - `guards/`: Definición de guardias de ruta.
  - `interceptors/`: Interceptores para modificar solicitudes HTTP.
  - `models/`: Modelos de datos utilizados en la aplicación.
  - `services/`: Servicios que manejan la lógica de negocio y comunicación con el backend.

- **`src/app/shared/components`**: Componentes reutilizables como:
  - `menu-lateral-administrador/`
  - `encabezado-administrador/`
  - `encabezado-invitado/`
  - `tarjeta-pelicula/`

- **`src/app/environments`**: Configuración de entornos:
  - `environment.development.ts`: Variables para el entorno de desarrollo.
  - `environment.docker.ts`: Configuración para el entorno en Docker.
  - `environment.ts`: Configuración general del entorno.
 
 ```
FRONTENDGESTIONDETAREAS/
│-- .github/workflows/        # Configuraciones para CI/CD en GitHub Actions
│   ├── deploy.yaml           # Configuración para despliegue en GitHub Pages
│
│-- config/                   # Archivos de configuración
│   ├── default.conf
│
│-- src/
│   ├── app/
│   │   ├── assets/          # Recursos estáticos (imágenes, fuentes, etc.)
│   │   ├── core/            # Código principal y servicios
│   │   │   ├── guards/      # Guards de autenticación y rutas
│   │   │   ├── interceptors/# Interceptores HTTP
│   │   │   ├── models/      # Modelos de datos
│   │   │   ├── services/    # Servicios de API y lógica de negocio
│   │   ├── pages/           # Páginas principales del frontend
│   │   ├── shared/          # Componentes reutilizables
│   │   │   ├── components/  # Componentes compartidos
│   │   ├── directives/      # Directivas personalizadas
│   │   ├── pipes/           # Pipes personalizados
│   │   ├── environments/    # Configuración de entornos (Desarrollo, Docker, Producción)
│   │   │   ├── environment.development.ts
│   │   │   ├── environment.docker.ts
│   │   │   ├── environment.ts
│   │   ├── app.routes.ts    # Rutas de la aplicación
│   │   ├── app.config.ts    # Configuración general
│   │   ├── app.component.*  # Componente principal
│   │
│   ├── index.html           # Archivo principal de la aplicación
│   ├── main.server.ts       # Configuración del servidor en Angular Universal
```

## 🚀 Tecnologías Utilizadas

- **Angular 19**: Framework principal.
- **TailwindCSS**: Para el diseño y estilización de la aplicación.
- **Google Fonts Icons**: Para los iconos de la interfaz.
- **Docker**: Para la contenedorización del frontend.
- **GitHub Actions**: Para CI/CD en el despliegue en GitHub Pages.

## 🔧 Instalación y Ejecución

### 1️⃣ Clonar el repositorio
```sh
    git clone https://github.com/Nayid4/FrontendGestionDeSeriesAnimadasAngular.git
    cd FrontendGestionDeSeriesAnimadasAngular
```

### 2️⃣ Instalar dependencias
```sh
    npm install
```

### 3️⃣ Ejecutar en desarrollo
```sh
    ng serve
```
La aplicación estará disponible en `http://localhost:4200`.

## 🐳 Ejecución con Docker

### Construcción y ejecución del contenedor
```sh
    docker-compose up --build
```
La aplicación estará expuesta en `http://localhost:4200` y usará la API dockerizada.

## 📡 Despliegue

Se han configurado tres formas de despliegue:

1. **GitHub Pages**: La aplicación está desplegada en [GitHub Pages](https://github.com/Nayid4/FrontendGestionDeSeriesAnimadasAngular) utilizando **CI/CD con GitHub Actions**. Se configuró un workflow que automatiza la construcción y el despliegue al realizar un push a la rama principal.

2. **Docker**: Se creó un `Dockerfile` y un `docker-compose.yml` para desplegar el frontend junto con la API en un entorno completamente contenedorizado.

3. **Desarrollo Local**: Puede ejecutarse con `ng serve` utilizando la API en local o en Azure.

## 📌 Justificación de Enfoques y Herramientas

- **Modularización**: El proyecto se estructuró en módulos bien definidos para facilitar la reutilización y mantenibilidad.
- **Angular + TailwindCSS**: Se optó por esta combinación para un desarrollo ágil y estilización flexible.
- **CI/CD con GitHub Actions**: Se automatizó el despliegue en GitHub Pages para facilitar la actualización de la aplicación.
- **Docker**: Permite replicar entornos de ejecución fácilmente, asegurando que el frontend funcione correctamente con la API.
- **Ciclo de Vida de Componentes**: Se utilizaron `OnInit` para inicialización y `OnDestroy` para limpiar suscripciones a servicios.

## 🤝 Contribución

Si deseas contribuir, realiza un **fork** del repositorio, crea una rama con tu funcionalidad y envía un **pull request**.

## 📜 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.



