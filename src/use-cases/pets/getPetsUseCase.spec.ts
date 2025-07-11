import { beforeEach, describe, expect, it } from 'vitest';
import { PetsRepositoryInMemory } from '@/repositories/in-memory/petsRepositoryInMemory';
import { OrgsRepositoryInMemory } from '@/repositories/in-memory/orgsRepositoryInMemory';
import { GetPetUseCase } from './getPetUseCase';
import { ResourceNotFoundError } from '../errors/resourceNotFound';

describe("Caso de Uso: Get Pet", () => {
  let orgsRepository: OrgsRepositoryInMemory;
  let petsRepository: PetsRepositoryInMemory;
  let sut: GetPetUseCase;

  let idOrg: string;

  beforeEach(async () => {
    petsRepository = new PetsRepositoryInMemory();
    orgsRepository = new OrgsRepositoryInMemory();

    sut = new GetPetUseCase(petsRepository);

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

  it("Deve ser possivel recuperar os dados do Pet", async () => {
    await petsRepository.create({
      name: 'Alfredo',
      about: 'Cachoro',
      age: '12',
      size: 'Grande',
      energy_level: '2',
      environment: 'asdf',
      org_id: idOrg,
      id: 'id_test'
    })

    const { pet } = await sut.execute({ id: 'id_test' });

    expect(pet.id).toEqual('id_test')
  });

  it("Não deve ser possivel recuperar os dados do Pet", async () => {

    await expect(sut.execute({
      id: 'non-existing-id'
    })).rejects.instanceOf(ResourceNotFoundError);
  });

});
