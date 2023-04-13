import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "./app/users/users.module";
import { AuthModule } from './auth/auth.module';
import { PlaylistModule } from './app/playlist/playlist.module';
import { MusicsModule } from './app/musics/musics.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.TYPEORM_HOST,
      port: 5432,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [__dirname + "/**/*.entity{.js,.ts}"],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    PlaylistModule,
    MusicsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
