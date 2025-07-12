import { PetsRepositoryPrisma } from "@/repositories/prisma/petsRepositoryPrisma";
import { GetPetUseCase } from "../pets/getPetUseCase";
import { ListPetUseCase } from "../pets/listPetUseCase";

export function makeListPetsUseCase() {
    const petsRepository = new PetsRepositoryPrisma()
    const listPetsUseCase = new ListPetUseCase(petsRepository)

    return listPetsUseCase;
}