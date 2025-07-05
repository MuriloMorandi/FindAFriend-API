import { Prisma, Orgs } from "prisma/generated/prisma"

export interface IOrgsRepository {
    findById(id: string): Promise<Orgs | null>
    findByEmail(email: string): Promise<Orgs | null>
    create(data: Prisma.OrgsCreateInput): Promise<Orgs>
}