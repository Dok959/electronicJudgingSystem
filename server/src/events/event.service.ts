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
            // type: { select: { title: true } },
            // rank: { select: { title: true } },
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

  async create(eventCreateArgs: any): Promise<EventModel> {
    const newEvent = await this.prisma.event.create({
      data: {
        title: eventCreateArgs.title,
        startDateTime: eventCreateArgs.startDateTime,
        duration: eventCreateArgs.duration,
        SettingsEvent: {
          createMany: {
            data: eventCreateArgs.SettingsEvent as Prisma.SettingsEventCreateManyEventInput,
          },
        },
      },
    });

    const event = this.findOne({ where: { id: newEvent.id } });
    return event;
  }

  async update(eventUpdateArgs: Prisma.EventUpdateArgs): Promise<EventModel> {
    const data = eventUpdateArgs as Prisma.EventUncheckedUpdateInput;
    await this.prisma.settingsEvent.deleteMany({
      where: { eventId: Number(data.id) },
    });
    const updateEvent = await this.prisma.event.update({
      where: {
        id: Number(data.id),
      },
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

    return updateEvent;
  }

  async delete(eventDeleteArgs: Prisma.EventDeleteArgs): Promise<EventModel> {
    return await this.prisma.event.delete(eventDeleteArgs);
  }
}
