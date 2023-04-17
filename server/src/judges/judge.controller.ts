import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  Headers,
  UseGuards,
} from '@nestjs/common';
import { JudgeService } from './judge.service';
import { Response } from 'express';
import { Prisma, User } from '@prisma/client';
import { HeadersGuard } from 'src/users/guards';

@Controller('judge')
export class JudgeController {
  constructor(private readonly judgeService: JudgeService) {}

  @Get('onRegistered')
  @HttpCode(HttpStatus.OK)
  async getAllOnRegistered(
    @Headers('eventId') eventId: string,
    @Res() res: Response,
  ) {
    const judges = await this.judgeService.getAllOnRegistered(Number(eventId));

    return res.send(judges);
  }

  @Get('registered')
  @HttpCode(HttpStatus.OK)
  async getAllRegistered(
    @Headers('eventId') eventId: string,
    @Res() res: Response,
  ) {
    const judges = await this.judgeService.getAllRegistered(Number(eventId));

    return res.send(judges);
  }

  @Post('insert')
  @HttpCode(HttpStatus.OK)
  async insert(
    @Body() JudgeCreateManyArgs: Prisma.JudgeCreateManyArgs,
    @Res() res: Response,
  ) {
    const result = await this.judgeService.insert(JudgeCreateManyArgs);

    return res.send(result);
  }

  @UseGuards(HeadersGuard)
  @Get('start')
  @HttpCode(HttpStatus.OK)
  async start(@Headers('user') user: User, @Res() res: Response) {
    const result = await this.judgeService.start(Number(user.id));

    return res.send(result);
  }
}
