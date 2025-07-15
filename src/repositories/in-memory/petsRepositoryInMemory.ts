import { randomUUID } from 'node:crypto';
import { FindAllParams, IPetsRepository } from '@/repositories/IPetsRepository';
import { Pets, Prisma } from 'prisma/generated/prisma';
import { OrgsRepositoryInMemory } from './orgsRepositoryInMemory';

export class PetsRepositoryInMemory implements IPetsRepository {
  public items: Pets[] = [];
  constructor(private orgsRepository: OrgsRepositoryInMemory) {}

  async create({ id, ...data }: Prisma.PetsCreateManyInput) {
    const pet: Pets = {
      ...data,
      id: id ?? randomUUID(),
    };

    this.items.push(pet);

    return pet;
  }

  async findById(id: string) {
    const pet = this.items.find(item => item.id === id);

    if (!pet) {
      return null;
    }

    return pet;
  }

  async findAll(params: FindAllParams): Promise<Pets[]> {
    const orgsByCity = this.orgsRepository.items.filter(
      org => org.city === params.city
    );

    const pets = this.items
      .filter(item => orgsByCity.some(org => org.id === item.org_id))
      .filter(item => (params.age ? item.age === params.age : true))
      .filter(item => (params.size ? item.size === params.size : true))
      .filter(item =>
        params.energy_level ? item.energy_level === params.energy_level : true
      )
      .filter(item =>
        params.environment ? item.environment === params.environment : true
      );

    return pets;
  }
}
