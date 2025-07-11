import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod/v4";

export const getPetsController = async (
    request: FastifyRequest,
    reply: FastifyReply,
) => {
    const getPetsQuerySchema = z.object({
        id: z.string()
    });

    const queryData = getPetsQuerySchema.parse(request.query);

    try
    {
        const getPetsUseCase = makeGetPetsUseCase();
        const { pet } = await getPetsUseCase.execute(queryData);

        reply.status(200).send(pet);
    } catch (error)
    {
        if (error instanceof ResourceNotFoundError)
        {
            return reply.status(404).send(error.message);
        }

        throw error;
    }
}
