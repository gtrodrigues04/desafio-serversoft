import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';

@Controller('api/playlist')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  async index() {
    return this.playlistService.findAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async store(@Body() body: CreatePlaylistDto) {
    return this.playlistService.store(body);
  }

  @Get(":id")
  @HttpCode(HttpStatus.FOUND)
  async show(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.playlistService.findOneOrFail({ id });
  }

  @Put(":id")
  @HttpCode(HttpStatus.OK)
  async update(@Param('id', new ParseUUIDPipe()) 
  id: string, 
  @Body() body: UpdatePlaylistDto) {
    return this.playlistService.update(id, body);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.playlistService.destroy(id);
  }
}
