import { Router } from 'express';
import { productos } from '../data/mock-data';

export const inventoryRouter = Router();

/*
USO DE IA:
Consulta realizada: ¿Cómo implementar filtros opcionales en un endpoint GET de Express con TypeScript?
Sugerencia recibida: Leer los query params y aplicar filtros progresivos sobre el arreglo de productos.
Decisión técnica: Implementé filtros simples por categoría y bajo mínimo para mantener el endpoint claro, tipado y fácil de probar.
*/
inventoryRouter.get('/productos', (req, res) => {
  const { categoria, bajoMinimo } = req.query;

  let resultado = [...productos];

  if (categoria) {
    resultado = resultado.filter(
      producto =>
        producto.categoria.toLowerCase() === String(categoria).toLowerCase()
    );
  }

  if (bajoMinimo === 'true') {
    resultado = resultado.filter(
      producto => producto.stockActual < producto.stockMinimo
    );
  }

  res.json(resultado);
});