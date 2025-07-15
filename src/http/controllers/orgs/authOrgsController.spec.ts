import { app } from "@/http/server";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { makeOrg } from "@/use-cases/factories/makeOrg.factory";

describe('Autenticação (e2e)', () => {
    beforeAll(async ()=>{
        await app.ready();
    })

    afterAll(async ()=> {
        await app.close();
    })

    it('E possivel logar com uma organização', async ()=>{
        const inputCreateOrg = {
            ...makeOrg(),
            id: undefined
        };

        await request(app.server)
            .post('/orgs')
            .send(inputCreateOrg)

        const response = await request(app.server)
            .post('/orgs/auth')
            .send({
                email: inputCreateOrg.email,
                password: inputCreateOrg.password
            })

        expect(response.statusCode).toEqual(200)
    })
})