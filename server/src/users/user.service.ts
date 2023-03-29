import { Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async login(userWhereInput: Prisma.UserWhereInput): Promise<User | null> {
    return await this.findOne(userWhereInput);
  }

  async registration(
    userCreateArgs: Prisma.UserCreateArgs,
  ): Promise<User | null> {
    return this.prisma.user.create(userCreateArgs);
  }

  async findOne(userWhereInput: Prisma.UserWhereInput): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: userWhereInput,
    });
  }
}
