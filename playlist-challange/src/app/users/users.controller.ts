import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, UseGuards, Request, ForbiddenException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UsersService } from "./users.service";
import { AuthGuard } from "@nestjs/passport";
import { Role } from "./enums/role.enum";
import { MessagesHelper } from "src/helpers/messages.helper";

@Controller("api/users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
  @UseGuards(AuthGuard('jwt'))
  @Get()
  @HttpCode(HttpStatus.OK)
  async index(@Request() req: any) {
      if (req.user.role === Role.ADMIN) {
        return this.usersService.findAll();
      } else {
        throw new ForbiddenException(MessagesHelper.USER_UNAUTHORIZED);
      }
  }
  
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async store(@Body() body: CreateUserDto) {
    return this.usersService.store(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(":id")
  @HttpCode(HttpStatus.FOUND)
  async show(@Param('id', new ParseUUIDPipe()) id: number, @Request() req: any) {
    if (req.user.role === Role.ADMIN) {
      return this.usersService.findOneOrFail({ id });
    } else {
      throw new ForbiddenException(MessagesHelper.USER_UNAUTHORIZED);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(":id")
  @HttpCode(HttpStatus.OK)
  async update(@Param('id', new ParseUUIDPipe())
  id: number,
  @Request() req: any, 
  @Body() body: UpdateUserDto) {
    if (req.user.role === Role.ADMIN) {
    return this.usersService.update(id, body);
    } else {
      throw new ForbiddenException(MessagesHelper.USER_UNAUTHORIZED);
    }
  }
  
  @UseGuards(AuthGuard('jwt'))
  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id', new ParseUUIDPipe()) id: number, @Request() req: any) {
    if (req.user.role === Role.ADMIN) {
      return this.usersService.destroy(id);
    } else {
      throw new ForbiddenException(MessagesHelper.USER_UNAUTHORIZED);
    }
  }
}
