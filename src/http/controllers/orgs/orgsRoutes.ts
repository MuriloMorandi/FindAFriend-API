import { FastifyInstance } from "fastify";
import { createOrgsController } from "./createOrgsController";
import { authOrgsController } from "./authOrgsController";
import { getOrgsProfileController } from "./getOrgsProfileController";
import { authMiddleware } from "@/http/middlewares/authMiddleware";

export const orgsRoutes = async (app: FastifyInstance) => {
    app.post('/orgs', createOrgsController);
    app.post('/orgs/auth', authOrgsController);

    app.get('/orgs/profile', { onRequest: [authMiddleware] }, getOrgsProfileController);
}