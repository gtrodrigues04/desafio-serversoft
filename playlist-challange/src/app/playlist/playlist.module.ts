import { Module } from '@nestjs/common';
import { PlaylistEntity } from './playlist.entity';
import { PlaylistController } from './playlist.controller';
import { PlaylistService } from './playlist.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MusicsService } from '../musics/musics.service';
import { MusicsModule } from '../musics/musics.module';
import { MusicsEntity } from '../musics/musics.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlaylistEntity, MusicsEntity]), MusicsModule],
  controllers: [PlaylistController],
  providers: [PlaylistService, MusicsService],
  exports: [PlaylistService]
})
export class PlaylistModule {}
