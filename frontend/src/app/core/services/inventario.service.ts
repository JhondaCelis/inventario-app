import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../tokens/api-url.token';
import {
  Alerta,
  Producto,
  RegistrarMovimientoRequest,
  RegistrarMovimientoResponse
} from '../models/inventory.models';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = inject(API_URL);

  /*
  USO DE IA:
  Consulta realizada: ¿Cómo consumir endpoints de inventario desde Angular usando HttpClient y filtros opcionales?
  Sugerencia recibida: Crear un servicio con métodos separados para productos, movimientos y alertas, usando HttpParams para filtros.
  Decisión técnica: Implementé InventarioService para centralizar las llamadas HTTP y mantener el componente enfocado en la vista.
  */
  obtenerProductos(categoria?: string, bajoMinimo?: boolean): Observable<Producto[]> {
    let params = new HttpParams();

    if (categoria) {
      params = params.set('categoria', categoria);
    }

    if (bajoMinimo) {
      params = params.set('bajoMinimo', 'true');
    }

    return this.http.get<Producto[]>(`${this.apiUrl}/productos`, { params });
  }

  registrarMovimiento(
    productoId: number,
    request: RegistrarMovimientoRequest
  ): Observable<RegistrarMovimientoResponse> {
    return this.http.post<RegistrarMovimientoResponse>(
      `${this.apiUrl}/productos/${productoId}/movimiento`,
      request
    );
  }

  obtenerAlertas(): Observable<Alerta[]> {
    return this.http.get<Alerta[]>(`${this.apiUrl}/alertas`);
  }
}