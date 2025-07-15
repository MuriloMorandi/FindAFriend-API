import { makeOrg } from "@/use-cases/factories/makeOrg.factory";
import { app } from "@/http/server";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";

describe('Endpoint (e2e) : Status da Aplicação', () => {
    beforeAll(async ()=>{
        await app.ready();
    })

    afterAll(async()=> {
        await app.close();
    })

    it('Aplicação esta com status OK', async ()=>{
    
        const response = await request(app.server).get('/status');
        

        expect(response.statusCode).toEqual(200);
    })
})