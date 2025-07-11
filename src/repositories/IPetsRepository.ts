import { Prisma, Pets } from "prisma/generated/prisma"

export interface IPetsRepository {
    create(data: Prisma.PetsCreateManyInput): Promise<Pets>
    findById(id: string): Promise<Pets | null>
}