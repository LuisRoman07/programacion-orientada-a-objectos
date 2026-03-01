
type Usuario = {
  password: string;
  rol: number;
};

const usuarios: Record<string, Usuario> = {
  admin: { password: "1234", rol: 1 },
  cliente1: { password: "abcd", rol: 2 },
  invitado1: { password: "0000", rol: 3 }
};

function autenticar(usuario: string, password: string): void {
  if (!usuarios[usuario]) {
    console.log("Usuario incorrecto ❌");
    return;
  }

  const usuarioEncontrado = usuarios[usuario];

  if (usuarioEncontrado.password !== password) {
    console.log("Contraseña incorrecta ❌");
    return;
  }

  console.log("Login correcto ");

  switch (usuarioEncontrado.rol) {
    case 1:
      console.log("Rol: Administrador");
      break;
    case 2:
      console.log("Rol: Cliente");
      break;
    case 3:
      console.log("Rol: Invitado");
      break;
    default:
      console.log("Rol desconocido");
  }
}


autenticar("admin", "1234");