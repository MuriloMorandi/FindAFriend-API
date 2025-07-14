import { ResourceNotFoundError } from '@/use-cases/errors/resourceNotFound';
import { makeGetOrgsProfileUseCase } from "@/use-cases/factories/makeGetProfileOrgsUseCase";
import { FastifyReply, FastifyRequest } from "fastify";

export const getOrgsProfileController = async (
    request: FastifyRequest,
    reply: FastifyReply,
) => {
    const orgId = request.user.sub;

    try
    {
        const getOrgsProfileUseCase = makeGetOrgsProfileUseCase();
        const { org } = await getOrgsProfileUseCase.execute({ orgId });

        reply.status(200).send({
            ...org,
            password: undefined
        });
    } catch (error)
    {
        if (error instanceof ResourceNotFoundError)
        {
            return reply.status(404).send(error.message);
        }

        throw error;
    }
}
