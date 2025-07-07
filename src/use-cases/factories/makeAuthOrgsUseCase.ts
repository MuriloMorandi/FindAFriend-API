import { OrgsRepositoryPrisma } from "@/repositories/prisma/orgsRepositoryPrisma";
import { AuthOrgsUseCase } from "../orgs/authOrgsUseCase";

export function makeAuthOrgsUseCase() {
    const orgsRepository = new OrgsRepositoryPrisma()
    const createAuthUseCase = new AuthOrgsUseCase(orgsRepository)

    return createAuthUseCase;
}