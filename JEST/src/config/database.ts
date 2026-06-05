import { Usuario } from '../models/usuario.model';

let usuarios: Usuario[] = [];
let nextId = 1;

export const db = {
  getAll(): Usuario[] {
    return [...usuarios];
  },

  getById(id: number): Usuario | undefined {
    return usuarios.find(u => u.id === id);
  },

  create(data: { nombre: string; correo: string }): Usuario {
    const nuevo: Usuario = { id: nextId++, ...data };
    usuarios.push(nuevo);
    return nuevo;
  },

  update(id: number, data: Partial<{ nombre: string; correo: string }>): Usuario | undefined {
    const idx = usuarios.findIndex(u => u.id === id);
    if (idx === -1) return undefined;
    usuarios[idx] = { ...usuarios[idx], ...data };
    return usuarios[idx];
  },

  delete(id: number): boolean {
    const idx = usuarios.findIndex(u => u.id === id);
    if (idx === -1) return false;
    usuarios.splice(idx, 1);
    return true;
  },

  reset(): void {
    usuarios = [];
    nextId = 1;
  },
};
