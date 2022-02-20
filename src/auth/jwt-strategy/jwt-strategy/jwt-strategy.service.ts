import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { jwtCOnstants } from 'src/common/constants/jwt.constants';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtCOnstants.secret,
    });
  }

  async validate(payload: any) {
    console.log('is it running');
    const isValidated = await this.authService.validateUserById(payload.id);
    if (isValidated) {
      return { userId: payload.id, email: payload.email };
    } else {
      throw new UnauthorizedException('UnAuthorized');
    }
  }
}
