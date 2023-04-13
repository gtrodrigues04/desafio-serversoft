import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MusicsEntity } from './musics.entity';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';
import { CreateMusicDto } from './dto/create-music.dto';

@Injectable()
export class MusicsService {
  constructor(@InjectRepository(MusicsEntity)
  private readonly musicsRepository: Repository<MusicsEntity>
  ) {}

  async findAll() {
    return await this.musicsRepository.find({
      select: ['name', 'genre', 'artist']
    })
  }

  async findOneOrFail(
    conditions: FindConditions<MusicsEntity>,
    options?: FindOneOptions<MusicsEntity>
  ) {
    try {
      return await this.musicsRepository.findOneOrFail(conditions, options);
    } catch(error) {
      throw new NotFoundException(error.message);
    }
  }

  async store(data: CreateMusicDto) {
    const music = this.musicsRepository.create(data);
    return await this.musicsRepository.save(music);
  }

  
}
