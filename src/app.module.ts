import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

import { SsrController } from './ssr/ssr.controller';
import { SsrService } from './ssr/ssr.service';
import { SsrModule } from './ssr/ssr.module';
import { FilmController } from './film/film.controller';
import { FilmService } from './film/film.service';
import { FilmModule } from './film/film.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { PeopleModule } from './people/people.module';
import { AuthModule } from './auth/auth.module';
import { User } from './user/entity/user.entity';
import { FilmReview } from './film/entity/filmReview.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql',
      port: 3306,
      database: 'admin',
      username: 'admin',
      password: 'pass',
      entities: [User, FilmReview],
      synchronize: true,
    }),
    UserModule,
    FilmModule,
    SsrModule,
    PeopleModule,
    AuthModule,
  ],
  controllers: [AppController, SsrController],
  providers: [SsrService],
})
export class AppModule {}
