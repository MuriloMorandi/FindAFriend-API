import { FastifyInstance } from "fastify";
import { createPetsController } from "./createPetsController";
import { getPetsController } from "./getPetsController";
import { listPetsController } from "./listPetsController";


export const petsRoutes = async (app: FastifyInstance) => {
    app.post('/pets', createPetsController);
    app.get('/pets/:id', getPetsController);
    app.get('/pets', listPetsController);
}