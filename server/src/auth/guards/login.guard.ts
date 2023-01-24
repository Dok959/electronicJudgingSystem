import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { email, password } = request.body;
    const user = await this.authService.validateUser(email);

    if (!user) {
      throw new UnauthorizedException(`Пользователя не существует`);
    }

    if (user.password !== password) {
      throw new UnauthorizedException(`Некорректный пароль`);
    }

    return true;
  }
}
