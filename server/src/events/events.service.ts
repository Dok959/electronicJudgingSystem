import { Injectable } from '@nestjs/common';
import { Event as EventModel, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async findOneEvent(
    eventFindUniqueArgs: Prisma.EventFindUniqueArgs,
  ): Promise<EventModel> {
    return await this.prisma.event.findUnique({
      where: eventFindUniqueArgs.where,
    });
  }

  async findAllEvents(
    eventFindManyArgs?: Prisma.EventFindManyArgs,
  ): Promise<EventModel[]> {
    return await this.prisma.event.findMany({
      where: eventFindManyArgs.where,
    });
  }

  async createEvent(
    eventCreateArgs: Prisma.EventCreateArgs,
  ): Promise<EventModel> {
    const data = eventCreateArgs.data;
    if (data['startDate'] !== undefined) {
      data['startDate'] = new Date(data['startDate']);
    }
    if (data['startTime'] !== undefined) {
      const time: number[] = (data['startTime'] as string)
        .split(':')
        .map((item) => Number(item));
      const date = new Date(
        new Date(data['startDate']).setHours(time[0], time[1], time[2]),
      );
      const offset = date.getTimezoneOffset() / 60;
      data['startTime'] = new Date(
        new Date(date).setHours(date.getHours() - offset),
      ).toISOString();
    }

    return await this.prisma.event.create({
      data: eventCreateArgs.data,
    });
  }
}
