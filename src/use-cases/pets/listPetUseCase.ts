import { IPetsRepository } from '@/repositories/IPetsRepository';
import { Pets } from 'prisma/generated/prisma';

interface ListPetUseCaseRequest {
  city: string;
  age?: string;
  size?: string;
  energy_level?: string;
  environment?: string;
}

interface ListPetUseCaseResponse {
  pets: Pets[];
}

export class ListPetUseCase {
  constructor(private petsRepository: IPetsRepository) {}

  async execute(data: ListPetUseCaseRequest): Promise<ListPetUseCaseResponse> {
    const pets = await this.petsRepository.findAll({ ...data });

    return {
      pets,
    };
  }
}
