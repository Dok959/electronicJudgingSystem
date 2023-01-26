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
import { RegistrationGuard, LoginGuard } from './guards';
import { Prisma } from '@prisma/client';
import { AuthService } from './auth.service';
import { authUserDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @UseGuards(LoginGuard)
  @Post('login')
  async refreshToken(
    @Body() loginUserDto: authUserDto,
    @Res() res: Response,
  ): Promise<Response> {
    const user = await this.userService.login(loginUserDto);

    const access = await this.authService.generateAccessToken(user);
    const refresh = await this.authService.generateRefreshToken(user.id);

    res.statusCode = HttpStatus.OK;

    return res.send({ ...access, ...refresh, name: user.name });
  }

  @UseGuards(LoginGuard)
  @Post('login')
  async loginUser(
    @Body() loginUserDto: authUserDto,
    @Res() res: Response,
  ): Promise<Response> {
    const user = await this.userService.login(loginUserDto);

    const access = await this.authService.generateAccessToken(user);
    const refresh = await this.authService.generateRefreshToken(user.id);

    res.statusCode = HttpStatus.OK;

    return res.send({ ...access, ...refresh, name: user.name });
  }

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
