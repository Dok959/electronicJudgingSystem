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
import { PartisipantService } from 'src/partisipants/partisipant.service';

@Controller('judge')
export class JudgeController {
  constructor(
    private readonly judgeService: JudgeService,
    private readonly partisipantService: PartisipantService,
  ) {}

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

  @UseGuards(EventGuard, UserGuard)
  @Get('place')
  @HttpCode(HttpStatus.OK)
  async getPlace(
    @Headers('eventId') eventId: string,
    @Headers('user') user: User,
    @Res() res: Response,
  ) {
    const result = await this.judgeService.getPlace(Number(eventId), user.id);

    return res.send(result);
  }

  @Get('items')
  @HttpCode(HttpStatus.OK)
  async getItems(@Res() res: Response) {
    const result = await this.judgeService.getItems();
    return res.send(result);
  }

  @UseGuards(EventGuard)
  @Get('ranks')
  @HttpCode(HttpStatus.OK)
  async getRanks(@Headers('eventId') eventId: string, @Res() res: Response) {
    const result = await this.partisipantService.getRanks(Number(eventId));

    const masRanksId = result.map((item) => item.settingsEvent.rank.id);
    const masRanksUniqeId = masRanksId.filter((item) => item);

    const ranks = masRanksUniqeId.map((item) =>
      result.find((el) => el.settingsEvent.rank.id === item),
    );

    const resultRanks = [
      ...new Set(ranks.map((item) => item.settingsEvent.rank)),
    ];

    return res.send(resultRanks);
  }

  @Post('queue')
  @HttpCode(HttpStatus.OK)
  async setQueue(@Body() args: any, @Res() res: Response) {
    console.log(args);
    const sortRanks: IInitValues[] = Object.values(args);
    console.log(sortRanks);
    const uniqRanks = sortRanks.map((item) => item.rank);
    console.log(uniqRanks);

    // TODO
    const data = [];
    const test = uniqRanks.map((item) => {
      sortRanks.map((el) =>
        el.rank === item
          ? data.push({ id: 1, rank: item, item: el.item })
          : null,
      );
    });
    console.log(test);
    console.log(data);
    // const result = await this.partisipantService.getRanks(Number(eventId));
    // table QueuePartisipantsIndividual
    return res.send(false);
  }
}

interface IInitValues {
  rank: number;
  item: number;
}
