import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEraseDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: '1234567aB!', description: "User's password" })
    password: string;
}