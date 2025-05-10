import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { UserRole } from 'prisma/__generated__';

import { UserService } from '@/user/user.service';

interface AuthenticatedUser {
  role: UserRole;
}

interface AuthenticatedRequest extends Request {
  user: AuthenticatedUser;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();

    if (typeof request.session.userId === 'undefined') {
      throw new UnauthorizedException('Пользователь не авторизован');
    }

    const user = await this.userService.findById(request.session.userId);

    request.user = user;
    return true;
  }
}
