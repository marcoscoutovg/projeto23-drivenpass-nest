import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CardsRepository } from './cards.repository';
import Cryptr from 'cryptr';
import { CreateCardDto } from './dto/create-card.dto';

@Injectable()
export class CardsService {
    private Cryptr = require('cryptr');
    private cryptr: Cryptr;

    constructor(private readonly cardsRepository: CardsRepository) {
        this.cryptr = new this.Cryptr(process.env.CRYPTR_SECRET);
    }

    async create(createCardDto: CreateCardDto, userId: number) {
        return this.cardsRepository.create(createCardDto, userId);
    }

    async findAll(userId: number) {
        return await this.cardsRepository.findAll(userId);
    }

    async findOne(id: number, userId: number) {
        const card = await this.cardsRepository.findOne(id);
        if (!card) throw new NotFoundException();
        if (card.userId !== userId) throw new ForbiddenException();
        return card;
    }

    async delete(id: number, userId: number) {
        const card = await this.cardsRepository.findOne(id);
        if (!card) throw new NotFoundException();
        if (card.userId !== userId) throw new ForbiddenException();
        return this.cardsRepository.delete(id);
    }
}