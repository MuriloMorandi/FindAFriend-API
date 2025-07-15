import { app } from "@/http/server";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { makeOrg } from "@/use-cases/factories/makeOrg.factory";

describe('Cadastro de Organização (e2e)', () => {
    beforeAll(async ()=>{
        await app.ready();
    })

    afterAll(async()=> {
        await app.close();
    })

    it('E possivel cadastrar uma organização', async ()=>{
        const input = {
            ...makeOrg(),
            id: undefined
        };

        const response = await request(app.server)
        .post('/orgs')
        .send(input)

        expect(response.statusCode).toEqual(201)
    })
})