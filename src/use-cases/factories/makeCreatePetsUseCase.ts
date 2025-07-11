import { OrgsRepositoryPrisma } from "@/repositories/prisma/orgsRepositoryPrisma";
import { PetsRepositoryPrisma } from "@/repositories/prisma/petsRepositoryPrisma";
import { CreatePetsUseCase } from "../pets/createPetsUseCase";

export function makeCreatePetsUseCase() {
    const orgsRepository = new OrgsRepositoryPrisma()
    const petsRepository = new PetsRepositoryPrisma()
    const createPetsUseCase = new CreatePetsUseCase(petsRepository, orgsRepository)

    return createPetsUseCase;
}