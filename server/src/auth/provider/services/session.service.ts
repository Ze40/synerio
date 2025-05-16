import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { User } from 'prisma/__generated__';

@Injectable()
export class SessionService {
  async saveSession(req: Request, user: User) {
    return new Promise((resolve, reject) => {
      req.session.userId = user.id;
      req.session.save((err) => {
        if (err) {
          return reject(new Error('Не удалось сохранить сессию'));
        }

        resolve({ user });
      });
    });
  }
}
