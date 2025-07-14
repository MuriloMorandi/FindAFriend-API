import { OrgNotFoundError } from "@/use-cases/errors/orgNotFoundError";
import { makeCreatePetsUseCase } from "@/use-cases/factories/makeCreatePetsUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod/v4";

export const createPetsController = async (
    request: FastifyRequest,
    reply: FastifyReply,
) => {
    const orgId = request.user.sub;

    const createOrgsBodySchema = z.object({
        name: z.string(),
        about: z.string(),
        age: z.string(),
        size: z.string(),
        energy_level: z.string(),
        environment: z.string(),
    });

    const bodyData = createOrgsBodySchema.parse(request.body);

    try
    {
        const createOrgsUseCase = makeCreatePetsUseCase();
        await createOrgsUseCase.execute({
            ...bodyData,
            orgId
        });

    } catch (error)
    {
        if (error instanceof OrgNotFoundError)
        {
            return reply.status(404).send(error.message);
        }

        throw error;
    }

    reply.status(201).send();
}
