import { FastifyInstance } from "fastify";
import { createPetsController } from "./createPetsController";
import { getPetsController } from "./getPetsController";


export const petsRoutes = async (app: FastifyInstance) => {
    app.post('/pets', createPetsController);
    app.get('/pets:id', getPetsController);
}