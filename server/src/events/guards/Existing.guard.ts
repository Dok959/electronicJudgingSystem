import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { EventsService } from '../events.service';

@Injectable()
export class ExistingGuard implements CanActivate {
  constructor(private eventsService: EventsService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { id } = request.body;
    const event = await this.eventsService.findOne({
      where: { id: parseInt(id) },
    });
    if (!event) {
      return false;
    }

    return true;
  }
}
