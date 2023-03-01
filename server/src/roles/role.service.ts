import { Injectable } from '@nestjs/common';
import { Prisma, Role as RoleModel } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(
    roleFindUniqueArgs: Prisma.RoleFindUniqueArgs,
  ): Promise<RoleModel | null> {
    return await this.prisma.role.findUnique(roleFindUniqueArgs);
  }

  async findAll(): Promise<RoleModel[] | null> {
    return await this.prisma.role.findMany();
  }
}
