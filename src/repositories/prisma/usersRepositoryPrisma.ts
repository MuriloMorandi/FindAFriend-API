import { prisma } from '@/libs/prisma';
import { IUsersRepository } from './../IUsersRepository';
import { Prisma, User } from "prisma/generated/prisma"

export class UsersRepositoryPrisma implements IUsersRepository {
    async create(data: Prisma.UserCreateInput): Promise<User> {
        const ret = await prisma.user.create({ data });

        return ret;
    }

    async findByEmail(email: string): Promise<User | null> {
        const ret = await prisma.user.findUnique({
            where: {
                email
            }
        });

        return ret;
    }

    async findById(id: string): Promise<User | null> {
        const ret = await prisma.user.findUnique({
            where: {
                id
            }
        });

        return ret;
    }
}