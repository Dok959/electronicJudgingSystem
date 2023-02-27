import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../../users';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private userService: UserService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { email, password } = request.body;
    const user = await this.userService.search({
      email: email,
      password: password,
    });

    if (!user) {
      throw new UnauthorizedException(`Пользователя не существует`);
    }

    if (user.password !== password) {
      throw new UnauthorizedException(`Некорректный пароль`);
    }

    return true;
  }
}
