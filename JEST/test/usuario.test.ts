import request from 'supertest';
import app from '../src/app';
import { db } from '../src/config/database';

beforeEach(() => {
  db.reset();
});

describe('POST /usuarios', () => {
  it('crea un usuario exitosamente con id, nombre y correo', async () => {
    const res = await request(app)
      .post('/usuarios')
      .send({ nombre: 'Ana', correo: 'ana@mail.com' });

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ id: 1, nombre: 'Ana', correo: 'ana@mail.com' });
  });

  it('retorna 400 si falta el nombre', async () => {
    const res = await request(app)
      .post('/usuarios')
      .send({ correo: 'ana@mail.com' });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('retorna 400 si falta el correo', async () => {
    const res = await request(app)
      .post('/usuarios')
      .send({ nombre: 'Ana' });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('retorna 400 si el correo tiene formato inválido', async () => {
    const res = await request(app)
      .post('/usuarios')
      .send({ nombre: 'Ana', correo: 'no-es-un-correo' });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('los IDs se incrementan secuencialmente', async () => {
    const r1 = await request(app).post('/usuarios').send({ nombre: 'A', correo: 'a@a.com' });
    const r2 = await request(app).post('/usuarios').send({ nombre: 'B', correo: 'b@b.com' });

    expect(r1.body.id).toBe(1);
    expect(r2.body.id).toBe(2);
  });
});

describe('GET /usuarios', () => {
  it('retorna un array vacío cuando no hay usuarios', async () => {
    const res = await request(app).get('/usuarios');

    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('retorna el listado de usuarios creados', async () => {
    await request(app).post('/usuarios').send({ nombre: 'Ana', correo: 'ana@mail.com' });
    await request(app).post('/usuarios').send({ nombre: 'Luis', correo: 'luis@mail.com' });

    const res = await request(app).get('/usuarios');

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
    expect(res.body[0]).toMatchObject({ nombre: 'Ana' });
    expect(res.body[1]).toMatchObject({ nombre: 'Luis' });
  });
});

describe('PUT /usuarios/:id', () => {
  it('actualiza el nombre de un usuario existente', async () => {
    await request(app).post('/usuarios').send({ nombre: 'Ana', correo: 'ana@mail.com' });

    const res = await request(app).put('/usuarios/1').send({ nombre: 'Ana Actualizada' });

    expect(res.status).toBe(200);
    expect(res.body.nombre).toBe('Ana Actualizada');
  });

  it('actualiza el correo de un usuario existente', async () => {
    await request(app).post('/usuarios').send({ nombre: 'Ana', correo: 'ana@mail.com' });

    const res = await request(app).put('/usuarios/1').send({ correo: 'nuevo@mail.com' });

    expect(res.status).toBe(200);
    expect(res.body.correo).toBe('nuevo@mail.com');
  });

  it('retorna 404 si el usuario no existe', async () => {
    const res = await request(app).put('/usuarios/99').send({ nombre: 'X' });

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('error');
  });

  it('retorna 400 si no se envía ningún campo', async () => {
    await request(app).post('/usuarios').send({ nombre: 'Ana', correo: 'ana@mail.com' });

    const res = await request(app).put('/usuarios/1').send({});

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});

describe('DELETE /usuarios/:id', () => {
  it('elimina un usuario existente y retorna 200', async () => {
    await request(app).post('/usuarios').send({ nombre: 'Ana', correo: 'ana@mail.com' });

    const res = await request(app).delete('/usuarios/1');

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('mensaje');
  });

  it('el usuario eliminado ya no aparece en GET', async () => {
    await request(app).post('/usuarios').send({ nombre: 'Ana', correo: 'ana@mail.com' });
    await request(app).delete('/usuarios/1');

    const res = await request(app).get('/usuarios');

    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('retorna 404 al intentar eliminar un usuario inexistente', async () => {
    const res = await request(app).delete('/usuarios/99');

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('error');
  });
});
