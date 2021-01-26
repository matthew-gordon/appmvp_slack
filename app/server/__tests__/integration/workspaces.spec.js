import supertest from 'supertest';
import { app } from '../../src/app';
import db from '../../src/db';

const request = supertest(app);

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
  await db.seed.run();
});

afterAll(async () => {
  await db.destroy();
});

describe('routes : workspaces', () => {
  describe('getWorkspacesByUserId', () => {
    it('should return all workspaces for user by id', async () => {
      const res = await request.get('/client/1/workspaces');

      expect(res.status).toBe(200);
      expect(res.type).toBe('application/json');
      expect(res.body).toHaveProperty('workspaces');
      expect(res.body.workspaces.length).toBe(2);
      expect(res.body.workspaces[0].cname).toBe('greenside');
      expect(res.body.workspaces[0].name).toBe('greenside');
    });
  });
});
