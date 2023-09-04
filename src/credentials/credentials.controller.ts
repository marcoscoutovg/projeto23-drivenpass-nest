import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, ParseIntPipe } from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../guards/auth.guard';
import { User } from '../decorators/user.decorator';
import { Users as UserPrisma } from '@prisma/client';

@ApiTags('credentials')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('credentials')
export class CredentialsController {
  constructor(private readonly credentialsService: CredentialsService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new credential' })
  @ApiResponse({ status: 201, description: "Credential created" })
  create(
    @Body() createCredentialDto: CreateCredentialDto,
    @User() user: UserPrisma,
  ) {
    return this.credentialsService.create(createCredentialDto, user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users credentials' })
  @ApiResponse({ status: 200, description: "Credentials found" })
  findAll(@User() user: UserPrisma) {
    return this.credentialsService.findAll(user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get credential by credentialId' })
  @ApiResponse({ status: 200, description: "Credential found" })
  findOne(@Param('id', ParseIntPipe) id: string, @User() user: UserPrisma) {
    return this.credentialsService.findOne(+id, user.id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete credential by credentialId' })
  @ApiResponse({ status: 200, description: "Credential deleted" })
  delete(@Param('id', ParseIntPipe) id: string, @User() user: UserPrisma) {
    return this.credentialsService.delete(+id, user.id);
  }
}