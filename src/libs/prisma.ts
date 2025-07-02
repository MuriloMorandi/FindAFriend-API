import { env } from "@/env";
import { PrismaClient } from "../../prisma/generated/prisma";

export const prisma = new PrismaClient({
    log: env.NODE_ENV === 'dev' ? ['query'] : []
});
