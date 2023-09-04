import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NotesRepository {
    constructor(private readonly prisma: PrismaService) { }

    create(createNoteDto: CreateNoteDto, userId: number) {
        return this.prisma.notes.create({
            data: { ...createNoteDto, userId },
        });
    }

    findAll(userId: number) {
        return this.prisma.notes.findMany({
            where: { userId },
        });
    }

    findOne(id: number) {
        return this.prisma.notes.findUnique({
            where: { id },
        });
    }

    findOneByTitle(title: string, userId: number) {
        return this.prisma.notes.findFirst({
            where: {
                title,
                userId
            },
        });
    }

    getNoteById(id: number) {
        return this.prisma.notes.findFirst({
            where: { id }
        })

    }

    delete(id: number) {
        return this.prisma.notes.delete({
            where: { id },
        });
    }
}