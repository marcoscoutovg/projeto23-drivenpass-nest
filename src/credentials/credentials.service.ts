import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { CredentialsRepository } from './credentials.repository';

@Injectable()
export class CredentialsService {
    constructor(private readonly credentialsRepository: CredentialsRepository) { }

    async create(createCredentialDto: CreateCredentialDto, userId: number) {
        const credential = await this.findOneByTitle(
            createCredentialDto.title,
            userId,
        );
        if (credential)
            throw new ConflictException();
        return this.credentialsRepository.create(createCredentialDto, userId);
    }

    async findAll(userId: number) {
        return await this.credentialsRepository.findAll(userId);
    }

    async findOne(id: number, userId: number) {
        const credential = await this.credentialsRepository.findOne(id);
        if (!credential) throw new NotFoundException();
        if (credential.userId !== userId) throw new ForbiddenException();
        return credential;
    }

    async findOneByTitle(title: string, userId: number) {
        return await this.credentialsRepository.findOneByTitle(title, userId);
    }

    async delete(id: number, userId: number) {

        const credential = await this.credentialsRepository.findOne(id);
        if (!credential) throw new NotFoundException();
        if (credential.userId !== userId) throw new ForbiddenException();
        return this.credentialsRepository.delete(id, userId);
    }

}