import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class JWTGuard implements CanActivate {
  constructor(private authService: AuthService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();

      const accessToken: string = request.headers.authorization || null;
      const refreshToken: string = request.headers.refresh || null;

      if (!refreshToken) {
        throw new UnauthorizedException(`Поле refresh_token обязательно`);
      }
      if (!accessToken) {
        throw new UnauthorizedException(`Поле access_token обязательно`);
      }

      const isValidAccessToken = this.authService.verifyToken(accessToken);

      const checkUser = await this.authService.getUserByTokenData(accessToken);
      if (!checkUser) {
        throw new UnauthorizedException(`Пользователя не существует`);
      }
      request.headers.user = checkUser;

      if (isValidAccessToken?.error) {
        const isValidRefreshToken = this.authService.verifyToken(refreshToken);

        const access = await this.authService.generateAccessToken(checkUser);

        if (isValidRefreshToken?.error === 'jwt expired') {
          const refresh = await this.authService.generateRefreshToken(
            checkUser.id,
          );
          request.headers.authorization = access.access_token;
          request.headers.refresh = refresh.refresh_token;
          return true;
        } else if (isValidRefreshToken?.error) {
          throw new UnauthorizedException('Ошибка проверки токенов');
        } else {
          request.headers.authorization = access.access_token;
          return true;
        }
      }

      return true;
    } catch (error) {
      throw new UnauthorizedException('Ошибка проверки данных');
    }
  }
}
