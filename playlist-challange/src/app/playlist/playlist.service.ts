import { Injectable, NotFoundException } from '@nestjs/common';
import { PlaylistEntity } from './playlist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
@Injectable()
export class PlaylistService {
  constructor(
    @InjectRepository(PlaylistEntity)
    private readonly playlistRepository: Repository<PlaylistEntity>,
  ) {}

  async findAll() {
    return await this.playlistRepository.find({
      select: ['name', 'musics', 'userId'],
    });
  }

  async findPlaylistByUserId(id: number) {
    return await this.playlistRepository.find({
      select: ['name', 'musics', 'userId'],
      where: { id }
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

  async update(id: number, data: UpdatePlaylistDto) {
    const playlist = await this.findOneOrFail({ id });
    this.playlistRepository.merge(playlist, data);
    return await this.playlistRepository.save(playlist);
  }

  async updateIfUserPlayList(userId, id: number, data: UpdatePlaylistDto) {
    const playlist = await this.findOneOrFail({ id, userId: userId});
    this.playlistRepository.merge(playlist, data);
    return await this.playlistRepository.save(playlist);
  }

  async destroy(id: number) {
    await this.playlistRepository.findOneOrFail({ id });
    this.playlistRepository.softDelete({ id });
  }

  async destroyIfUserPlaylist(userId, id: number) {
    await this.playlistRepository.findOneOrFail({ id, userId: userId });
    this.playlistRepository.softDelete({ id });
  }
}
