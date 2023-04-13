import { IsNotEmpty } from "class-validator";
import { MusicsEntity } from "../../musics/musics.entity";

export class UpdatePlaylistDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  musics: MusicsEntity[];

}