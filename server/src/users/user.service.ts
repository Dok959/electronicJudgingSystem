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
    userCreateInput: Prisma.UserCreateInput,
  ): Promise<User | null> {
    console.log(userCreateInput);
    return this.prisma.user.create({
      data: userCreateInput,
    });
  }

  async findOne(userWhereInput: Prisma.UserWhereInput): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: userWhereInput,
    });
  }

  async create(userCreateArgs: Prisma.UserCreateArgs): Promise<User | null> {
    console.log(userCreateArgs);
    return this.prisma.user.create(userCreateArgs);
  }
}
