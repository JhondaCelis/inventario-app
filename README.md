# Inventario App

Implementación parcial de un sistema de gestión de inventarios para e-commerce.

El proyecto permite consultar productos, filtrar por categoría o bajo stock, registrar movimientos de inventario y visualizar alertas de productos por debajo del stock mínimo.

## Tecnologías utilizadas

### Backend

- Node.js
- TypeScript
- Express
- CORS
- Datos mock en memoria

### Frontend

- Angular
- TypeScript
- HttpClient
- Reactive Forms
- InjectionToken para URL base de API

### Control de versiones

- Git
- GitHub
- Rama de trabajo: `feature/inventario`

---

## Estructura del proyecto

```txt
inventario-app/
  backend/
    src/
      data/
      errors/
      middlewares/
      models/
      routes/
      server.ts

  frontend/
    src/
      app/
        core/
          models/
          services/
          tokens/
        features/
          inventario-dashboard/

  README.md

  Funcionalidades implementadas
Backend
Listado de productos.
Filtro por categoría.
Filtro por productos bajo mínimo.
Registro de movimientos de stock.
Tipos de movimiento: ENTRADA, SALIDA, AJUSTE.
Endpoint de alertas de bajo stock.
Manejo centralizado de errores.
Uso de interfaces TypeScript para tipado.
Datos mock en memoria.
Frontend
Dashboard de inventario.
Tabla de productos.
Filtros por categoría y bajo mínimo.
Formulario reactivo para registrar movimientos.
Sección visual de alertas de bajo stock.
Manejo de estados de carga, error y éxito.
Consumo del backend usando HttpClient.
Uso de InjectionToken para configurar la URL base de la API.
Endpoints del backend

La URL base del backend es:

http://localhost:3000/api
Health check
GET /health
Obtener productos
GET /productos

Con filtros opcionales:

GET /productos?categoria=Tecnología
GET /productos?bajoMinimo=true
GET /productos?categoria=Tecnología&bajoMinimo=true
Registrar movimiento
POST /productos/:id/movimiento

Ejemplo de body:

{
  "tipo": "SALIDA",
  "cantidad": 2,
  "observacion": "Venta realizada desde e-commerce"
}

Tipos permitidos:

ENTRADA
SALIDA
AJUSTE
Obtener alertas
GET /alertas
Instalación y ejecución
1. Clonar el repositorio
git clone URL_DEL_REPOSITORIO
cd inventario-app
Ejecutar backend

Entrar a la carpeta del backend:

cd backend

Instalar dependencias:

npm install

Ejecutar en modo desarrollo:

npm run dev

El backend queda disponible en:

http://localhost:3000/api

Para compilar:

npm run build
Ejecutar frontend

En otra terminal, entrar a la carpeta del frontend:

cd frontend

Instalar dependencias:

npm install

Ejecutar Angular:

npm start

El frontend queda disponible en:

http://localhost:4200
Decisiones técnicas
Se usaron datos mock en memoria para priorizar la implementación funcional dentro del tiempo disponible.
Se implementó un manejo centralizado de errores mediante AppError y errorMiddleware.
Se usaron interfaces TypeScript para mantener claridad en los contratos de productos, movimientos y alertas.
En Angular se usó InjectionToken para centralizar la URL base del backend.
El dashboard se mantuvo simple para facilitar su revisión y sustentación.
El filtro por categoría permite una búsqueda más flexible al normalizar texto y evitar problemas con mayúsculas o tildes.
Uso de IA

Durante el desarrollo se usó IA como apoyo para validar decisiones técnicas y acelerar la implementación.

Cada uso relevante fue documentado mediante comentarios estructurados en el código, indicando:

Consulta realizada.
Sugerencia recibida.
Decisión técnica tomada.

Ejemplo:

/*
USO DE IA:
Consulta realizada: ¿Cómo centralizar el manejo de errores en una API Express usando TypeScript?
Sugerencia recibida: Crear una clase AppError para errores controlados y un middleware global.
Decisión técnica: Implementé AppError y errorMiddleware para mantener respuestas de error uniformes.
*/
Rama de desarrollo

El desarrollo se realizó sobre la rama:

feature/inventario
Autor

Jhon Dairo Celis Quintero
