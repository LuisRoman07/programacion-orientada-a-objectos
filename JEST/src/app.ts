import express from 'express';
import { validarCreacion, validarActualizacion } from './middlewares/validarUsuario.middleware';
import {
  listarUsuarios,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
} from './controllers/usuario.controller';

const app = express();
app.use(express.json());

app.get('/usuarios', listarUsuarios);
app.post('/usuarios', validarCreacion, crearUsuario);
app.put('/usuarios/:id', validarActualizacion, actualizarUsuario);
app.delete('/usuarios/:id', eliminarUsuario);

export default app;
