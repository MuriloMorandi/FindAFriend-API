import { beforeEach, describe, expect, it } from 'vitest';
import { CreatePetsUseCase } from './createPetsUseCase';
import { PetsRepositoryInMemory } from '@/repositories/in-memory/petsRepositoryInMemory';
import { OrgsRepositoryInMemory } from '@/repositories/in-memory/orgsRepositoryInMemory';
import { OrgNotFoundError } from '../errors/orgNotFoundError';
import { makeOrg } from '../factories/makeOrg.factory';

describe('Caso de Uso: Criação de Pets', () => {
  let orgsRepository: OrgsRepositoryInMemory;
  let petsRepository: PetsRepositoryInMemory;
  let sut: CreatePetsUseCase;

  beforeEach(async () => {
    orgsRepository = new OrgsRepositoryInMemory();
    petsRepository = new PetsRepositoryInMemory(orgsRepository);
    sut = new CreatePetsUseCase(petsRepository, orgsRepository);
  });

  it('Deve ser possivel cadastrar um Pet', async () => {
    const org = await orgsRepository.create(makeOrg());

    const { pet } = await sut.execute({
      name: 'Alfredo',
      about: 'Cachoro',
      age: '12',
      size: 'Grande',
      energy_level: '2',
      environment: 'asdf',
      orgId: org.id,
    });

    expect(pet).toHaveProperty('id');
    expect(pet.id).toEqual(expect.any(String));
  });

  it('Não deve ser possivel cadastrar um Pet para uma organização inexistente', async () => {
    await expect(
      sut.execute({
        name: 'Alfredo',
        about: 'Cachoro',
        age: '12',
        size: 'Grande',
        energy_level: '2',
        environment: 'asdf',
        orgId: 'non-existing-id',
      })
    ).rejects.instanceOf(OrgNotFoundError);
  });
});
