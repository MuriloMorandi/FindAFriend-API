import fastify from "fastify";
import { appRoutes } from "./routes";
import { fastifyCors } from '@fastify/cors';
import { env } from "@/env";
import { ZodError } from "zod/v4";

export const app = fastify();

app.register(fastifyCors, { origin: '*' });
app.register(appRoutes);

app.setErrorHandler((error, _, reply) => {
    if (error instanceof ZodError)
    {
        return reply.status(400).send({
            message: 'Validation error',
            issues: error.issues,
        });
    }

    if (env.NODE_ENV !== 'prod')
    {
        console.error(error);
    }
    else
    {
        // Envia o erro p/ alguma ferramenta de observabilidade (Sentry/DataDog/Grafana/OTel)
    }

    return reply.status(500).send({ message: 'Internal server error.' });
});


app.listen({ port: env.PORT, host: '0.0.0.0' }).then(val => {
    console.log('HTTP Server running!');
    console.log(`URL: ${val}`)
});