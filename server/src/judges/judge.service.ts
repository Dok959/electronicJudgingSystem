import { Injectable } from '@nestjs/common';
import { Judge, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

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
}
