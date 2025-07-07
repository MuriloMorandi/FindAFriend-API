

import { randomUUID } from 'node:crypto'
import { IOrgsRepository } from '@/repositories/IOrgsRepository'
import { Orgs, Prisma } from 'prisma/generated/prisma'

export class OrgsRepositoryInMemory implements IOrgsRepository {
    public items: Orgs[] = []

    async create(data: Prisma.OrgsCreateInput) {
        const org: Orgs = {
            ...data,
            id: randomUUID(),
            latitude: Prisma.Decimal(
                data.latitude.toString()
            ),
            longitude: Prisma.Decimal(
                data.longitude.toString()
            )
        }

        this.items.push(org)

        return org;
    }

    async findById(id: string) {
        const org = this.items.find((item) => item.id === id)

        if (!org)
        {
            return null
        }

        return org
    }

    async findByEmail(email: string) {
        const org = this.items.find((item) => item.email === email)

        if (!org)
        {
            return null
        }

        return org
    }

}