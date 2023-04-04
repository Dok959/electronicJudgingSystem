import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { JWTGuard } from 'src/auth/guards';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JWTGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  async getOne(@Res() res: Response) {
    const users = await this.userService.findAll();

    return res.send(users);
  }
}
