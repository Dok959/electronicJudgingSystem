import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { SettingsService } from '../settings.service';

@Injectable()
export class ExistingGuard implements CanActivate {
  constructor(private settingsService: SettingsService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { id } = request.body;
    const event = await this.settingsService.findOne({
      where: { id: parseInt(id) },
    });
    if (!event) {
      return false;
    }

    return true;
  }
}
