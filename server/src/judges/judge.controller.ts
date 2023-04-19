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
import { HeadersGuard as UserGuard } from 'src/users/guards';
import { HeadersGuard as EventGuard } from './guards';

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

  @UseGuards(UserGuard)
  @Get('start')
  @HttpCode(HttpStatus.OK)
  async start(@Headers('user') user: User, @Res() res: Response) {
    const result = await this.judgeService.start(Number(user.id));

    return res.send(result);
  }

  @Get('places')
  @HttpCode(HttpStatus.OK)
  async places(@Res() res: Response) {
    const result = await this.judgeService.getPlaces();

    return res.send(result);
  }

  @UseGuards(EventGuard)
  @Get('busy')
  @HttpCode(HttpStatus.OK)
  async busyPlaces(@Headers('eventId') eventId: string, @Res() res: Response) {
    const result = await this.judgeService.getBusyPlaces(Number(eventId));

    return res.send(result);
  }

  @UseGuards(UserGuard)
  @Post('setPlace')
  @HttpCode(HttpStatus.OK)
  async setPlace(
    @Headers('user') user: User,
    @Body() args: any,
    @Res() res: Response,
  ) {
    const eventId = args.data.eventId;

    const judge = await this.judgeService.getJudge(eventId, user.id);
    args.data.judgeId = judge;
    delete args.data.eventId;

    const result = await this.judgeService.setPlace(args);

    return res.send(result);
  }
}
