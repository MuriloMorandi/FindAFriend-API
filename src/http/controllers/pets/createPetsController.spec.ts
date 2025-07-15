import { app } from '@/http/server';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import { makePet } from '@/use-cases/factories/makePet.factory';
import { makeOrg } from '@/use-cases/factories/makeOrg.factory';

describe('Cadastro de Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('E possivel cadastrar um pet', async () => {
    const inputCreateOrg = {
      ...makeOrg(),
      id: undefined,
    };

    await request(app.server).post('/orgs').send(inputCreateOrg);

    const authResponse = await request(app.server).post('/orgs/auth').send({
      email: inputCreateOrg.email,
      password: inputCreateOrg.password,
    });

    const { token } = authResponse.body;

    const inputCreatePet = {
      ...makePet(),
      id: undefined,
    };

    const response = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send(inputCreatePet);

    expect(response.statusCode).toEqual(201);
    expect(response.body.pet.id).toEqual(expect.any(String));
    expect(response.body.pet).toEqual(
      expect.objectContaining({
        name: inputCreatePet.name,
        age: inputCreatePet.age,
      })
    );
  });
});
