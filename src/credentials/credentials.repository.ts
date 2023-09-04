import { Injectable } from '@nestjs/common';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CredentialsRepository {
    constructor(private readonly prisma: PrismaService) { }

    create(createCredentialDto: CreateCredentialDto, userId: number) {
        return this.prisma.credentials.create({
            data: { ...createCredentialDto, userId },
        });
    }

    findAll(userId: number) {
        return this.prisma.credentials.findMany({
            where: { userId },
        });
    }

    findOne(id: number) {
        return this.prisma.credentials.findUnique({
            where: { id },
        });
    }

    findOneByTitle(title: string, userId: number) {
        return this.prisma.credentials.findFirst({
            where: {
                title,
                userId
            },
        });
    }

    delete(id: number, userId: number) {
        return this.prisma.credentials.delete({
            where: { id, userId },
        });
    }
}