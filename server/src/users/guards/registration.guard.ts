import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user.service';

@Injectable()
export class RegistrationGuard implements CanActivate {
  constructor(private userService: UserService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { email } = request.body;
    // const user = await this.userService.findOne({ email });
    const user = await this.userService.validateUser({ email });

    if (user) {
      throw new UnauthorizedException(
        `Пользователь с почтой ${email} уже существует`,
      );
    }
    return true;
  }
}
