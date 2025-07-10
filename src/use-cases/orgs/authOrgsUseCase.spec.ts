import { beforeAll, describe, expect, it } from 'vitest';
import { OrgsRepositoryInMemory } from '@/repositories/in-memory/orgsRepositoryInMemory';
import { AuthOrgsUseCase } from './authOrgsUseCase';
import { hash } from 'bcryptjs';
import { InvalidCredentialsError } from '../errors/invalidCredentialsError';

describe("Caso de Uso: Autenticação da Organizações", () => {
  let orgsRepository: OrgsRepositoryInMemory;
  let sut: AuthOrgsUseCase;

  beforeAll(() => {
    orgsRepository = new OrgsRepositoryInMemory();
    sut = new AuthOrgsUseCase(orgsRepository);
  })

  it("Deve ser possivel autenticar com sucesso", async () => {

    await orgsRepository.create({
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
      email: 'teste@teste.com',
      password: '123456789'
    });

    expect(
      org.id
    ).toEqual(expect.any(String));
  });

  it("Não deve ser possivel autenticar (e-mail incorreto)", async () => {

    await expect(
      sut.execute({
        email: 'teste@teste.com',
        password: '456789'
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("Não deve ser possivel autenticar (senha incorreta)", async () => {

    await orgsRepository.create({
      email: 'teste@teste.com',
      password: await hash('12346', 6),
      name: "Org Test",
      author_name: "John Doe",
      whatsapp: "123456789",
      cep: "12345-000",
      state: "SP",
      city: "São Paulo",
      neighborhood: "Centro",
      street: "Rua A",
      latitude: -23.5,
      longitude: -46.6,
    });

    await expect(
      sut.execute({ email: 'teste@teste.com', password: '456789' })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

});
