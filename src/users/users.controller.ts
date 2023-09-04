import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }


    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.getUserById(+id);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.delete(+id);
    }

}