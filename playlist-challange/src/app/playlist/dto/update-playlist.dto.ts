import { IsNotEmpty } from "class-validator";

export class UpdatePlaylistDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  musics: string[];

}