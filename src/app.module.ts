import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SsrController } from './ssr/ssr.controller';
import { SsrService } from './ssr/ssr.service';
import { SsrModule } from './ssr/ssr.module';
import { FilmController } from './film/film.controller';
import { FilmService } from './film/film.service';
import { FilmModule } from './film/film.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql',
      port: 3306,
      username: 'admin',
      password: 'pass',
      autoLoadEntities: true,
      synchronize: true,
    }),
    SsrModule,
    FilmModule,
  ],
  controllers: [AppController, SsrController, FilmController],
  providers: [AppService, SsrService, FilmService],
})
export class AppModule {}
