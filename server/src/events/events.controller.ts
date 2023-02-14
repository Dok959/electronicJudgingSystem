import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
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
  async getEvent(@Param('id') id: string, @Res() res: Response) {
    const event = await this.eventService.findOneEvent({
      where: { id: parseInt(id) },
    });

    return res.send(event);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllEvents(
    @Body() eventFindManyArgs: Prisma.EventFindManyArgs,
    @Res() res: Response,
  ) {
    const events = await this.eventService.findAllEvents(eventFindManyArgs);

    return res.send(events);
  }

  @UseGuards(JWTGuard)
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async createEvent(
    @Body() eventCreateArgs: Prisma.EventCreateArgs,
    @Res() res: Response,
  ) {
    const event = await this.eventService.createEvent(eventCreateArgs);

    return res.send(event);
  }
}
