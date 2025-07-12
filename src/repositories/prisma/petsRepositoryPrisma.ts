import { prisma } from '@/libs/prisma';
import { Prisma, Pets } from "prisma/generated/prisma"
import { FindAllParams, IPetsRepository } from '../IPetsRepository';

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

    async findAll(data: FindAllParams): Promise<Pets[]> {
        const ret = await prisma.pets.findMany({
            where: {
                age: data.age,
                size: data.size,
                energy_level: data.energy_level,
                environment: data.environment,
                org: {
                    city: {
                        contains: data.city,
                        mode: 'insensitive'
                    }
                }
            }
        })

        return ret;
    }

}