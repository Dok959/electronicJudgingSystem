import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UserService } from '../user.service';

@Injectable()
export class HeadersGuard implements CanActivate {
  constructor(private userService: UserService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const accessToken: string = request.headers.authorization || null;

    const checkUser = await this.userService.getUserByTokenData(accessToken);

    if (!checkUser) {
      request.headers.user = '';
      return false;
    }

    request.headers.user = checkUser;
    return true;
  }
}
