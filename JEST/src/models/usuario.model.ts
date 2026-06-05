export interface Usuario {
  id: number;
  nombre: string;
  correo: string;
}

export interface CrearUsuarioDTO {
  nombre: string;
  correo: string;
}

export interface ActualizarUsuarioDTO {
  nombre?: string;
  correo?: string;
}
