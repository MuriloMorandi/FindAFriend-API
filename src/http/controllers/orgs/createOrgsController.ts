import { OrgsRepositoryPrisma } from "@/repositories/prisma/orgsRepositoryPrisma";
import { CreateOrgsUseCase } from "@/use-cases/orgs/createOrgsUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod/v4";

export const createOrgsController = async (
    request: FastifyRequest,
    reply: FastifyReply,
) => {
    const createOrgsBodySchema = z.object({
        name: z.string(),
        author_name: z.string(),
        email: z.string(),
        whatsapp: z.string(),
        password: z.string(),
        cep: z.string(),
        state: z.string(),
        city: z.string(),
        neighborhood: z.string(),
        street: z.string(),
        latitude: z.number(),
        longitude: z.number(),
    });

    const bodyData = createOrgsBodySchema.parse(request.body);

    const orgsRepository = new OrgsRepositoryPrisma()

    const orgWithSameEmail = await orgsRepository.findByEmail(bodyData.email)
    if (orgWithSameEmail)
    {
        return reply.status(409).send()
    }

    const createOrgsUseCase = new CreateOrgsUseCase(orgsRepository)
    createOrgsUseCase.execute(bodyData);

    reply.status(201).send();
}
