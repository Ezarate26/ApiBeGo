# API Bego

La API Bego es una aplicación que proporciona funcionalidades relacionadas con rutas de entrega y órdenes. Permite gestionar y realizar seguimiento de las rutas de entrega, así como crear, actualizar y eliminar órdenes de entrega asociadas a esas rutas.

La API ofrece endpoints para realizar operaciones como registrar y autenticar usuarios, gestionar rutas de entrega, y administrar órdenes de entrega. Proporciona la capacidad de crear nuevas rutas, actualizar su información, obtener detalles de rutas existentes, crear órdenes de entrega, actualizar su estado y obtener información sobre las órdenes existentes.

Es una herramienta útil para empresas o servicios de entrega que desean automatizar y optimizar sus procesos de gestión de rutas y órdenes de entrega.

## Funcionalidades principales

- Registro de usuarios y autenticación.
- Gestión de rutas de entrega: creación, actualización, obtención y eliminación de rutas.
- Gestión de órdenes de entrega: creación, actualización, obtención y eliminación de órdenes de entrega.
- Asociación de órdenes de entrega a rutas existentes.
- Actualización del estado de las órdenes de entrega.

## Requisitos

- Node.js
- MongoDB


## Instalación

1. Clona el repositorio: `git clone https://github.com/tu-usuario/api-bego.git`
2. Ingresa al directorio del proyecto: `cd api-bego`
3. Instala las dependencias: `npm install`

## Configuración

Antes de ejecutar la aplicación, asegúrate de configurar las variables de entorno necesarias. Puedes crear un archivo `.env` en el directorio raíz del proyecto y definir las siguientes variables:

MONGODB_URI=<URI_de_conexión_de_MongoDB>
JWT_SECRET=<Secreto_para_generar_tokens_JWT>

## Uso

1. Inicia la aplicación: `npm start`
2. Accede a la API en `http://localhost:3000`

## Endpoints

### Auth

- Registro de Usuario: `POST /api/register`
- Inicio de sesión: `POST /api/login`

### RoutesDelivery

- Actualizar Ruta por ID: `PUT /routes/updateRoute/:id`
- Crear Rutas: `POST /routes/createRoutes`
- Obtener Ruta por ID: `GET /routes/getRouteById/:id`
- Obtener Todas las Rutas: `GET /routes/getAllRoutes`
- Eliminar Ruta por ID: `DELETE /routes/deleteRouteById/:id`

### Orders

- Crear Orden: `POST /orders/createOrders`
- Actualizar Estado de Orden por ID: `PUT /orders/updateStatusOrder/:id`
- Obtener Todas las Órdenes: `GET /orders/getOrders`
- Obtener Orden por ID: `GET /orders/getOrderById/:id`
- Actualizar Orden: `PUT /orders/updateOrders/:id`
- Eliminar Orden: `DELETE /orders/deleteOrders/:id`

