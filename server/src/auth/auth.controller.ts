import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { Prisma } from '@prisma/client';
import { UserService } from 'src/users';
import { RegistrationGuard, LoginGuard, RefreshJWTGuard } from './guards';
import { AuthService } from './auth.service';
import { refreshTokenDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(RefreshJWTGuard)
  @Post('refresh')
  async refreshToken(
    @Body() clientTokens: refreshTokenDto,
    @Res() res: Response,
  ): Promise<Response> {
    const validToken = this.authService.verifyToken(clientTokens.refresh_token);

    const user = await this.authService.getUserByTokenData(
      clientTokens.access_token,
    );

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

  // TODO
  // @UseGuards(JWTGuard)
  // @UseGuards(RefreshJWTGuard)
  // @Post('refresh')
  // async refreshToken(
  //   @Body() clientTokens: refreshTokenDto,
  //   @Res() res: Response,
  // ): Promise<Response> {
  //   console.log(clientTokens);
  //   res.statusCode = HttpStatus.OK;
  //   const access = request.headers.authorization;
  //   const refresh = request.headers.refresh;
  //   return res.send({ access, refresh });
  //   // try {
  //   //   console.log(clientTokens);
  //   //   const validToken = this.authService.verifyToken(
  //   //     clientTokens.refresh_token,
  //   //   );
  //   const validToken = this.authService.verifyToken(clientTokens.refresh_token);

  //   //   const user = await this.authService.getUserByTokenData(
  //   //     clientTokens.access_token,
  //   //   );
  //   //   console.log('+');
  //   const user = await this.authService.getUserByTokenData(
  //     clientTokens.access_token,
  //   );

  //   //   const access = await this.authService.generateAccessToken(user);
  //   const access = await this.authService.generateAccessToken(user);

  //   //   if (validToken?.error) {
  //   //     if (validToken?.error === 'jwt expired') {
  //   //       const refresh = await this.authService.generateRefreshToken(user.id);
  //   if (validToken?.error) {
  //     if (validToken?.error === 'jwt expired') {
  //       const refresh = await this.authService.generateRefreshToken(user.id);

  //       //       res.statusCode = HttpStatus.OK;
  //       //       return res.send({ ...access, ...refresh });
  //       //     } else {
  //       //       res.statusCode = HttpStatus.BAD_REQUEST;
  //       //       return res.send({ error: validToken?.error });
  //       //     }
  //       //   } else {
  //       //     res.statusCode = HttpStatus.OK;
  //       //     return res.send({
  //       //       ...access,
  //       //       refresh_token: clientTokens.refresh_token,
  //       //     });
  //       //   }
  //       // } catch (error) {
  //       //   console.log(error);
  //       // }
  //       res.statusCode = HttpStatus.OK;
  //       return res.send({ ...access, ...refresh });
  //     } else {
  //       res.statusCode = HttpStatus.BAD_REQUEST;
  //       return res.send({ error: validToken?.error });
  //     }
  //   } else {
  //     res.statusCode = HttpStatus.OK;
  //     return res.send({
  //       ...access,
  //       refresh_token: clientTokens.refresh_token,
  //     });
  //   }
  // }

  @UseGuards(LoginGuard)
  @Post('login')
  async loginUser(
    @Body() userWhereInput: Prisma.UserWhereInput,
    @Res() res: Response,
  ): Promise<Response> {
    const user = await this.userService.login(userWhereInput);

    const access = await this.authService.generateAccessToken(user);
    const refresh = await this.authService.generateRefreshToken(user.id);

    res.statusCode = HttpStatus.OK;
    return res.send({ ...access, ...refresh });
  }

  // TODO добавить гвард проверяющий авторизацию
  @UseGuards(RegistrationGuard)
  @Post('registration')
  async registrationUser(
    @Body() userCreateArgs: Prisma.UserCreateArgs,
    @Res() res: Response,
  ): Promise<Response> {
    await this.userService.registration(userCreateArgs);

    res.statusCode = HttpStatus.CREATED;
    return res.send('Пользователь создан');
  }
}
