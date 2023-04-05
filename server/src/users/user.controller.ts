import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Res,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { Prisma, User } from '@prisma/client';
import { HeadersGuard, FilterGuard } from './guards';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(HeadersGuard, FilterGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(
    @Headers('user') user: User,
    @Headers('filter') filter: { cursor: any; skip: number },
    @Res() res: Response,
  ) {
    console.log(filter);

    const userFindManyArgs: Prisma.UserFindManyArgs = {
      take: 2,
      include: {
        role: true,
      },
      where: {
        id: {
          not: Number(user.id),
        },
      },
      ...filter,
    };

    const users = await this.userService.findAll(userFindManyArgs);

    return res.send(users);
  }
}
