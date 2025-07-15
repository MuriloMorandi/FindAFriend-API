import { makeListPetsUseCase } from '@/use-cases/factories/makeListPetsUseCase';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod/v4';

export const listPetsController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const getPetsQuerySchema = z.object({
    city: z.string(),
    age: z.string().optional(),
    size: z.string().optional(),
    energy_level: z.string().optional(),
    environment: z.string().optional(),
  });

  const queryData = getPetsQuerySchema.parse(request.query);

  try {
    const listPetsUseCase = makeListPetsUseCase();
    const { pets } = await listPetsUseCase.execute(queryData);

    reply.status(200).send({ pets });
  } catch (error) {
    throw error;
  }
};
