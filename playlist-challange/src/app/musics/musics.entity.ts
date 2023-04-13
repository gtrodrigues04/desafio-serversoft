import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PlaylistEntity } from "../playlist/playlist.entity";

@Entity({ name: 'musics' })
export class MusicsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => PlaylistEntity, playlist => playlist.musics)
  @JoinColumn({ name: 'playlist_id' })
  playlist: PlaylistEntity;
  
  @Column()
  genre: string;

  @Column()
  artist: string;
}