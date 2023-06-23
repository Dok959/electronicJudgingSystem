import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { Prisma } from '@prisma/client';
import { EventService } from './event.service';
import { JWTGuard } from 'src/auth/guards';
import { ExistingGuard } from './guards';
import { RankService } from 'src/ranks';
import { IpaginationDto } from './dto';

@Controller('event')
export class EventController {
  constructor(
    private readonly eventService: EventService,
    private readonly rankService: RankService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async getAll(
    @Body() args: IpaginationDto = { masRanksId: [], cursorInit: 0 },
    @Res() res: Response,
  ) {
    let masRanksId = args.masRanksId;
    if (masRanksId?.length === 0) {
      masRanksId = (await this.rankService.findAll()).map((item) => item.id);
    }

    const events = await this.eventService.findAll(masRanksId, args.cursorInit);

    return res.send(events);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getOne(@Param('id') id: string, @Res() res: Response) {
    const event = await this.eventService.findOne({
      where: { id: parseInt(id) },
    });

    return res.send(event);
  }

  @UseGuards(JWTGuard)
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() eventCreateArgs: any, @Res() res: Response) {
    const event = await this.eventService.create(eventCreateArgs);

    return res.send(event);
  }

  @UseGuards(JWTGuard, ExistingGuard)
  @Post('update')
  @HttpCode(HttpStatus.OK)
  async update(
    @Body() eventUpdateArgs: Prisma.EventUpdateArgs,
    @Res() res: Response,
  ) {
    const event = await this.eventService.update(eventUpdateArgs);

    return res.send(event);
  }

  @UseGuards(JWTGuard, ExistingGuard)
  @Post('delete')
  @HttpCode(HttpStatus.OK)
  async delete(
    @Body() eventDeleteArgs: Prisma.EventDeleteArgs,
    @Res() res: Response,
  ) {
    const event = await this.eventService.delete(eventDeleteArgs);

    return res.send(event);
  }
}
