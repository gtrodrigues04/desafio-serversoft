import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  async index() {
    return null;
  }

  @Post()
  async store() {
    return null;
  }

  @Get(':id')
  async show() {
    return null;
  }

  @Put(':id')
  async update() {
    return null;
  }

  @Delete(':id')
  async destroy() {
    return null;
  }
}
