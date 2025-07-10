import { ResourceNotFoundErrors } from '@/use-cases/errors/resourceNotFound';
import { GetOrgsProfileUseCase } from './../../../use-cases/orgs/getOrgsProfileUseCase';
import { InvalidCredentialsError } from "@/use-cases/errors/invalidCredentialsError";
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

    const bodyData = getOrgsProfileBodySchema.parse(request.body);

    try
    {
        const getOrgsProfileUseCase = makeGetOrgsProfileUseCase();
        const org = getOrgsProfileUseCase.execute(bodyData);

        reply.status(200).send(org);
    } catch (error)
    {
        if (error instanceof ResourceNotFoundErrors)
        {
            return reply.status(404).send(error.message);
        }

        throw error;
    }
}
