import { InjectionToken } from '@angular/core';

/*
USO DE IA:
Consulta realizada: ¿Cómo configurar una URL base reutilizable para consumir una API desde Angular?
Sugerencia recibida: Usar un InjectionToken para evitar escribir la URL directamente en cada servicio.
Decisión técnica: Implementé API_URL como token de inyección para centralizar la URL del backend y facilitar cambios posteriores.
*/
export const API_URL = new InjectionToken<string>('API_URL');