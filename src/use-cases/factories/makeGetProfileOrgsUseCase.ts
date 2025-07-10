import { OrgsRepositoryPrisma } from "@/repositories/prisma/orgsRepositoryPrisma";
import { GetOrgsProfileUseCase } from "../orgs/getOrgsProfileUseCase";

export function makeGetOrgsProfileUseCase() {
    const orgsRepository = new OrgsRepositoryPrisma()
    const getOrgsProfileUseCase = new GetOrgsProfileUseCase(orgsRepository)

    return getOrgsProfileUseCase;
}