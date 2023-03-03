import { Injectable } from '@nestjs/common';
import { Prisma, SettingsEvent as SettingsModel } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SettingsService {
  constructor(private prisma: PrismaService) {}

  async findOne(
    settingsEventFindUniqueArgs: Prisma.SettingsEventFindUniqueArgs,
  ): Promise<SettingsModel> {
    return await this.prisma.settingsEvent.findUnique(
      settingsEventFindUniqueArgs,
    );
  }

  async create(
    settingsEventCreateArgs: Prisma.SettingsEventCreateArgs,
  ): Promise<SettingsModel> {
    return await this.prisma.settingsEvent.create(settingsEventCreateArgs);
  }

  async update(
    settingsEventUpdateArgs: Prisma.SettingsEventUpdateArgs,
  ): Promise<SettingsModel> {
    return await this.prisma.settingsEvent.update(settingsEventUpdateArgs);
  }

  async delete(
    settingsEventDeleteArgs: Prisma.SettingsEventDeleteArgs,
  ): Promise<SettingsModel> {
    return await this.prisma.settingsEvent.delete(settingsEventDeleteArgs);
  }
}
