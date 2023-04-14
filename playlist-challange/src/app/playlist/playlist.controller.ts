import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, UseGuards, Request } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '../users/enums/role.enum';

@UseGuards(AuthGuard('jwt'))
@Controller('api/playlist')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}
  
  @UseGuards(AuthGuard('jwt'))
  @Get()
  @HttpCode(HttpStatus.OK)
  async index(@Request() req: any) {
    if (req.user.role === Role.ADMIN) {
      return this.playlistService.findAll();
    } else {
      return this.playlistService.findPlaylistByUserId(req.user.id);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async store(@Body() body: CreatePlaylistDto, @Request() req: any) {
    body.userId = req.user.id;
    return this.playlistService.store(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(":id")
  @HttpCode(HttpStatus.FOUND)
  async show(@Param('id', new ParseUUIDPipe()) id: number, @Request() req: any) {
    if (req.user.role === Role.ADMIN) {
      return this.playlistService.findOneOrFail({ id });
    } else {
      return this.playlistService.findOneOrFail({ id, userId: req.user.id })
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(":id")
  @HttpCode(HttpStatus.OK)
  async update(@Param('id', new ParseUUIDPipe()) 
  id: number,
  @Request() req: any, 
  @Body() body: UpdatePlaylistDto) {
    if (req.user.role === Role.ADMIN) {
      return this.playlistService.update(id, body);
    } else {
      return this.playlistService.updateIfUserPlayList(req.user.id, id, body);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id', new ParseUUIDPipe()) id: number, @Request() req: any) {
    if (req.user.role === Role.ADMIN) {
      return this.playlistService.destroy(id);
    } else {
      return this.playlistService.destroyIfUserPlaylist(req.user.id, id);
    }
  }
}
