import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User as UserModel, Prisma } from '@prisma/client';
import { Response } from 'express';
import { RegistrationGuard } from './guards/registration.guard';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('user/:id')
  async getUserById(@Param('id') id: string): Promise<UserModel> {
    return this.userService.user({ id: Number(id) });
  }

  // TODO: не срабатывает возврат, но в бд пишет
  @UseGuards(RegistrationGuard)
  @Post('registration')
  async registrationUser(
    @Body() UserCreateInput: Prisma.UserCreateInput,
    @Res() res: Response,
  ): Promise<UserModel> {
    await this.userService.registration(UserCreateInput);

    res.statusCode = HttpStatus.CREATED;

    // return res.send('Пользователь создан');
    return;
  }
}
