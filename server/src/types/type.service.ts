import { Injectable } from '@nestjs/common';
import { Prisma, TypesEvent as TypesEventModel } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TypeService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(
    typesEventFindUniqueArgs: Prisma.TypesEventFindUniqueArgs,
  ): Promise<TypesEventModel | null> {
    return await this.prisma.typesEvent.findUnique(typesEventFindUniqueArgs);
  }

  async findAll(): Promise<TypesEventModel[] | null> {
    return await this.prisma.typesEvent.findMany();
  }
}
