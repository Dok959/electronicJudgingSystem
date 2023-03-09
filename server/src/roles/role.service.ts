import { Injectable } from '@nestjs/common';
import { Prisma, Role as RoleModel } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(
    roleFindFirstArgs: Prisma.RoleFindFirstArgs,
  ): Promise<RoleModel | null> {
    return await this.prisma.role.findFirst(roleFindFirstArgs);
  }

  async findAll(): Promise<RoleModel[] | null> {
    return await this.prisma.role.findMany();
  }
}
