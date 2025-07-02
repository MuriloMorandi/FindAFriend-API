import { FastifyInstance } from "fastify";
import { statusRoutes } from "./controllers/status/statusRouts";
import { usersRoutes } from "./controllers/users/usersRoutes";

export const appRoutes = async (app: FastifyInstance) => {
    app.register(statusRoutes);
    app.register(usersRoutes)
}