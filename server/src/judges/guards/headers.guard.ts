import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class HeadersGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    // TODO проверка на существование
    if (!request.headers.eventid) {
      return false;
    }
    return true;
  }
}
