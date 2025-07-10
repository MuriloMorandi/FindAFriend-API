import { prisma } from '@/libs/prisma';
import { IOrgsRepository } from '../IOrgsRepository';
import { Prisma, Orgs } from "prisma/generated/prisma"

export class OrgsRepositoryPrisma implements IOrgsRepository {
    async create(data: Prisma.OrgsCreateInput): Promise<Orgs> {
        const ret = await prisma.orgs.create({ data });

        return ret;
    }

    async findByEmail(email: string): Promise<Orgs | null> {
        const ret = await prisma.orgs.findUnique({
            where: {
                email
            }
        });

        return ret;
    }

    async findById(id: string): Promise<Orgs | null> {
        const ret = await prisma.orgs.findUnique({
            where: {
                id
            }
        });

        return ret;
    }
}