import { FastifyInstance } from "fastify";
import { createUsersController } from "./createUsersController";

export const usersRoutes = async (app: FastifyInstance) => {
    app.post('/users', createUsersController);
}