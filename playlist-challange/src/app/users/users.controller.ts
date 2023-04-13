import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UsersService } from "./users.service";
import { JwtAuthGuard } from "src/auth/jwt-auth-guard";

@Controller("api/users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  async index() {
    return this.usersService.findAll();
  }
  
  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async store(@Body() body: CreateUserDto) {
    return this.usersService.store(body);
  }

  @Get(":id")
  @HttpCode(HttpStatus.FOUND)
  async show(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.usersService.findOneOrFail({ id });
  }

  @Put(":id")
  @HttpCode(HttpStatus.OK)
  async update(@Param('id', new ParseUUIDPipe()) 
  id: string, 
  @Body() body: UpdateUserDto) {
    return this.usersService.update(id, body);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.usersService.destroy(id);
  }
}
