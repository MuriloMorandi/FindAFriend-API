import { Prisma, Pets } from "prisma/generated/prisma"

export interface FindAllParams {
    city: string
    age?: string
    size?: string
    energy_level?: string
    environment?: string
}

export interface IPetsRepository {
    create(data: Prisma.PetsCreateManyInput): Promise<Pets>
    findById(id: string): Promise<Pets | null>
    findAll(data: FindAllParams): Promise<Pets[]>
}