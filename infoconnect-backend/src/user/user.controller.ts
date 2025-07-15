import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';

@Controller('utilisateurs')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUtilisateurDto: CreateUtilisateurDto) {
    return this.userService.create(createUtilisateurDto);
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: Partial<CreateUtilisateurDto>,
  ) {
    return this.userService.update(id, updateData);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}
