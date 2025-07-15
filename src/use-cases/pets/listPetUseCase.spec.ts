import { beforeEach, describe, expect, it } from 'vitest';
import { PetsRepositoryInMemory } from '@/repositories/in-memory/petsRepositoryInMemory';
import { OrgsRepositoryInMemory } from '@/repositories/in-memory/orgsRepositoryInMemory';
import { ListPetUseCase } from './listPetUseCase';
import { makePet } from '../factories/makePet.factory';
import { makeOrg } from '../factories/makeOrg.factory';

describe('Caso de Uso: Get Pet', () => {
  let orgsRepository: OrgsRepositoryInMemory;
  let petsRepository: PetsRepositoryInMemory;
  let sut: ListPetUseCase;

  beforeEach(async () => {
    orgsRepository = new OrgsRepositoryInMemory();
    petsRepository = new PetsRepositoryInMemory(orgsRepository);

    sut = new ListPetUseCase(petsRepository);
  });

  it('Deve ser possivel listar os pets de uma cidade', async () => {
    const org = await orgsRepository.create(makeOrg({ city: 'city1' }));
    await petsRepository.create(makePet({ org_id: org.id }));
    await petsRepository.create(makePet({ org_id: org.id }));

    const org2 = await orgsRepository.create(makeOrg({ city: 'city2' }));
    await petsRepository.create(makePet({ org_id: org2.id }));

    const { pets } = await sut.execute({ city: org.city });

    expect(pets).toHaveLength(2);

    const { pets: pets2 } = await sut.execute({ city: org2.city });
    expect(pets2).toHaveLength(1);
  });

  it("Deve ser possivel listar os pets de uma cidade filtrando por 'age'", async () => {
    const org = await orgsRepository.create(makeOrg({ city: 'city1' }));
    await petsRepository.create(makePet({ org_id: org.id, age: '1' }));
    await petsRepository.create(makePet({ org_id: org.id, age: '1' }));
    await petsRepository.create(makePet({ org_id: org.id, age: '2' }));

    const org2 = await orgsRepository.create(makeOrg({ city: 'city2' }));
    await petsRepository.create(makePet({ org_id: org2.id, age: '1' }));
    await petsRepository.create(makePet({ org_id: org2.id, age: '2' }));

    const { pets } = await sut.execute({ city: org.city, age: '1' });
    expect(pets).toHaveLength(2);

    const { pets: pets2 } = await sut.execute({ city: org2.city, age: '3' });
    expect(pets2).toHaveLength(0);
  });

  it("Deve ser possivel listar os pets de uma cidade filtrando por 'size'", async () => {
    const org = await orgsRepository.create(makeOrg({ city: 'city1' }));
    await petsRepository.create(makePet({ org_id: org.id, size: 'small' }));
    await petsRepository.create(makePet({ org_id: org.id, size: 'small' }));
    await petsRepository.create(makePet({ org_id: org.id, size: 'medium' }));

    const org2 = await orgsRepository.create(makeOrg({ city: 'city2' }));
    await petsRepository.create(makePet({ org_id: org2.id, size: 'small' }));
    await petsRepository.create(makePet({ org_id: org2.id, size: 'medium' }));

    const { pets } = await sut.execute({ city: org.city, size: 'small' });
    expect(pets).toHaveLength(2);

    const { pets: pets2 } = await sut.execute({
      city: org2.city,
      size: 'large',
    });
    expect(pets2).toHaveLength(0);
  });

  it("Deve ser possivel listar os pets de uma cidade filtrando por 'energy_level'", async () => {
    const org = await orgsRepository.create(makeOrg({ city: 'city1' }));

    await petsRepository.create(
      makePet({ org_id: org.id, energy_level: 'low' })
    );
    await petsRepository.create(
      makePet({ org_id: org.id, energy_level: 'low' })
    );
    await petsRepository.create(
      makePet({ org_id: org.id, energy_level: 'medium' })
    );
    await petsRepository.create(
      makePet({ org_id: org.id, energy_level: 'high' })
    );

    const org2 = await orgsRepository.create(makeOrg({ city: 'city2' }));
    await petsRepository.create(
      makePet({ org_id: org2.id, energy_level: 'low' })
    );
    await petsRepository.create(
      makePet({ org_id: org2.id, energy_level: 'medium' })
    );

    const { pets } = await sut.execute({ city: org.city, energy_level: 'low' });
    expect(pets).toHaveLength(2);

    const { pets: pets2 } = await sut.execute({
      city: org2.city,
      energy_level: 'high',
    });
    expect(pets2).toHaveLength(0);
  });

  it("Deve ser possivel listar os pets de uma cidade filtrando por 'environment'", async () => {
    const org = await orgsRepository.create(makeOrg({ city: 'city1' }));

    await petsRepository.create(
      makePet({ org_id: org.id, environment: 'indoor' })
    );
    await petsRepository.create(
      makePet({ org_id: org.id, environment: 'indoor' })
    );

    await petsRepository.create(
      makePet({ org_id: org.id, environment: 'outdoor' })
    );

    const org2 = await orgsRepository.create(makeOrg({ city: 'city2' }));

    await petsRepository.create(
      makePet({ org_id: org2.id, environment: 'indoor' })
    );
    await petsRepository.create(
      makePet({ org_id: org2.id, environment: 'indoor' })
    );

    await petsRepository.create(
      makePet({ org_id: org2.id, environment: 'outdoor' })
    );

    const city1 = await sut.execute({
      city: 'city1',
      environment: 'indoor',
    });
    expect(city1.pets).toHaveLength(2);

    const city2 = await sut.execute({
      city: 'city2',
      environment: 'outdoor',
    });
    expect(city2.pets).toHaveLength(1);
  });
});
