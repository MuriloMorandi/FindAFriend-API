import { UsersRepositoryPrisma } from "@/repositories/prisma/usersRepositoryPrisma";
import { CreateUsersUseCase } from "@/use-cases/users/createUserUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod/v4";

export const createUsersController = async (
    request: FastifyRequest,
    reply: FastifyReply,
) => {
    const createUserBodySchema = z.object({
        name: z.string().trim(),
        email: z.email(),
        password: z.string().min(6)
    });

    const { email, name, password } = createUserBodySchema.parse(request.body);

    const usersRepository = new UsersRepositoryPrisma();

    const userWithSameEmail = await usersRepository.findByEmail(email)
    if (userWithSameEmail)
    {
        return reply.status(409).send()
    }

    const createUsersUseCase = new CreateUsersUseCase(usersRepository)
    createUsersUseCase.execute({ email, name, password });

    reply.status(201).send();
}
