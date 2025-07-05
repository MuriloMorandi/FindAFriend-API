import { FastifyInstance } from "fastify";
import { statusRoutes } from "./controllers/status/statusRouts";
import { orgsRoutes } from "./controllers/orgs/orgsRoutes";

export const appRoutes = async (app: FastifyInstance) => {
    app.register(statusRoutes);
    app.register(orgsRoutes)
}