import { Controller, Get, HttpCode, HttpStatus, Res } from '@nestjs/common';
import { JudgeService } from './judge.service';
import { Response } from 'express';

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
}
