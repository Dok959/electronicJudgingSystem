import { Injectable } from '@nestjs/common';
import { Event as EventModel, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { EventAndSettings } from 'types';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async findOne(
    eventFindUniqueArgs: Prisma.EventFindUniqueArgs,
  ): Promise<EventModel> {
    return await this.prisma.event.findUnique({
      where: eventFindUniqueArgs.where,
    });
  }

  async findAll(
    eventFindManyArgs?: Prisma.EventFindManyArgs,
  ): Promise<EventModel[]> {
    return await this.prisma.event.findMany({
      where: eventFindManyArgs.where,
    });
  }

  async findAllEventsAndSettings(): Promise<EventAndSettings[]> {
    return await this.prisma.event.findMany({
      include: {
        SettingsEvent: {
          select: {
            type: { select: { title: true } },
            rank: { select: { title: true } },
          },
        },
      },
    });
  }

  async create(eventCreateArgs: Prisma.EventCreateArgs): Promise<EventModel> {
    return await this.prisma.event.create({
      ...eventCreateArgs,
    });
  }

  async update(eventUpdateArgs: Prisma.EventUpdateArgs): Promise<EventModel> {
    return await this.prisma.event.update({
      ...eventUpdateArgs,
    });
  }

  async delete(eventDeleteArgs: Prisma.EventDeleteArgs): Promise<EventModel> {
    return await this.prisma.event.delete({
      ...eventDeleteArgs,
    });
  }
}
