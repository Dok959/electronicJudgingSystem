import { Injectable } from '@nestjs/common';
import { Athlete, Prisma, SettingsEvent } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

type IPartisipants = {
  athlete: Athlete;
  settingsEvent: SettingsEvent;
};

@Injectable()
export class PartisipantService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllRegistered(id: number): Promise<IPartisipants[]> {
    const partisipants = await this.prisma.partisipantsIndividual.findMany({
      where: { settingsEvent: { eventId: id } },
      select: { athlete: true, settingsEvent: true },
    });

    return partisipants;
  }

  async getAllOnRegistered(id: number): Promise<Athlete[]> {
    const athletes = await this.prisma.athlete.findMany();

    const partisipants = await this.prisma.partisipantsIndividual.findMany({
      where: { settingsEvent: { eventId: { not: id } } },
      select: { athlete: true },
    });

    const masIdPartisipants = partisipants.map((item) => item.athlete.id);

    const difference = athletes.filter(
      (user) => !masIdPartisipants.includes(user.id),
    );

    return difference;
  }

  async insert(
    PartisipantsIndividualCreateManyArgs: Prisma.PartisipantsIndividualCreateManyArgs,
  ): Promise<boolean> {
    const result = await this.prisma.partisipantsIndividual.createMany(
      PartisipantsIndividualCreateManyArgs,
    );
    return result ? true : false;
  }
}
