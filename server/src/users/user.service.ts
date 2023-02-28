import { Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async login(
    userFindFirstArgs: Prisma.UserFindFirstArgs,
  ): Promise<User | null> {
    return await this.findOne({
      ...userFindFirstArgs,
    });
  }

  async registration(
    userCreateArgs: Prisma.UserCreateArgs,
  ): Promise<User | null> {
    return this.prisma.user.create({
      ...userCreateArgs,
    });
  }

  async findOne(
    userFindFirstArgs: Prisma.UserFindFirstArgs,
  ): Promise<User | null> {
    return this.prisma.user.findFirst({
      ...userFindFirstArgs,
    });
  }
}
