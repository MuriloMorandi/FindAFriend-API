

import { randomUUID } from 'node:crypto'
import { IPetsRepository } from '@/repositories/IPetsRepository'
import { Pets, Prisma } from 'prisma/generated/prisma'

export class PetsRepositoryInMemory implements IPetsRepository {
    public items: Pets[] = []

    async create(data: Prisma.PetsCreateManyInput) {
        const pet: Pets = {
            ...data,
            id: randomUUID(),
        }

        this.items.push(pet)

        return pet;
    }

    async findById(id: string) {
        const pet = this.items.find((item) => item.id === id)

        if (!pet)
        {
            return null
        }

        return pet
    }

}