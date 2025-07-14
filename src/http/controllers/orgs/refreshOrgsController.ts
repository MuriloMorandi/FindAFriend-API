import { InvalidCredentialsError } from "@/use-cases/errors/invalidCredentialsError";
import type { FastifyReply, FastifyRequest } from "fastify";

export const RefreshOrgsController = async (
    request: FastifyRequest,
    reply: FastifyReply,
) => {
    await request.jwtVerify({ onlyCookie: true });

    try
    {
        const token = await reply.jwtSign({}, {
            sign: {
                sub: request.user.sub
            }
        })

        const refreshToken = await reply.jwtSign({}, {
            sign: {
                sub: request.user.sub,
                expiresIn: '7d'
            }
        })

        reply
            .setCookie('refreshToken', refreshToken, {
                path: '/',
                secure: true,
                sameSite: true,
                httpOnly: true,
            })
            .status(200)
            .send({ token });
    } catch (error)
    {
        if (error instanceof InvalidCredentialsError)
        {
            return reply.status(400).send(error.message);
        }

        throw error;
    }
}
