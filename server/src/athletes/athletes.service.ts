import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Athlete, Prisma } from '@prisma/client';

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

  async create(
    athleteCreateInput: Prisma.AthleteCreateArgs,
  ): Promise<Athlete | null> {
    const existingAthlete = await this.findOne({
      name: athleteCreateInput.data.name,
      sirname: athleteCreateInput.data.sirname,
      patronymic: athleteCreateInput.data.patronymic,
      dateOfBirth: athleteCreateInput.data.dateOfBirth,
      rank: athleteCreateInput.data.rank,
    });

    if (existingAthlete) {
      return null;
    }

    return this.prisma.athlete.create({
      data: athleteCreateInput.data,
    });
  }

  async findOne(
    athleteWhereInput: Prisma.AthleteWhereInput,
  ): Promise<Athlete | null> {
    return this.prisma.athlete.findFirst({
      where: athleteWhereInput,
    });
  }

  async findAll(): Promise<Athlete[]> {
    return this.prisma.athlete.findMany();
  }
}
