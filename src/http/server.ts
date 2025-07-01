import fastify from "fastify";
import { appRoutes } from "./routes";
import { fastifyCors } from '@fastify/cors';
import { env } from "@/env";

export const app = fastify();

app.register(fastifyCors, { origin: '*' });
app.register(appRoutes);


app.listen({ port: env.PORT, host: '0.0.0.0' }).then(val => {
    console.log('HTTP Server running!');
    console.log(`URL: ${val}`)
});