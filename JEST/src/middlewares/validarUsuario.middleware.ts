import { Request, Response, NextFunction } from 'express';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validarCreacion(req: Request, res: Response, next: NextFunction): void {
  const { nombre, correo } = req.body;

  if (!nombre) {
    res.status(400).json({ error: 'El nombre es obligatorio' });
    return;
  }

  if (!correo) {
    res.status(400).json({ error: 'El correo es obligatorio' });
    return;
  }

  if (!EMAIL_REGEX.test(correo)) {
    res.status(400).json({ error: 'El correo no tiene un formato válido' });
    return;
  }

  next();
}

export function validarActualizacion(req: Request, res: Response, next: NextFunction): void {
  const { nombre, correo } = req.body;

  if (!nombre && !correo) {
    res.status(400).json({ error: 'Se requiere al menos un campo para actualizar' });
    return;
  }

  if (correo && !EMAIL_REGEX.test(correo)) {
    res.status(400).json({ error: 'El correo no tiene un formato válido' });
    return;
  }

  next();
}
