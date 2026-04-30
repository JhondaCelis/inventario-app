import { Router } from 'express';
import { movimientos, productos } from '../data/mock-data';
import { Movimiento, TipoMovimiento } from '../models/inventory.models';
import { AppError } from '../errors/app-error';

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

/*
USO DE IA:
Consulta realizada: ¿Cómo validar un movimiento de inventario antes de modificar el stock de un producto?
Sugerencia recibida: Validar que el producto exista, que el tipo de movimiento sea permitido, que la cantidad sea válida y que una salida no supere el stock disponible.
Decisión técnica: Implementé validaciones explícitas antes de actualizar el stock para evitar movimientos inválidos y mantener reglas de negocio fáciles de sustentar.
*/
inventoryRouter.post('/productos/:id/movimiento', (req, res, next) => {
  try {
    const productoId = Number(req.params.id);
    const { tipo, cantidad, observacion } = req.body;
    const cantidadNumerica = Number(cantidad);

    const producto = productos.find(item => item.id === productoId);

    if (!producto) {
      throw new AppError('Producto no encontrado', 404);
    }

    if (!Object.values(TipoMovimiento).includes(tipo)) {
      throw new AppError('Tipo de movimiento inválido');
    }

    if (!Number.isFinite(cantidadNumerica) || cantidadNumerica <= 0) {
      throw new AppError('La cantidad debe ser un número mayor a cero');
    }

    if (tipo === TipoMovimiento.SALIDA && producto.stockActual < cantidadNumerica) {
      throw new AppError('No hay stock suficiente para realizar la salida');
    }

    if (tipo === TipoMovimiento.ENTRADA) {
      producto.stockActual += cantidadNumerica;
    }

    if (tipo === TipoMovimiento.SALIDA) {
      producto.stockActual -= cantidadNumerica;
    }

    if (tipo === TipoMovimiento.AJUSTE) {
      producto.stockActual = cantidadNumerica;
    }

    const movimiento: Movimiento = {
      id: movimientos.length + 1,
      productoId,
      tipo,
      cantidad: cantidadNumerica,
      fecha: new Date().toISOString(),
      observacion
    };

    movimientos.push(movimiento);

    res.status(201).json({
      message: 'Movimiento registrado correctamente',
      producto,
      movimiento
    });
  } catch (error) {
    next(error);
  }
});