import { ResourceNotFoundError } from '@/use-cases/errors/resourceNotFound';
import { makeAuthOrgsUseCase } from "@/use-cases/factories/makeAuthOrgsUseCase";
import { makeGetOrgsProfileUseCase } from "@/use-cases/factories/makeGetProfileOrgsUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod/v4";

export const getOrgsProfileController = async (
    request: FastifyRequest,
    reply: FastifyReply,
) => {
    const getOrgsProfileBodySchema = z.object({
        orgId: z.string()
    });

    const paramsData = getOrgsProfileBodySchema.parse(request.params);

    try
    {
        const getOrgsProfileUseCase = makeGetOrgsProfileUseCase();
        const { org } = await getOrgsProfileUseCase.execute(paramsData);

        reply.status(200).send(org);
    } catch (error)
    {
        if (error instanceof ResourceNotFoundError)
        {
            return reply.status(404).send(error.message);
        }

        throw error;
    }
}
