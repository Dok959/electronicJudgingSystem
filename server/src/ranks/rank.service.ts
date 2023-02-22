import { Injectable } from '@nestjs/common';
import { Prisma, Rank as RankModel } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RankService {
  constructor(private prisma: PrismaService) {}

  async findOne(
    rankFindUniqueArgs: Prisma.RankFindUniqueArgs,
  ): Promise<RankModel> {
    return await this.prisma.rank.findUnique({
      ...rankFindUniqueArgs,
    });
  }

  async findAll(): Promise<RankModel[]> {
    return await this.prisma.rank.findMany();
  }
}
