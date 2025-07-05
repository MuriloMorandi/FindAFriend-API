import { FastifyInstance } from "fastify";
import { createOrgsController } from "./createOrgsController";

export const orgsRoutes = async (app: FastifyInstance) => {
    app.post('/orgs', createOrgsController);
}