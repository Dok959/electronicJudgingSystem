import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { JudgeService } from './judge.service';
import { Response } from 'express';
import { Prisma } from '@prisma/client';

@Controller('judge')
export class JudgeController {
  constructor(private readonly judgeService: JudgeService) {}

  @Get('onRegistered')
  @HttpCode(HttpStatus.OK)
  async getAllOnRegistered(@Res() res: Response) {
    const judges = await this.judgeService.getAllOnRegistered(1);

    return res.send(judges);
  }

  @Get('registered')
  @HttpCode(HttpStatus.OK)
  async getAllRegistered(@Res() res: Response) {
    const judges = await this.judgeService.getAllRegistered(1);

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
}
