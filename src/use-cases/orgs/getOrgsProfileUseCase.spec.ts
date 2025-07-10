import { beforeEach, describe, expect, it } from 'vitest';
import { hash } from 'bcryptjs';
import { OrgsRepositoryInMemory } from '@/repositories/in-memory/orgsRepositoryInMemory';
import { GetOrgsProfileUseCase } from './getOrgsProfileUseCase';
import { ResourceNotFoundError } from '../errors/resourceNotFound';

describe("Caso de Uso: Obter dados da Organização", () => {
    let orgsRepository: OrgsRepositoryInMemory;
    let sut: GetOrgsProfileUseCase;

    beforeEach(() => {
        orgsRepository = new OrgsRepositoryInMemory();
        sut = new GetOrgsProfileUseCase(orgsRepository);
    })

    it("Deve ser possivel obter os dados de perfil da organização", async () => {
        const createOrg = await orgsRepository.create({
            email: 'teste@teste.com',
            password: await hash('123456789', 6),
            name: "Org Test",
            author_name: "John Doe",
            whatsapp: "99999999",
            cep: "12345-000",
            state: "SP",
            city: "São Paulo",
            neighborhood: "Centro",
            street: "Rua A",
            latitude: -23.5,
            longitude: -46.6,
        });

        const { org } = await sut.execute({
            orgId: createOrg.id
        });

        expect(org.email).toEqual('teste@teste.com');
    });

    it("Não deve ser possivel obter os dados de perfil da organização", async () => {
        await expect(sut.execute({
            orgId: 'non-existing-id'
        })).rejects.toBeInstanceOf(ResourceNotFoundError)
    });
});
