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

  async findAll(
    userFindManyArgs: Prisma.UserFindManyArgs,
  ): Promise<User[] | null> {
    return this.prisma.user.findMany(userFindManyArgs);
  }

  async getUserByTokenData(token: string): Promise<User | null> {
    const parsedTokenData = this.parseJwt(token);

    return await this.findOne(parsedTokenData.user);
  }

  parseJwt(token: string) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  }
}
