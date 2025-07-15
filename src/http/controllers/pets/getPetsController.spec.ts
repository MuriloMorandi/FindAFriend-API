import { app } from '@/http/server';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import { makePet } from '@/use-cases/factories/makePet.factory';
import { makeOrg } from '@/use-cases/factories/makeOrg.factory';

describe('Recuperar dados do Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('E possivel recuperar os dados de um pet', async () => {
    const inputCreateOrg = {
      ...makeOrg({ city: 'city_test' }),
      id: undefined,
    };

    await request(app.server).post('/orgs').send(inputCreateOrg);

    const authResponse = await request(app.server).post('/orgs/auth').send({
      email: inputCreateOrg.email,
      password: inputCreateOrg.password,
    });

    const { token } = authResponse.body;

    await Promise.all(
      Array.from({ length: 5 }).map(() =>
        request(app.server)
          .post('/pets')
          .set('Authorization', `Bearer ${token}`)
          .send({
            ...makePet(),
            id: undefined,
          })
      )
    );

    const listPets = await request(app.server)
      .get('/pets')
      .query({ city: 'city_test', environment: 'indoor' });

    const response = await request(app.server).get(
      `/pets/${listPets.body.pets[0].id}`
    );

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        name: listPets.body.pets[0].name,
      })
    );
  });
});
