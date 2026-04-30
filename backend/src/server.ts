import express from 'express';
import cors from 'cors';
import { errorMiddleware } from './middlewares/error.middleware';

const app = express();
const port = 3000;

/*
USO DE IA:
Consulta realizada: ¿Cómo crear una base inicial de Express con TypeScript para una prueba técnica de inventario?
Sugerencia recibida: Configurar Express con cors, express.json y una ruta de salud para validar que el backend esté funcionando.
Decisión técnica: Implementé una configuración mínima con una ruta /api/health para verificar el servidor antes de construir los endpoints del inventario.
*/
app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Backend de inventario funcionando correctamente'
  });
});

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});