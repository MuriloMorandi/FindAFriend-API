import { prisma } from '@/libs/prisma';
import { Prisma, Pets } from "prisma/generated/prisma"
import { IPetsRepository } from '../IPetsRepository';

export class PetsRepositoryPrisma implements IPetsRepository {
    async create(data: Prisma.PetsCreateManyInput): Promise<Pets> {
        const ret = await prisma.pets.create({ data });

        return ret;
    }

    async findById(id: string): Promise<Pets | null> {
        const ret = await prisma.pets.findUnique({
            where: {
                id
            }
        });

        return ret;
    }

}