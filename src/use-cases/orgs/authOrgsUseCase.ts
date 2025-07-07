import { IOrgsRepository } from "@/repositories/IOrgsRepository";
import { compare } from "bcryptjs";
import { Orgs } from "prisma/generated/prisma";
import { InvalidCredentialsError } from "../errors/invalidCredentialsError";

interface AuthOrgsCaseRequest {
    email: string
    password: string

}

interface AuthOrgsCaseResponse {
    org: Orgs
}

export class AuthOrgsUseCase {

    constructor(
        private orgsRepository: IOrgsRepository
    ) { }

    async execute({ email, password }: AuthOrgsCaseRequest): Promise<AuthOrgsCaseResponse> {
        const org = await this.orgsRepository.findByEmail(email)

        if (org === null)
        {
            throw new InvalidCredentialsError();
        }

        const doesPasswordMatches = await compare(password, org.password)

        if (!doesPasswordMatches)
        {
            throw new InvalidCredentialsError();
        }

        return {
            org: org
        }
    }
}