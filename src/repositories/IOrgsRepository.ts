import { Prisma, Orgs } from "prisma/generated/prisma"

export interface IOrgsRepository {
    create(data: Prisma.OrgsCreateInput): Promise<Orgs>
    findById(id: string): Promise<Orgs | null>
    findByEmail(email: string): Promise<Orgs | null>
}