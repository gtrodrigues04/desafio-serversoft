import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { PlaylistEntity } from './playlist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { MusicsService } from '../musics/musics.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';

@Injectable()
export class PlaylistService {
  constructor(
    @InjectRepository(PlaylistEntity)
    private readonly playlistRepository: Repository<PlaylistEntity>,
    private readonly musicsService: MusicsService
  ) {}

  async findAll() {
    return await this.playlistRepository.find({
      select: ['name', 'musics', 'userId'],
    });
  }

  async findOneOrFail(
    conditions: FindConditions<PlaylistEntity>,
    options?: FindOneOptions<PlaylistEntity>,
  ) {
    try {
      return await this.playlistRepository.findOneOrFail(conditions, options);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async store(data: CreatePlaylistDto) {
    const playlist = this.playlistRepository.create(data);
    return await this.playlistRepository.save(playlist);
  }

  async update(id: string, data: UpdatePlaylistDto) {
    const playlist = await this.findOneOrFail({ id });
    this.playlistRepository.merge(playlist, data);
    return await this.playlistRepository.save(playlist);
  }

  async destroy(id: string) {
    await this.playlistRepository.findOneOrFail({ id });
    this.playlistRepository.softDelete({ id });
  }
}
