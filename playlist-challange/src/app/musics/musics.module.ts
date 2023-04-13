import { Module } from '@nestjs/common';
import { MusicsService } from './musics.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MusicsEntity } from './musics.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MusicsEntity])],
  controllers: [],
  providers: [MusicsService],
  exports: [MusicsService]
})
export class MusicsModule {}
