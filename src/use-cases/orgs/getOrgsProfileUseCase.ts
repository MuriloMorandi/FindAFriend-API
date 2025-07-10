import { IOrgsRepository } from "@/repositories/IOrgsRepository";
import { Orgs } from "prisma/generated/prisma";
import { ResourceNotFoundError } from "../errors/resourceNotFound";

interface GetOrgsProfileCaseRequest {
    orgId: string;

}

interface GetOrgsProfileUseCaseResponse {
    org: Orgs
}

export class GetOrgsProfileUseCase {

    constructor(
        private orgsRepository: IOrgsRepository
    ) { }

    async execute({ orgId }: GetOrgsProfileCaseRequest): Promise<GetOrgsProfileUseCaseResponse> {
        const org = await this.orgsRepository.findById(orgId)

        if (org === null)
        {
            throw new ResourceNotFoundError();
        }

        return {
            org: org
        }
    }
}