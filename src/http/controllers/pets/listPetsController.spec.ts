import { app } from '@/http/server';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import { makePet } from '@/use-cases/factories/makePet.factory';
import { makeOrg } from '@/use-cases/factories/makeOrg.factory';
import type { Pets } from 'prisma/generated/prisma';

describe('Lista de Pets de uma cidade (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('E possivel listar os pets de uma cidade', async () => {
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
      Array.from({ length: 5 }).map((_, i) =>
        request(app.server)
          .post('/pets')
          .set('Authorization', `Bearer ${token}`)
          .send({
            ...makePet({
              environment: i % 2 ? 'indoor' : 'outdoor',
            }),
            id: undefined,
          })
      )
    );

    const response = await request(app.server)
      .get('/pets')
      .query({ city: 'city_test', environment: 'indoor' });

    expect(response.statusCode).toEqual(200);
    expect(response.body.pets).toHaveLength(2);
    expect(
      response.body.pets.every((pet: Pets) => pet.environment === 'indoor')
    ).toBe(true);
  });
});
