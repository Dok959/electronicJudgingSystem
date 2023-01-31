import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class RefreshJWTGuard implements CanActivate {
  constructor(private authService: AuthService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { refresh_token, access_token } = request.body;

    if (!refresh_token) {
      throw new UnauthorizedException(`Поле refresh_token обязательно`);
    }

    if (!access_token) {
      throw new UnauthorizedException(`Поле access_token обязательно`);
    }

    const checkUser = this.authService.getUserByTokenData(access_token);

    if (!checkUser) {
      throw new UnauthorizedException(`Пользователя не существует`);
    }

    return true;
  }
}
