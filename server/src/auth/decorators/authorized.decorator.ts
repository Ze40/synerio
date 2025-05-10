import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { User } from 'prisma/__generated__';

type AuthenticatedUser = Pick<User, 'role'> & {
  [K in keyof User]?: User[K];
};

interface AuthenticatedRequest extends Request {
  user: AuthenticatedUser;
}

export const Authorized = createParamDecorator(
  <K extends keyof AuthenticatedUser>(
    property: K | undefined,
    ctx: ExecutionContext,
  ): AuthenticatedUser[K] | AuthenticatedUser => {
    const request = ctx.switchToHttp().getRequest<AuthenticatedRequest>();
    const user = request.user;

    if (!user) {
      throw new Error('Пользователь не аутентифицирован');
    }

    if (property && !(property in user)) {
      throw new Error(
        `Свойство ${String(property)} не существует в объекте пользователя`,
      );
    }

    return property ? user[property] : user;
  },
);
