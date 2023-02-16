import { Injectable } from '@nestjs/common';
import { Event as EventModel, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

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
