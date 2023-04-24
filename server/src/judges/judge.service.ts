import { Injectable } from '@nestjs/common';
import { Prisma, User, Event, Place, PlacesEvent, Item } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import * as dayjs from 'dayjs';

@Injectable()
export class JudgeService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllOnRegistered(id: number): Promise<User[]> {
    const users = await this.prisma.user.findMany();

    const judges = await this.prisma.judge.findMany({
      where: { eventId: id },
      select: { user: true },
    });

    const masIdJudges = judges.map((item) => item.user.id);

    const difference = users.filter((user) => !masIdJudges.includes(user.id));

    return difference;
  }

  async getAllRegistered(id: number): Promise<User[]> {
    const judges = await this.prisma.judge.findMany({
      where: { eventId: id },
      select: { user: true },
    });

    return judges.map((item) => item.user);
  }

  async insert(judgeCreateArgs: Prisma.JudgeCreateManyArgs): Promise<boolean> {
    const result = await this.prisma.judge.createMany(judgeCreateArgs);
    return result ? true : false;
  }

  async start(id: number): Promise<{ event: Event | null }> {
    const events = await this.prisma.judge.findMany({
      where: { userId: id },
      orderBy: {
        event: {
          startDateTime: 'asc',
        },
      },
      select: {
        event: true,
      },
    });

    const result = events.find((item) => {
      const now = dayjs();
      const dateStart = dayjs(item.event.startDateTime);
      let difference = dateStart.diff(now, 'h');
      if (difference / 3600 < 6) {
        return item.event;
      }
      const dateEnd = dateStart.add(item.event.duration);
      difference = dateEnd.diff(now, 'h');
      if (dateStart < now && difference / 3600 > 0) {
        return item.event;
      }
    });
    // .find((item) => item);

    return result;
  }

  // Список мест
  async getPlaces(): Promise<Place[]> {
    const places = await this.prisma.place.findMany();
    return places;
  }

  // Список занятых мест
  async getBusyPlaces(eventId: number): Promise<PlacesEvent[]> {
    const places = await this.prisma.placesEvent.findMany({
      where: {
        judge: {
          eventId: eventId,
        },
      },
    });
    return places;
  }

  // Занять место
  async setPlace(data: Prisma.PlacesEventCreateArgs): Promise<PlacesEvent> {
    const place = await this.prisma.placesEvent.create(data);
    return place;
  }

  // Получить идентификатор судьи
  async getJudge(eventId: number, userId: number): Promise<number> {
    const judge = await this.prisma.judge.findFirst({
      where: { eventId: eventId, userId: userId },
      select: { id: true },
    });
    return judge.id;
  }

  // Получить место судьи
  async getPlace(eventId: number, userId: number): Promise<PlacesEvent> {
    const place = await this.prisma.placesEvent.findFirst({
      where: { judge: { eventId, userId } },
    });
    return place;
  }

  // Получить список предметов
  async getItems(): Promise<Item[]> {
    const items = await this.prisma.item.findMany();
    return items;
  }

  // Создать последовательность выступлений
  async setQueue(args: Prisma.QueuePartisipantsIndividualCreateManyArgs) {
    const queue = await this.prisma.queuePartisipantsIndividual.createMany(
      args,
    );
    return queue ? true : false;
  }

  // Получить последовательность выступлений
  async getQueue(eventId: number) {
    const queue = await this.prisma.queuePartisipantsIndividual.findMany({
      where: { partisipant: { settingsEvent: { eventId } } },
      select: {
        id: true,
        item: true,
        partisipant: { select: { id: true, athlete: true } },
      },
    });
    console.log(queue);
    console.log(queue[0].partisipant.athlete);
    return queue;
  }
}
