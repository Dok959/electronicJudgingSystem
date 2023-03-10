import { Injectable } from '@nestjs/common';
import { Event as EventModel, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class EventService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(
    eventFindUniqueArgs: Prisma.EventFindUniqueArgs,
  ): Promise<EventModel | null> {
    return await this.prisma.event.findUnique({
      where: eventFindUniqueArgs.where,
      include: {
        SettingsEvent: {
          select: {
            type: true,
            rank: true,
          },
        },
      },
    });
  }

  async findAll(
    masRanksId: number[] | [],
    cursorInit: number,
  ): Promise<EventModel[] | null> {
    if (cursorInit === 0) {
      return await this.prisma.event.findMany({
        take: 2,
        orderBy: {
          startDateTime: 'asc',
        },
        where: {
          startDateTime: {
            gte: new Date(),
          },
          SettingsEvent: {
            some: {
              rankId: { in: masRanksId },
            },
          },
        },
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
    return await this.prisma.event.findMany({
      take: 2,
      skip: 1,
      cursor: { id: cursorInit },
      orderBy: {
        startDateTime: 'asc',
      },
      where: {
        startDateTime: {
          gte: new Date(),
        },
        SettingsEvent: {
          some: {
            rankId: { in: masRanksId },
          },
        },
      },
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
    const data = eventCreateArgs.data;
    const newEvent = await this.prisma.event.create({
      data: {
        title: data.title,
        startDateTime: data.startDateTime,
        duration: data.duration,
        SettingsEvent: {
          createMany: {
            data: data.SettingsEvent as Prisma.SettingsEventCreateManyEventInput,
          },
        },
      },
    });

    const event = this.findOne({ where: { id: newEvent.id } });
    return event;
  }

  async update(eventUpdateArgs: Prisma.EventUpdateArgs): Promise<EventModel> {
    return await this.prisma.event.update(eventUpdateArgs);
  }

  async delete(eventDeleteArgs: Prisma.EventDeleteArgs): Promise<EventModel> {
    return await this.prisma.event.delete(eventDeleteArgs);
  }
}
