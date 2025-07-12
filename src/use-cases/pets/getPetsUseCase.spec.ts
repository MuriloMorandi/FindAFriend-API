import { beforeEach, describe, expect, it } from 'vitest';
import { PetsRepositoryInMemory } from '@/repositories/in-memory/petsRepositoryInMemory';
import { OrgsRepositoryInMemory } from '@/repositories/in-memory/orgsRepositoryInMemory';
import { GetPetUseCase } from './getPetUseCase';
import { ResourceNotFoundError } from '../errors/resourceNotFound';
import { makeOrg } from '../factories/makeOrg.factory';
import { makePet } from '../factories/makePet.factory';

describe("Caso de Uso: Get Pet", () => {
  let orgsRepository: OrgsRepositoryInMemory;
  let petsRepository: PetsRepositoryInMemory;
  let sut: GetPetUseCase;

  beforeEach(async () => {
    orgsRepository = new OrgsRepositoryInMemory();
    petsRepository = new PetsRepositoryInMemory(orgsRepository);
    sut = new GetPetUseCase(petsRepository);
  })

  it("Deve ser possivel recuperar os dados do Pet", async () => {
    const org = await orgsRepository.create(makeOrg())
    const pet = await petsRepository.create(makePet({ org_id: org.id }))

    const result = await sut.execute({ id: pet.id })

    expect(result.pet.id).toEqual(pet.id)
    expect(result.pet.name).toEqual(pet.name)
  });

  it("Não deve ser possivel recuperar os dados do Pet", async () => {

    await expect(sut.execute({
      id: 'non-existing-id'
    })).rejects.instanceOf(ResourceNotFoundError);
  });

});
