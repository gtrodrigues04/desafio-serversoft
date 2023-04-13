import { IsNotEmpty } from 'class-validator';
import { CreateMusicDto } from 'src/app/musics/dto/create-music.dto';

export class CreatePlaylistDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  musics: CreateMusicDto[];

  @IsNotEmpty()
  userId: string;
  
}