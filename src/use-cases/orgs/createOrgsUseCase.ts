import { IOrgsRepository } from "@/repositories/IOrgsRepository";
import { hash } from "bcryptjs";
import { Orgs } from "prisma/generated/prisma";
import { OrgAlreadyExistsError } from "../errors/orgAlreadyExistsError";

interface CreateOrgsCaseRequest {
    name: string
    author_name: string
    email: string
    whatsapp: string
    password: string
    cep: string
    state: string
    city: string
    neighborhood: string
    street: string
    latitude: number
    longitude: number
}

interface CreateOrgsCaseResponse {
    org: Orgs
}

export class CreateOrgsUseCase {

    constructor(
        private orgsRepository: IOrgsRepository
    ) { }

    async execute({
        password,
        email,
        ...data
    }: CreateOrgsCaseRequest): Promise<CreateOrgsCaseResponse> {
        const orgByEmail = await this.orgsRepository.findByEmail(email)
        if (orgByEmail)
        {
            throw new OrgAlreadyExistsError();
        }
        const password_hash = await hash(password, 6);

        const org = await this.orgsRepository.create({
            ...data,
            email,
            password: password_hash,
        })

        return { org };
    }
}