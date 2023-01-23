import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { UserService } from 'src/users/user.service';
import { RegistrationGuard } from './guards/registration.guard';
import { Prisma } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private userService: UserService) {}

  @UseGuards(RegistrationGuard)
  @Post('registration')
  async registrationUser(
    @Body() UserCreateInput: Prisma.UserCreateInput,
    @Res() res: Response,
  ): Promise<Response> {
    await this.userService.registration(UserCreateInput);

    res.statusCode = HttpStatus.CREATED;

    return res.send('Пользователь создан');
  }
}
