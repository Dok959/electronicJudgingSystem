import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Athlete, Prisma } from '@prisma/client';

@Injectable()
export class AthleteService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Athlete[]> {
    return this.prisma.athlete.findMany();
  }
}
