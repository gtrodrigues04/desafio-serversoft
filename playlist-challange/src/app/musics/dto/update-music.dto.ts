import { IsNotEmpty } from "class-validator";

export class UpdateMusicDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  genre: string;

  @IsNotEmpty()
  artist: string;
}