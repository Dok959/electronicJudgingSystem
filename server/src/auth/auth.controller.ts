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
import { RegistrationGuard, LoginGuard, RefreshJWTGuard } from './guards';
import { Prisma } from '@prisma/client';
import { AuthService } from './auth.service';
import { authUserDto, refreshTokenDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @UseGuards(RefreshJWTGuard)
  @Post('refresh')
  async refreshToken(
    @Body() clientTokens: refreshTokenDto,
    @Res() res: Response,
  ): Promise<Response> {
    const validToken = this.authService.verifyToken(clientTokens.refresh_token);

    const parseAccessToken = await this.authService.getUserByTokenData(
      clientTokens.access_token,
    );
    const user = await this.userService.findOne({
      where: { ...parseAccessToken },
    });

    const access = await this.authService.generateAccessToken(user);

    if (validToken?.error) {
      if (validToken?.error === 'jwt expired') {
        const refresh = await this.authService.generateRefreshToken(user.id);

        res.statusCode = HttpStatus.OK;
        return res.send({ ...access, ...refresh });
      } else {
        res.statusCode = HttpStatus.BAD_REQUEST;
        return res.send({ error: validToken?.error });
      }
    } else {
      res.statusCode = HttpStatus.OK;
      return res.send({
        ...access,
        refresh_token: clientTokens.refresh_token,
      });
    }
  }

  @UseGuards(LoginGuard)
  @Post('login')
  async loginUser(
    @Body() loginUserDto: authUserDto,
    @Res() res: Response,
  ): Promise<Response> {
    const user = await this.userService.search(loginUserDto);

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
