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

  @UseGuards(EventGuard)
  @Post('queue')
  @HttpCode(HttpStatus.OK)
  async setQueue(
    @Headers('eventId') eventId: string,
    @Body() args: any,
    @Res() res: Response,
  ) {
    const sortRanks: IInitValues[] = Object.values(args);
    const uniqRanks = [...new Set(sortRanks.map((item) => item.rank))];

    const partisipants = await this.partisipantService.getPartisipants(
      Number(eventId),
    );

    const data = [];
    uniqRanks.map((rank) => {
      let queue = 0;
      const baseQueue = queue; //?
      for (let j = 0; j < partisipants.length; j++) {
        const partisipant = partisipants[j];
        sortRanks.map((el) => {
          el.rank === rank
            ? data.push({
                partisipantId: partisipant.id,
                itemId: el.item,
                queue: queue,
              })
            : null;
          queue += 2;
        });
        queue = baseQueue + 1;
      }
    });

    const result = await this.judgeService.setQueue({ data: data });

    return res.send(result);
  }

  @UseGuards(EventGuard)
  @Post('getQueue')
  @HttpCode(HttpStatus.OK)
  async getQueue(@Headers('eventId') eventId: string, @Res() res: Response) {
    const result = await this.judgeService.getQueue(Number(eventId));

    return res.send(result);
  }

  @Post('setJudgeScore')
  @HttpCode(HttpStatus.OK)
  async setJudgeScore(@Body() args: any, @Res() res: Response) {
    const result = await this.judgeService.setJudgeScore(args);

    return res.send(result);
  }
}

interface IInitValues {
  rank: number;
  item: number;
}
