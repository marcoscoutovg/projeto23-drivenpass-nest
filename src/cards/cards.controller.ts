import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { CardsService } from './cards.service';
import { User } from '../decorators/user.decorator';
import { Users as UserPrisma } from '@prisma/client';
import { AuthGuard } from '../guards/auth.guard';
import { CreateCardDto } from './dto/create-card.dto';

@UseGuards(AuthGuard)
@Controller('cards')
export class CardsController {
    constructor(private readonly cardsService: CardsService) { }

    @Post()
    create(@Body() createCardDto: CreateCardDto, @User() user: UserPrisma) {
        const userId = user.id;

        return this.cardsService.create(createCardDto, userId);
    }

    @Get()
    async findAll(@User() user: UserPrisma) {
        const userId = user.id;

        return await this.cardsService.findAll(userId);
    }

    @Get(':id')
    getCardsByUserId(@Param('id', ParseIntPipe) id: string, @User() user) {
        const userId = user.id;

        return this.cardsService.findOne(+id, userId);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: string, @User() user) {
        const userId = user.id;

        return this.cardsService.delete(+id, userId)
    }

}