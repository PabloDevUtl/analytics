# 📊 Analytics - Plataforma Full-Stack de Gestión y Servicios Tecnológicos

<p align="center">
  <img src="frontend/src/assets/iconWhatsApp.png" alt="Analytics Logo" width="100px" style="border-radius: 50%;" />
</p>

<h3 align="center">Analytics México</h3>
<p align="center">
  Soluciones tecnológicas integrales diseñadas para fortalecer la seguridad, eficiencia y desarrollo digital de empresas y hogares.
</p>

<p align="center">
  <a href="#"><img src="https://img.shields.io/badge/Desarrollador-Full--Stack-brightgreen.svg?style=for-the-badge" alt="Full Stack Developer" /></a>
  <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-19.x-blue.svg?style=for-the-badge&logo=react&logoColor=white" alt="React 19" /></a>
  <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-%3E%3D18-green.svg?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" /></a>
  <a href="https://expressjs.com/"><img src="https://img.shields.io/badge/Express-5.x-lightgrey.svg?style=for-the-badge&logo=express&logoColor=white" alt="Express 5" /></a>
  <a href="https://www.mongodb.com/atlas"><img src="https://img.shields.io/badge/MongoDB-Atlas-green.svg?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB Atlas" /></a>
</p>

---

## 📌 Índice
1. [🌟 Descripción del Proyecto](#-descripción-del-proyecto)
2. [🚀 Características Clave](#-características-clave)
3. [🛠️ Stack Tecnológico](#️-stack-tecnológico)
4. [🏗️ Arquitectura y Flujo](#️-arquitectura-y-flujo)
5. [📁 Estructura del Proyecto](#-estructura-del-proyecto)
6. [⚙️ Configuración e Instalación](#️-configuración-e-instalación)
7. [🔒 Seguridad Implementada](#-seguridad-implementada)
8. [👥 Roles y Permisos](#-roles-y-permisos)
9. [🧑‍💻 Perfil del Desarrollador](#-perfil-del-desarrollador)
10. [📞 Contacto y Redes](#-contacto-y-redes)

---

## 🌟 Descripción del Proyecto

Este proyecto consiste en una **Plataforma Web Full-Stack** de alto impacto para la empresa **Analytics**, la cual se especializa en ofrecer servicios en sistemas de seguridad, desarrollo de software, energías renovables, soporte TI y capacitación tecnológica en México.

La plataforma cuenta con dos vertientes principales:
1. **Portal Público:** Diseñado con una interfaz moderna, limpia y de gran dinamismo visual para enganchar a los clientes potenciales y detallar la oferta comercial de la empresa.
2. **CMS / Panel de Administración:** Un sistema robusto de gestión interna protegido por autenticación, que permite al equipo de **Analytics** realizar operaciones **CRUD** (Crear, Leer, Actualizar y Eliminar) sobre categorías y servicios, así como gestionar las cuentas de acceso.

---

## 🚀 Características Clave

### 🌐 Portal Público (Frontend)
* **Carrusel Hero Interactivo:** Presentación visual con transiciones automatizadas mediante variables CSS que cambian cada 5 segundos entre servicios destacados (Alarmas, Cámaras, Redes).
* **Catálogo Dinámico:** Renderización automatizada de categorías y servicios cargados en tiempo real desde la base de datos MongoDB.
* **Animaciones Fluídas (AOS):** Integración completa de la biblioteca *Animate On Scroll* para dotar al portal de una apariencia interactiva y fluida al navegar.
* **Formulario de Contacto Inteligente:** Comunicación directa utilizando **EmailJS**, validando las entradas del lado del cliente y pidiendo aceptación explícita de los avisos de privacidad (cumpliendo con la legislación de datos en México).
* **Botón de WhatsApp Flotante:** Acceso directo a soporte mediante enlaces interactivos automatizados.

### 🔐 Panel de Control Administrativo (CMS)
* **Login Seguro:** Flujo de acceso restringido mediante contraseñas cifradas y persistencia segura de sesión.
* **CRUD de Categorías:** Permite dar de alta categorías de negocio, asociarles imágenes descriptivas y habilitar/inhabilitar el estatus lógico para visualización en el portal.
* **CRUD de Servicios:** Panel para dar de alta nuevos servicios específicos dentro de cada categoría, permitiendo cargar textos descriptivos amplios y cambiar de forma dinámica su información.
* **Consola de SuperAdministrador:** Apartado de control total para la gestión de usuarios administradores de la plataforma, pudiendo modificar contraseñas y definir roles.

---

## 🛠️ Stack Tecnológico

### Frontend (Tecnologías del Cliente)
* **React (v19.0)** - Biblioteca principal para la construcción de interfaces de usuario.
* **Vite (v6.3)** - Herramienta de compilación rápida para desarrollo moderno de frontend.
* **React Router DOM (v7.6)** - Enrutamiento del cliente, controlando las vistas públicas y las rutas protegidas del panel administrativo.
* **Context API** - Manejo de estados compartidos en tiempo real (servicios y categorías).
* **React Bootstrap & Bootstrap 5** - Maquetación y componentes de diseño responsivo de alta calidad.
* **AOS (Animate On Scroll)** - Biblioteca de animación para transiciones en scroll.
* **EmailJS Browser** - Conexión nativa con el servicio de correo para notificaciones instantáneas de contacto.

### Backend (Servicios API REST)
* **Node.js** - Entorno de ejecución multiplataforma del servidor.
* **Express (v5.1)** - Framework para creación de servidores HTTP y APIs RESTful seguras.
* **Mongoose (v8.16)** - Modelado de datos orientada a objetos (ODM) para MongoDB.

### Base de Datos
* **MongoDB Atlas** - Base de datos NoSQL documental en la nube, optimizada para esquemas dinámicos (servicios, categorías, usuarios).

---

## 🏗️ Arquitectura y Flujo

El sistema opera bajo un flujo cliente-servidor completamente desacoplado (Decoupled Architecture), interactuando mediante peticiones HTTPS seguras tipo JSON:

```mermaid
graph TD
    subgraph Frontend (Cliente - React 19)
        User[Usuario / Admin] -->|Navegación| UI[Interfaz de React]
        UI -->|Petición de Datos| ClientAPI[Fetch/Axios Requests]
        UI -->|Envío de Formularios| EmailJS[EmailJS SDK]
    end

    subgraph Backend (Servidor - Node / Express)
        ClientAPI -->|REST HTTPS| Security{Middleware de Seguridad}
        Security -->|JWT / Rate Limit / Sanitización| Routes[Rutas de Express]
        Routes -->|Lógica Controlador| Controllers[Controladores REST]
        Controllers -->|Esquema de Datos| Models[Modelos Mongoose]
    end

    subgraph Base de Datos (NoSQL)
        Models <-->|Persistencia Dinámica| MongoDB[(MongoDB Atlas)]
    end
```

---

## 📁 Estructura del Proyecto

```text
analytics/
├── backend/                   # Código de servidor (API REST)
│   ├── src/
│   │   ├── controllers/       # Lógica principal de endpoints (auth, user, categorias, servicios)
│   │   ├── middleware/        # Protección de rutas por JWT y validadores de Express
│   │   ├── models/            # Esquemas de MongoDB (categoriaModel, servicioModel, userModel)
│   │   ├── routes/            # Definición y mapeo de rutas Express
│   │   └── index.js           # Inicialización de servicios, base de datos y servidor
│   └── package.json           # Dependencias backend (Bcrypt, JWT, Express, Helmet)
│
├── frontend/                  # Código de cliente (React + Vite)
│   ├── src/
│   │   ├── assets/            # Multimedia, logos, iconos
│   │   ├── components/        # Componentes de UI (NavigationBar, Footer, RequireAuth, Alerta)
│   │   ├── context/           # React Contexts (CategoriaContext, ServiciosContext)
│   │   ├── hooks/             # Custom Hooks del lado del cliente
│   │   ├── pages/             # Vistas (Home, CategoriasAdmin, ServiciosAdmin, ContactanosPage...)
│   │   ├── styles/            # Estilos personalizados (Vanilla CSS)
│   │   ├── App.jsx            # Enrutamiento de vistas públicas y protegidas
│   │   └── main.jsx           # Entrada de ejecución para renderizado DOM
│   ├── index.html             # Estructura base del HTML5
│   └── package.json           # Dependencias frontend (React, Bootstrap, AOS, EmailJS)
│
├── package.json               # Configuración raíz de orquestación (Concurrently)
└── README.md                  # Documentación técnica
```

---

## ⚙️ Configuración e Instalación

### 📋 Requisitos Previos
* **Node.js** (v18 o superior)
* **npm** (v9 o superior)
* Una base de datos en **MongoDB Atlas** (o servidor MongoDB local)

### 🔑 Variables de Entorno (`.env`)

#### 1. Backend (`/backend/.env`)
Crea un archivo `.env` en el directorio `backend/` con las siguientes propiedades:
```env
PORT=5000
MONGO_URI=mongodb+srv://<usuario>:<password>@cluster.mongodb.net/nombre_bd
JWT_SECRET=tu_clave_secreta_super_robusta
JWT_EXPIRES_IN=24h
```

#### 2. Frontend (`/frontend/.env.development` y `/frontend/.env.production`)
Crea tus archivos de variables de entorno en la carpeta `frontend/`:
```env
VITE_API_URL=http://localhost:5000
```

### 🚀 Instrucciones de Inicio

1. **Clonar e instalar dependencias:**
   ```bash
   git clone <URL-DEL-REPOSITORIO>
   cd analytics
   npm install
   ```

2. **Instalar dependencias del Backend:**
   ```bash
   cd backend
   npm install
   cd ..
   ```

3. **Ejecutar en Entorno de Desarrollo (Concurrentemente):**
   Desde la raíz del proyecto, corre el comando principal para arrancar el servidor backend y el servidor de desarrollo del frontend de manera simultánea:
   ```bash
   npm run dev
   ```
   * **Servidor Frontend (Vite):** Habilitado en `http://localhost:5173`
   * **Servidor Backend (API):** Habilitado en `http://localhost:5000`

---

## 🔒 Seguridad Implementada

* **Cifrado de Credenciales (Bcrypt):** Las contraseñas se encriptan de forma irreversible utilizando un factor de hasheo con salt rounds igual a 10.
* **Autenticación Estateless (JWT):** Gestión de autorización asíncrona mediante JSON Web Tokens para endpoints restrictivos.
* **Prevención de Inyecciones NoSQL:** Implementación de `express-mongo-sanitize` para depurar cualquier carácter no válido que intente manipular la base de datos a través de peticiones request.
* **Cabeceras HTTP Seguras (Helmet):** Configuración de políticas de seguridad en cabeceras de respuesta contra vulnerabilidades y clickjacking.
* **Rate Limiting:** Control de peticiones masivas por dirección IP con `express-rate-limit` para repeler ataques de fuerza bruta o saturación (DDoS).
* **Validación Rigurosa de Datos:** Sanitización y tipado forzado usando `express-validator` en los puntos críticos de entrada de la API.

---

## 👥 Roles y Permisos

El sistema maneja un control de acceso basado en dos niveles de administración representados por valores numéricos en base de datos:

| Código de Rol | Rol | Permisos |
| :---: | :---: | :--- |
| `1` | **SuperAdmin** | Control absoluto. Permite administrar cuentas de usuario (crear, modificar contraseñas y eliminar administradores) y realizar cambios en servicios/categorías. |
| `2` | **Admin** | Editor de contenidos. Habilitado para gestionar las categorías y los servicios en los paneles CRUD de administración. No cuenta con permisos para crear o alterar otros usuarios. |

---

## 🧑‍💻 Perfil del Desarrollador

* **Puesto:** Desarrollador Full-Stack
* **Contribuciones principales en el proyecto:**
  * **Diseño de Base de Datos:** Planeación y estructuración de los modelos de MongoDB de cara a la escalabilidad de servicios y jerarquías de categorías.
  * **Desarrollo Backend:** Construcción completa de la API REST en Node/Express con lógica CRUD segura y endpoints protegidos por autenticación modular.
  * **Diseño y Desarrollo Frontend:** Creación de componentes reutilizables y limpios usando React 19 y Bootstrap, asegurando excelente responsividad en dispositivos móviles y de escritorio.
  * **Arquitectura de Seguridad:** Integración de la suite de middlewares de seguridad (Helmet, Rate Limiter, Mongo Sanitize) y sistema de sesión de usuarios JWT.

---

## 📞 Contacto y Redes

Para cualquier duda técnica o información comercial respecto a **Analytics México**:
* **Correo Electrónico:** [contacto@analytics-mx.com](mailto:contacto@analytics-mx.com)
* **Teléfonos:** (477) 120 8831 | (477) 9179 276
* **Facebook:** [Analytics en Facebook](https://www.facebook.com/profile.php?id=61563983531205&mibextid=ZbWKwL)
* **Instagram:** [@analytics.mx](https://www.instagram.com/analytics.mx?igsh=YzExNWthdWUza29i)

---
*Desarrollado con altos estándares de calidad de software e innovación tecnológica.*
