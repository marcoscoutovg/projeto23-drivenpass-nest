import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCardDto } from './dto/create-card.dto';

@Injectable()
export class CardsRepository {
    constructor(private readonly prisma: PrismaService) { }

    create(createCardDto: CreateCardDto, userId: number) {
        return this.prisma.cards.create({
            data: { ...createCardDto, userId },
        });
    }

    findAll(userId: number) {
        return this.prisma.cards.findMany({
            where: { userId },
        });
    }

    findOne(id: number) {
        return this.prisma.cards.findUnique({
            where: { id },
        });
    }

    delete(id: number) {
        return this.prisma.cards.delete({
            where: { id },
        });
    }
}