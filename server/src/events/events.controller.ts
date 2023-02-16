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
import { EventsService } from './events.service';
import { Prisma } from '@prisma/client';
import { JWTGuard } from 'src/auth/guards';

@Controller('event')
export class EventsController {
  constructor(private readonly eventService: EventsService) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getOne(@Param('id') id: string, @Res() res: Response) {
    const event = await this.eventService.findOne({
      where: { id: parseInt(id) },
    });

    return res.send(event);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(
    @Body() eventFindManyArgs: Prisma.EventFindManyArgs,
    @Res() res: Response,
  ) {
    const events = await this.eventService.findAll(eventFindManyArgs);

    return res.send(events);
  }

  @UseGuards(JWTGuard)
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() eventCreateArgs: Prisma.EventCreateArgs,
    @Res() res: Response,
  ) {
    const event = await this.eventService.create(eventCreateArgs);

    return res.send(event);
  }

  @UseGuards(JWTGuard)
  @Post('update')
  @HttpCode(HttpStatus.OK)
  async update(
    @Body() eventUpdateArgs: Prisma.EventUpdateArgs,
    @Res() res: Response,
  ) {
    const event = await this.eventService.update(eventUpdateArgs);

    return res.send(event);
  }

  @UseGuards(JWTGuard)
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
