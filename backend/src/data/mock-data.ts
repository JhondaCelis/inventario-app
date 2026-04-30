import { Movimiento, Producto } from '../models/inventory.models';

/*
USO DE IA:
Consulta realizada: ¿Cómo simular datos de inventario sin usar una base de datos para una prueba técnica corta?
Sugerencia recibida: Usar arreglos en memoria con productos de ejemplo y una lista vacía para registrar movimientos.
Decisión técnica: Implementé datos mock en memoria para enfocarme en los endpoints, el tipado y las reglas básicas de stock sin agregar complejidad de base de datos.
*/
export const productos: Producto[] = [
  {
    id: 1,
    nombre: 'Mouse inalámbrico',
    categoria: 'Tecnología',
    stockActual: 8,
    stockMinimo: 5,
    precio: 45000
  },
  {
    id: 2,
    nombre: 'Teclado mecánico',
    categoria: 'Tecnología',
    stockActual: 3,
    stockMinimo: 5,
    precio: 180000
  },
  {
    id: 3,
    nombre: 'Silla ergonómica',
    categoria: 'Oficina',
    stockActual: 2,
    stockMinimo: 4,
    precio: 550000
  },
  {
    id: 4,
    nombre: 'Cuaderno universitario',
    categoria: 'Papelería',
    stockActual: 30,
    stockMinimo: 10,
    precio: 8000
  }
];

export const movimientos: Movimiento[] = [];