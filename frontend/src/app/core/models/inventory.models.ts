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

export interface RegistrarMovimientoRequest {
  tipo: TipoMovimiento;
  cantidad: number;
  observacion?: string;
}

export interface RegistrarMovimientoResponse {
  message: string;
  producto: Producto;
  movimiento: Movimiento;
}