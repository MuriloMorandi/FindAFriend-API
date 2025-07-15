import { IOrgsRepository } from '@/repositories/IOrgsRepository';
import { IPetsRepository } from '@/repositories/IPetsRepository';
import { Pets } from 'prisma/generated/prisma';
import { OrgNotFoundError } from '../errors/orgNotFoundError';

type CreatePetsCaseRequest = {
  orgId: string;
  name: string;
  about: string;
  age: string;
  size: string;
  energy_level: string;
  environment: string;
};

interface CreatePetsCaseResponse {
  pet: Pets;
}

export class CreatePetsUseCase {
  constructor(
    private petsRepository: IPetsRepository,
    private orgsRepository: IOrgsRepository
  ) {}

  async execute({
    orgId,
    ...data
  }: CreatePetsCaseRequest): Promise<CreatePetsCaseResponse> {
    const org = await this.orgsRepository.findById(orgId);
    if (!org) {
      throw new OrgNotFoundError();
    }

    const pet = await this.petsRepository.create({
      ...data,
      org_id: orgId,
    });

    return { pet };
  }
}
