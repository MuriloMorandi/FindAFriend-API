import { OrgsRepositoryPrisma } from "@/repositories/prisma/orgsRepositoryPrisma";
import { CreateOrgsUseCase } from "../orgs/createOrgsUseCase";

export function makeCreateOrgsUseCase() {
    const orgsRepository = new OrgsRepositoryPrisma()
    const createOrgsUseCase = new CreateOrgsUseCase(orgsRepository)

    return createOrgsUseCase;
}