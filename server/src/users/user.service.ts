import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findOne(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async registration(
    userCreateInput: Prisma.UserCreateInput,
  ): Promise<User | null> {
    const existingUser = await this.findOne({
      email: userCreateInput.email,
    });

    if (existingUser) {
      return null;
    }

    return this.prisma.user.create({
      data: userCreateInput,
    });
  }
}
