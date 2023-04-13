import { IsNotEmpty } from "class-validator";

export class CreateMusicDto {

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  genre: string;

  @IsNotEmpty()
  artist: string;
}