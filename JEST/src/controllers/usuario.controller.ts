import { Request, Response } from 'express';
import { db } from '../config/database';

export function listarUsuarios(req: Request, res: Response): void {
  res.status(200).json(db.getAll());
}

export function crearUsuario(req: Request, res: Response): void {
  const { nombre, correo } = req.body;
  const usuario = db.create({ nombre, correo });
  res.status(201).json(usuario);
}

export function actualizarUsuario(req: Request, res: Response): void {
  const id = Number(req.params.id);
  const { nombre, correo } = req.body;

  const actualizado = db.update(id, { nombre, correo });
  if (!actualizado) {
    res.status(404).json({ error: 'Usuario no encontrado' });
    return;
  }

  res.status(200).json(actualizado);
}

export function eliminarUsuario(req: Request, res: Response): void {
  const id = Number(req.params.id);
  const eliminado = db.delete(id);

  if (!eliminado) {
    res.status(404).json({ error: 'Usuario no encontrado' });
    return;
  }

  res.status(200).json({ mensaje: 'Usuario eliminado correctamente' });
}
