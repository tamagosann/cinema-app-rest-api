import { MiddlewareConsumer, Module, Scope } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { CurrentUserMiddleware } from './middlewares/current-user.middleware';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    UserService,
    // ここにかいて、UseInterceptorをグローバルに発動させることもできる。（user.controllerを参照。）
    // {
    //   provide: APP_INTERCEPTOR,
    //   scope: Scope.REQUEST,
    //   useClass: CurrentUserInterceptor,
    // },
  ],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    // 全てのcurrentUser使うリクエストでこのmiddlewareを発動させる
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
