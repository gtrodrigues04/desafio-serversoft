import { Column, Entity,  PrimaryGeneratedColumn } from "typeorm";
@Entity({ name: 'playlist' })
export class PlaylistEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  genre: string;

  @Column('json')
  musics: string[];

  @Column({ name: 'user_id' })
  userId: string;

  
}