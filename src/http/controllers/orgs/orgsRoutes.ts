import { FastifyInstance } from "fastify";
import { createOrgsController } from "./createOrgsController";
import { authOrgsController } from "./authOrgsController";

export const orgsRoutes = async (app: FastifyInstance) => {
    app.post('/orgs', createOrgsController);
    app.post('/orgs/auth', authOrgsController);
}