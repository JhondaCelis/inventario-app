import { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/app-error';

/*
USO DE IA:
Consulta realizada: ¿Cómo centralizar el manejo de errores en una API Express usando TypeScript?
Sugerencia recibida: Crear una clase AppError para errores controlados y un middleware global para responder con un formato estándar.
Decisión técnica: Implementé AppError y errorMiddleware para evitar repetir respuestas de error en cada endpoint y mantener un manejo uniforme.
*/
export function errorMiddleware(
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      message: error.message
    });
    return;
  }

  res.status(500).json({
    message: 'Error interno del servidor'
  });
}