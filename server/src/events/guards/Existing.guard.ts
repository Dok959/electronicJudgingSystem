import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { EventService } from '../event.service';

@Injectable()
export class ExistingGuard implements CanActivate {
  constructor(private eventService: EventService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { id } = request.body;
    const event = await this.eventService.findOne({
      where: { id: parseInt(id) },
    });
    if (!event) {
      return false;
    }

    return true;
  }
}
