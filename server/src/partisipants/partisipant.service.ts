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

  async getAllRegistered(eventId: number): Promise<IPartisipants[]> {
    const partisipants = await this.prisma.partisipantsIndividual.findMany({
      where: { settingsEvent: { eventId: eventId } },
      select: { athlete: true, settingsEvent: true },
    });

    return partisipants;
  }

  async getAllOnRegistered(id: number): Promise<IPartisipants[]> {
    const athletes = await this.prisma.athlete.findMany();

    const settingsEvent = await this.prisma.settingsEvent.findMany({
      where: { eventId: id },
    });

    const partisipants = await this.prisma.partisipantsIndividual.findMany({
      where: { settingsEvent: { eventId: id } },
      select: { athlete: true },
    });

    const masIdPartisipants = partisipants.map((item) => item.athlete.id);

    const difference = athletes
      .filter((user) => !masIdPartisipants.includes(user.id))
      .map((user) => {
        const el = settingsEvent.find((settings) => {
          return settings.rankId === user.rankId ? settings : null;
        });
        if (el) return { athlete: user, settingsEvent: el };
      })
      .filter((item) => item !== undefined);

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

  async getPartisipants(eventId: number) {
    const partisipants = await this.prisma.partisipantsIndividual.findMany({
      where: { settingsEvent: { eventId } },
      include: { athlete: true, settingsEvent: true },
    });

    return partisipants;
  }

  async getRanks(eventId: number) {
    const ranks = await this.prisma.partisipantsIndividual.findMany({
      where: { settingsEvent: { eventId } },
      select: { settingsEvent: { select: { rank: true } } },
    });

    return ranks;
  }
}
