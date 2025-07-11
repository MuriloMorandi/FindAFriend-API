import { PetsRepositoryPrisma } from "@/repositories/prisma/petsRepositoryPrisma";
import { GetPetUseCase } from "../pets/getPetUseCase";

export function makeGetPetsUseCase() {
    const petsRepository = new PetsRepositoryPrisma()
    const getPetUseCase = new GetPetUseCase(petsRepository)

    return getPetUseCase;
}