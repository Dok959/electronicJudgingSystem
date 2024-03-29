import { Injectable } from '@nestjs/common';
import { Athlete, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AthleteService {
  constructor(private prisma: PrismaService) {}

  async delete(
    athleteDeleteInput: Prisma.AthleteDeleteArgs,
  ): Promise<Athlete | null> {
    const existingAthlete = await this.findOne({
      id: athleteDeleteInput.where.id,
    });

    if (!existingAthlete) {
      return null;
    }

    return this.prisma.athlete.delete({
      where: { id: athleteDeleteInput.where.id },
    });
  }

  // возможно передать параметр id:number ; избавиться от проверок на существование
  async update(
    AthleteUpdateArgs: Prisma.AthleteUpdateArgs,
  ): Promise<Athlete | null> {
    const existingAthlete = await this.findOne({
      id: AthleteUpdateArgs.where.id,
    });

    if (!existingAthlete) {
      return null;
    }

    return this.prisma.athlete.update({
      where: { id: AthleteUpdateArgs.where.id },
      data: AthleteUpdateArgs.data,
    });
  }

  // TODO добавить проверки на существование
  async create(
    athleteCreateArgs: Prisma.AthleteCreateArgs,
  ): Promise<Athlete | null> {
    return this.prisma.athlete.create(athleteCreateArgs);
  }

  async findOne(
    athleteWhereInput: Prisma.AthleteWhereInput,
  ): Promise<Athlete | null> {
    return this.prisma.athlete.findFirst({
      where: athleteWhereInput,
    });
  }

  async findAll(
    athleteFindManyArgs: Prisma.AthleteFindManyArgs,
  ): Promise<Athlete[]> {
    return this.prisma.athlete.findMany(athleteFindManyArgs);
  }
}
