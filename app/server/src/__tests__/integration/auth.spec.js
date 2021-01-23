import supertest from 'supertest';
import { app } from '../../app';
import db from '../../db';

const request = supertest(app);

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
  await db.seed.run();
});

afterAll(async () => {
  await db.destroy();
});

describe('routes : auth', () => {
  describe('POST /auth/login', () => {
    it('throws an error if user does not exist', async () => {
      const res = await request.post('/auth/login').send({
        email: 'invaild',
        password: 'password123',
      });

      expect(res.status).toBe(500);
      expect(res.type).toBe('application/json');
      expect(res.body.status).toBe('error');
      expect(res.body.message).toBe('invalid credentials');
    });

    it('throws an error if password incorrect', async () => {
      const res = await request.post('/auth/login').send({
        email: 'user@email.com',
        password: 'invalid',
      });

      expect(res.status).toBe(500);
      expect(res.type).toBe('application/json');
      expect(res.body.status).toBe('error');
      expect(res.body.message).toBe('invalid credentials');
    });

    it('returns a valid user with token', async () => {
      const res = await request.post('/auth/login').send({
        email: 'user@email.com',
        password: 'password123',
      });

      expect(res.status).toBe(200);
      expect(res.type).toBe('application/json');
      expect(res.body.status).toBe('success');
      expect(res.body).toHaveProperty('token');
      expect(res.body).toHaveProperty('user');
      expect(res.body.user).toHaveProperty('id');
      expect(res.body.user.id).toBe(1);
      expect(res.body.user).toHaveProperty('username');
      expect(res.body.user.username).toBe('new_user');
      expect(res.body.user).toHaveProperty('email');
      expect(res.body.user.email).toBe('user@email.com');
      expect(res.body.user).toHaveProperty('password');
    });
  });
});
