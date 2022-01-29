import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { User } from '../entity/user.entity';
import { UserService } from '../user.service';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      currentUser?: User;
    }
  }
}

// cookie-sessionの次に発動する。
// cookie-session → currentUserMiddleware → authGuardの流れ
@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private userService: UserService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    // eslint-disable-next-line
    // @ts-ignore
    const { userId } = req.session || {};

    if (userId) {
      const user = await this.userService.findOne(userId);
      // eslint-disable-next-line
      // @ts-ignore
      req.currentUser = user;
    }

    next();
  }
}
