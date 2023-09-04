import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { NotesRepository } from './notes.repository';
import { CreateNoteDto } from './dto/create-note.dto';

@Injectable()
export class NotesService {
    constructor(private readonly notesRepository: NotesRepository) { }

    async create(createNoteDto: CreateNoteDto, userId: number) {
        return this.notesRepository.create(createNoteDto, userId);
    }

    async getNotes(userId: number) {
        return this.notesRepository.findAll(userId);
    }

    async getNoteById(id: number, userId: number) {
        const note = await this.notesRepository.getNoteById(id);

        if (!note) throw new NotFoundException();
        if (note.userId !== userId) throw new ForbiddenException();

        return note;
    }

    async delete(id: number, userId: number) {
        const note = await this.notesRepository.getNoteById(id);

        if (!note) throw new NotFoundException();
        if (note.userId !== userId) throw new ForbiddenException();

        return this.notesRepository.delete(id);
    }
}