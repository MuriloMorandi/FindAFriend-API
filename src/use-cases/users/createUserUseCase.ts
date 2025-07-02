
import { IUsersRepository } from "@/repositories/IUsersRepository";
import { hash } from "bcryptjs";
import { User } from "prisma/generated/prisma";

interface RegisterUseCaseRequest {
    name: string
    email: string
    password: string
}

interface RegisterUseCaseResponse {
    user: User
}

export class CreateUsersUseCase {

    constructor(
        private usersRepository: IUsersRepository
    ) { }

    async execute({
        password,
        ...data
    }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {

        const password_hash = await hash(password, 6);

        const user = await this.usersRepository.create({
            password_hash,
            ...data,
        })

        return { user };
    }
}