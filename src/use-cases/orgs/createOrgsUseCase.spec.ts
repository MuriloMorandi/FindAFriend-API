import { beforeEach, describe, expect, it } from 'vitest';
import { CreateOrgsUseCase } from './createOrgsUseCase';
import { compare } from 'bcryptjs';
import { OrgsRepositoryInMemory } from '@/repositories/in-memory/orgsRepositoryInMemory';
import { OrgAlreadyExistsError } from '../errors/orgAlreadyExistsError';

describe("Caso de Uso: Criação de Organizações", () => {
  let orgsRepository: OrgsRepositoryInMemory;
  let sut: CreateOrgsUseCase;

  beforeEach(() => {
    orgsRepository = new OrgsRepositoryInMemory();
    sut = new CreateOrgsUseCase(orgsRepository);
  })

  it("Não deve ser possivel cadastrar um email existente", async () => {

    const input = {
      name: "Org Test",
      author_name: "John Doe",
      email: "john@org.com",
      whatsapp: "123456789",
      password: "123456",
      cep: "12345-000",
      state: "SP",
      city: "São Paulo",
      neighborhood: "Centro",
      street: "Rua A",
      latitude: -23.5,
      longitude: -46.6,
    };

    const { org } = await sut.execute(input);

    expect(
      org.id
    ).toEqual(expect.any(String));
  });

  it("A senha da Organização deve ser criptografada ao ser cadastrada", async () => {

    const input = {
      name: "Org Test",
      author_name: "John Doe",
      email: "john@org.com",
      whatsapp: "123456789",
      password: "123456",
      cep: "12345-000",
      state: "SP",
      city: "São Paulo",
      neighborhood: "Centro",
      street: "Rua A",
      latitude: -23.5,
      longitude: -46.6,
    };

    const { org } = await sut.execute(input);

    const isPasswordCorretlyHashed = await compare(
      input.password,
      org.password
    );

    expect(isPasswordCorretlyHashed).toBe(true)
  });

  it("Não deve ser possivel cadastrar um email existente", async () => {

    const input = {
      name: "Org Test",
      author_name: "John Doe",
      email: "john@org.com",
      whatsapp: "123456789",
      password: "123456",
      cep: "12345-000",
      state: "SP",
      city: "São Paulo",
      neighborhood: "Centro",
      street: "Rua A",
      latitude: -23.5,
      longitude: -46.6,
    };

    await sut.execute(input);

    await expect(
      sut.execute(input)
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)

  });

});
