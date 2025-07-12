import { FastifyInstance } from "fastify";
import { statusRoutes } from "./controllers/status/statusRouts";
import { orgsRoutes } from "./controllers/orgs/orgsRoutes";
import { petsRoutes } from "./controllers/pets/petsRoutes";

export const appRoutes = async (app: FastifyInstance) => {
    app.register(statusRoutes);
    app.register(orgsRoutes);
    app.register(petsRoutes);
}