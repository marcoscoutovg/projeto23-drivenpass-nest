import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { User } from '../decorators/user.decorator';
import { AuthGuard } from '../guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('notes')
export class NotesController {
    constructor(private readonly notesService: NotesService) { }

    @Post()
    create(@Body() createNoteDto: CreateNoteDto, @User() user) {
        const { id } = user;

        return this.notesService.create(createNoteDto, id);
    }

    @Get()
    getNotes(@User() user) {
        const { id } = user;
        return this.notesService.getNotes(id);
    }

    @Get(':id')
    getNotesByUserId(@Param('id', ParseIntPipe) id: string, @User() user) {
        const userId = user.id;

        return this.notesService.getNoteById(+id, userId);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: string, @User() user) {
        const userId = user.id;

        return this.notesService.delete(+id, userId)
    }

}