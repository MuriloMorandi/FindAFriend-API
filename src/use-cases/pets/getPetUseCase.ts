import { IPetsRepository } from "@/repositories/IPetsRepository";
import { Pets } from "prisma/generated/prisma";
import { ResourceNotFoundError } from "../errors/resourceNotFound";

interface GetPetUseCaseRequest {
    id: string;
}

interface GetPetUseCaseResponse {
    pet: Pets
}

export class GetPetUseCase {

    constructor(
        private petsRepository: IPetsRepository
    ) { }

    async execute({ id }: GetPetUseCaseRequest): Promise<GetPetUseCaseResponse> {
        const pet = await this.petsRepository.findById(id)

        if (!pet)
        {
            throw new ResourceNotFoundError();
        }

        return {
            pet
        }
    }
}