import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../../users';

@Injectable()
export class RegistrationGuard implements CanActivate {
  constructor(private userService: UserService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { email, password } = request.body;
    const user = await this.userService.search({
      email: email,
      password: password,
    });

    if (user) {
      throw new UnauthorizedException(
        `Пользователь с почтой ${email} уже существует`,
      );
    }
    return true;
  }
}
