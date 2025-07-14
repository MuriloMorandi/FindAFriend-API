import { FastifyInstance } from "fastify";
import { createPetsController } from "./createPetsController";
import { getPetsController } from "./getPetsController";
import { listPetsController } from "./listPetsController";
import { authMiddleware } from "@/http/middlewares/authMiddleware";


export const petsRoutes = async (app: FastifyInstance) => {
    app.post('/pets', { onRequest: [authMiddleware] }, createPetsController);
    app.get('/pets/:id', getPetsController);
    app.get('/pets', listPetsController);
}