import { IsNotEmpty } from 'class-validator';


export class CreatePlaylistDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  musics: string[];

  @IsNotEmpty()
  userId: string;
  
}