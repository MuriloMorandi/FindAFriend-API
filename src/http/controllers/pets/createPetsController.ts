import { OrgNotFoundError } from '@/use-cases/errors/orgNotFoundError';
import { makeCreatePetsUseCase } from '@/use-cases/factories/makeCreatePetsUseCase';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod/v4';

export const createPetsController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const orgId = request.user.sub;

  const createPetsBodySchema = z.object({
    name: z.string(),
    about: z.string(),
    age: z.string(),
    size: z.string(),
    energy_level: z.string(),
    environment: z.string(),
  });

  const bodyData = createPetsBodySchema.parse(request.body);

  try {
    const createPetsUseCase = makeCreatePetsUseCase();

    const { pet } = await createPetsUseCase.execute({
      ...bodyData,
      orgId,
    });

    reply.status(201).send({ pet });
  } catch (error) {
    if (error instanceof OrgNotFoundError) {
      return reply.status(404).send(error.message);
    }

    throw error;
  }
};
