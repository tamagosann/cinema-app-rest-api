import { CanActivate, ExecutionContext } from '@nestjs/common';

export class AuthGUard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    console.log('きてたらok');
    // ここがtrueになって返される時はリクエストが許可される
    return request.session.userId;
  }
}
