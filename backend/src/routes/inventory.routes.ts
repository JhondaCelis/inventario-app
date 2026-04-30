import { Router } from 'express';
import { movimientos, productos } from '../data/mock-data';
import { Alerta, Movimiento, TipoMovimiento } from '../models/inventory.models';
import { AppError } from '../errors/app-error';

export const inventoryRouter = Router();
const normalizarTexto = (valor: string): string =>
  valor
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();

/*
USO DE IA:
Consulta realizada: ¿Cómo hacer que el filtro por categoría sea más flexible en una API Express?
Sugerencia recibida: Normalizar los textos quitando tildes, convirtiendo a minúsculas y permitiendo coincidencias parciales.
Decisión técnica: Ajusté el filtro por categoría para evitar errores cuando el usuario escriba sin tilde o solo parte del nombre.
*/
inventoryRouter.get('/productos', (req, res) => {
  const { categoria, bajoMinimo } = req.query;

  let resultado = [...productos];

  if (categoria) {
    const categoriaBuscada = normalizarTexto(String(categoria));

    resultado = resultado.filter(producto =>
      normalizarTexto(producto.categoria).includes(categoriaBuscada)
    );
  }

  if (String(bajoMinimo).toLowerCase() === 'true') {
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
/*
USO DE IA:
Consulta realizada: ¿Cómo generar alertas de bajo stock a partir de productos mock en una API de inventario?
Sugerencia recibida: Filtrar los productos cuyo stock actual sea menor al stock mínimo y mapearlos a una estructura de alerta.
Decisión técnica: Implementé el endpoint /alertas calculando las alertas en memoria para mantener la solución simple y alineada con el uso de datos mock.
*/
inventoryRouter.get('/alertas', (req, res) => {
  const alertas: Alerta[] = productos
    .filter(producto => producto.stockActual < producto.stockMinimo)
    .map(producto => ({
      productoId: producto.id,
      nombreProducto: producto.nombre,
      categoria: producto.categoria,
      stockActual: producto.stockActual,
      stockMinimo: producto.stockMinimo,
      mensaje: `El producto ${producto.nombre} está por debajo del stock mínimo`
    }));

  res.json(alertas);
});