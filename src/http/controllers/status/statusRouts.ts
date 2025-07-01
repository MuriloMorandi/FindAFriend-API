import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export const statusRoutes = async (app: FastifyInstance) => {
    app.get('/status', async (
        request: FastifyRequest,
        reply: FastifyReply,
    ) => {
        reply.status(200).send("API :ok");
    });
}