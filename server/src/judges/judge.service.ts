import { Injectable } from '@nestjs/common';
import { Prisma, User, Event } from '@prisma/client';
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

    const result = events
      .filter((item) => {
        const now = dayjs();
        const dateStart = dayjs(item.event.startDateTime);
        const difference = dateStart.diff(now, 'h');
        difference / 3600 < 6 ? item.event : null;
      })
      .find((item) => item);

    return result;
  }
}
