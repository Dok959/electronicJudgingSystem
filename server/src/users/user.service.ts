import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  // TODO: проверка на существование || что возвращается сейчас?
  async registration(
    userCreateInput: Prisma.UserCreateInput,
  ): Promise<User | null> {
    return this.prisma.user.create({
      data: userCreateInput,
    });
  }

  async validateUser(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    const user = this.user(userWhereUniqueInput);

    if (!user) {
      return null;
    }

    return user;
  }
}
