import { Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { authUserDto } from '../auth/dto/auth-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async search(loginUserDto: authUserDto): Promise<User | null> {
    return await this.findOne({
      where: { ...loginUserDto },
    });
  }

  async registration(
    userCreateInput: Prisma.UserCreateInput,
  ): Promise<User | null> {
    const existingUser = await this.findOne({
      where: { ...userCreateInput },
    });

    if (existingUser) {
      return null;
    }

    return this.prisma.user.create({
      data: userCreateInput,
    });
  }

  async findOne(
    userFindUniqueArgs: Prisma.UserFindUniqueArgs,
  ): Promise<User | null> {
    return this.prisma.user.findFirst({
      ...userFindUniqueArgs,
    });
  }
}
