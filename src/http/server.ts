import fastify from "fastify";
import { fastifyCors } from '@fastify/cors';
import fastifyCookie from "@fastify/cookie";
import fastifyJwt from "@fastify/jwt";
import { ZodError } from "zod/v4";
import { env } from "@/env";

import { appRoutes } from "./routes";

export const app = fastify();

app.register(fastifyCors, { origin: '*' });
app.register(fastifyCookie);
app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    cookie: {
        cookieName: 'refreshToken',
        signed: false,
    },
    sign: {
        expiresIn: '10m'
    }
});

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