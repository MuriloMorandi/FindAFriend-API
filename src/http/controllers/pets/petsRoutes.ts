import { FastifyInstance } from "fastify";
import { createPetsController } from "./createPetsController";


export const petsRoutes = async (app: FastifyInstance) => {
    app.post('/pets', createPetsController);
}