import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class RegistrationGuard implements CanActivate {
  constructor(private authService: AuthService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { email } = request.body;
    const user = await this.authService.validateUser(email);

    if (user) {
      throw new UnauthorizedException(
        `Пользователь с почтой ${email} уже существует`,
      );
    }
    return true;
  }
}
