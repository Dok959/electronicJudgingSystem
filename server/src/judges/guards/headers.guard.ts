import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
// import { UserService } from '../../users';

@Injectable()
export class HeadersGuard implements CanActivate {
  // constructor(private userService: UserService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    console.log(request.headers);
    // const accessToken: string = request.headers.authorization || null;

    // const checkUser = await this.userService.getUserByTokenData(accessToken);

    // if (!checkUser) {
    //   request.headers.user = '';
    //   return false;
    // }

    request.eventId = 1;
    return true;
  }
}
