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

      const validToken = this.authService.verifyToken(accessToken);

      if (validToken?.error) {
        const validToken = this.authService.verifyToken(refreshToken);

        const checkUser = await this.authService.getUserByTokenData(
          accessToken,
        );
        if (validToken?.error && !checkUser) {
          throw new UnauthorizedException('Ошибка чтения токена');
        }
        if (!checkUser) {
          throw new UnauthorizedException(`Пользователя не существует`);
        }

        const access = await this.authService.generateAccessToken(checkUser);

        if (validToken?.error) {
          if (validToken?.error === 'jwt expired') {
            const refresh = await this.authService.generateRefreshToken(
              checkUser.id,
            );
            request.headers.authorization = access.access_token;
            request.headers.refresh = refresh.refresh_token;
            return true;
          } else {
            throw new UnauthorizedException(validToken.error);
          }
        } else {
          request.headers.authorization = access.access_token;
          return true;
        }
      }

      // request.token = accessToken;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Ошибка чтения токена');
    }
  }
}
