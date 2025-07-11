import { beforeEach, describe, expect, it } from 'vitest';
import { CreatePetsUseCase } from './createPetsUseCase';
import { PetsRepositoryInMemory } from '@/repositories/in-memory/petsRepositoryInMemory';
import { OrgsRepositoryInMemory } from '@/repositories/in-memory/orgsRepositoryInMemory';
import { OrgNotFoundError } from '../errors/orgNotFoundError';

describe("Caso de Uso: Criação de Pets", () => {
  let orgsRepository: OrgsRepositoryInMemory;
  let petsRepository: PetsRepositoryInMemory;
  let sut: CreatePetsUseCase;

  let idOrg: string;

  beforeEach(async () => {
    petsRepository = new PetsRepositoryInMemory();
    orgsRepository = new OrgsRepositoryInMemory();

    sut = new CreatePetsUseCase(petsRepository, orgsRepository);

    const org = await orgsRepository.create({
      name: "Org Test",
      author_name: "John Doe",
      email: "john@org.com",
      whatsapp: "123456789",
      password: "123456",
      cep: "12345-000",
      state: "SP",
      city: "São Paulo",
      neighborhood: "Centro",
      street: "Rua A",
      latitude: -23.5,
      longitude: -46.6,
    });

    idOrg = org.id;
  })

  it("Deve ser possivel cadastrar um Pet", async () => {

    const input = {
      name: 'Alfredo',
      about: 'Cachoro',
      age: '12',
      size: 'Grande',
      energy_level: '2',
      environment: 'asdf',
      idOrg: idOrg,
    };

    const { pet } = await sut.execute(input);

    expect(pet).toHaveProperty('id')
    expect(pet.id).toEqual(expect.any(String))

  });

  it("Não deve ser possivel cadastrar um Pet para uma organização inexistente", async () => {

    const input = {
      name: 'Alfredo',
      about: 'Cachoro',
      age: '12',
      size: 'Grande',
      energy_level: '2',
      environment: 'asdf',
      idOrg: 'non-existing-id',
    };

    await expect(sut.execute(input)).rejects.instanceOf(OrgNotFoundError);
  });

});
