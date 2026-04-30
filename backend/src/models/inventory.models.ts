/*
USO DE IA:
Consulta realizada: ¿Cómo modelar productos, movimientos de stock y alertas usando TypeScript para una API de inventario?
Sugerencia recibida: Crear interfaces para Producto, Movimiento y Alerta, además de un enum para controlar los tipos de movimiento permitidos.
Decisión técnica: Definí interfaces simples y un enum TipoMovimiento para mejorar el tipado y evitar valores inválidos en los movimientos de stock.
*/
export interface Producto {
  id: number;
  nombre: string;
  categoria: string;
  stockActual: number;
  stockMinimo: number;
  precio: number;
}

export enum TipoMovimiento {
  ENTRADA = 'ENTRADA',
  SALIDA = 'SALIDA',
  AJUSTE = 'AJUSTE'
}

export interface Movimiento {
  id: number;
  productoId: number;
  tipo: TipoMovimiento;
  cantidad: number;
  fecha: string;
  observacion?: string;
}

export interface Alerta {
  productoId: number;
  nombreProducto: string;
  categoria: string;
  stockActual: number;
  stockMinimo: number;
  mensaje: string;
}