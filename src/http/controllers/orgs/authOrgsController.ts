import { InvalidCredentialsError } from "@/use-cases/errors/invalidCredentialsError";
import { makeAuthOrgsUseCase } from "@/use-cases/factories/makeAuthOrgsUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod/v4";

export const authOrgsController = async (
    request: FastifyRequest,
    reply: FastifyReply,
) => {
    const authOrgsBodySchema = z.object({
        email: z.string(),
        password: z.string(),
    });

    const bodyData = authOrgsBodySchema.parse(request.body);

    try
    {
        const authOrgsUseCase = makeAuthOrgsUseCase();
        await authOrgsUseCase.execute(bodyData);

    } catch (error)
    {
        if (error instanceof InvalidCredentialsError)
        {
            return reply.status(400).send(error.message);
        }

        throw error;
    }

    reply.status(200).send();
}
