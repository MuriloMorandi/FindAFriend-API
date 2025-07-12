import { OrgAlreadyExistsError } from "@/use-cases/errors/orgAlreadyExistsError";
import { makeCreateOrgsUseCase } from "@/use-cases/factories/makeCreateOrgsUseCase";
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

    try
    {
        const createOrgsUseCase = makeCreateOrgsUseCase();
        await createOrgsUseCase.execute(bodyData);

    } catch (error)
    {
        if (error instanceof OrgAlreadyExistsError)
        {
            return reply.status(409).send(error.message);
        }

        throw error;
    }

    reply.status(201).send();
}
