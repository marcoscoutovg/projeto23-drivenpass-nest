import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {

    constructor(private readonly repository: UsersRepository) { }

    async createUser(createUserDto: CreateUserDto) {
        const { email } = createUserDto;

        const user = await this.repository.getByEmail(email);
        if (user) throw new ConflictException("Email already in use.");

        return await this.repository.create(createUserDto);
    }

    async getUserById(id: number) {
        const user = await this.repository.getById(id);
        if (!user) throw new NotFoundException("User not found.");

        return user;
    }

    async getUserByEmail(email: string) {
        return await this.repository.getByEmail(email);
    }

    async delete(id: number) {
        return this.repository.delete(id);
    }

}