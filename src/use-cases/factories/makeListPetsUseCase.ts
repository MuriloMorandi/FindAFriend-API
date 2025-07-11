import { PetsRepositoryPrisma } from "@/repositories/prisma/petsRepositoryPrisma";
import { GetPetUseCase } from "../pets/getPetUseCase";

export function makeListPetsUseCase() {
    const petsRepository = new PetsRepositoryPrisma()
    const getPetUseCase = new GetPetUseCase(petsRepository)

    return getPetUseCase;
}