import { z } from 'zod/v4';

const envSchema = z.object({
    PORT: z.coerce.number().default(3000),
    NODE_ENV: z.enum(['dev', 'test', 'prod']).default('prod'),
    DATABASE_URL: z.string(),
    JWT_SECRET: z.string(),
});

const _env = envSchema.safeParse(process.env)

if (_env.success === false)
{
    console.error('❌ Invalid environment variables', _env.error.format())

    throw new Error('Invalid environment variables.')
}

export const env = _env.data
