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

      const token: string = request.headers.authorization.split(' ')[1] || null;
      console.log(token);

      if (!token) {
        throw new UnauthorizedException('Ошибка авторизации');
      }

      const validToken = this.authService.verifyToken(token);
      console.log(validToken);

      if (validToken?.error) {
        throw new UnauthorizedException(validToken.error);
      }

      request.token = token;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Ошибка чтения токена');
    }
  }
}
