import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
// eslint-disable-next-line
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  // ここで、cookieをセッションとして使っている。キーは暗号化。
  // app.moduleでもおなじことができる
  // app.use(
  //   cookieSession({
  //     keys: ['asdfasdf'],
  //   }),
  // );
  // ここでdtoから外れたパラメータは省くように設定。
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  const config = new DocumentBuilder()
    .setTitle('cinema-app')
    .setDescription('Cinema-app API description')
    .setVersion('1.0')
    .addTag('cinema')
    .addCookieAuth('optional-session-id')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
