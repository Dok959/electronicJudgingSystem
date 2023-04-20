import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Res,
  Headers,
  Post,
  Body,
} from '@nestjs/common';
import { Response } from 'express';
import { PartisipantService } from './partisipant.service';
import { Prisma } from '@prisma/client';

@Controller('partisipant')
export class PartisipantController {
  constructor(private readonly partisipantService: PartisipantService) {}

  @Get('registered')
  @HttpCode(HttpStatus.OK)
  async getAllRegistered(
    @Headers('eventId') eventId: string,
    @Res() res: Response,
  ) {
    const partisipants = await this.partisipantService.getAllRegistered(
      Number(eventId),
    );

    return res.send(partisipants);
  }

  @Get('onRegistered')
  @HttpCode(HttpStatus.OK)
  async getAllOnRegistered(
    @Headers('eventId') eventId: string,
    @Res() res: Response,
  ) {
    const partisipants = await this.partisipantService.getAllOnRegistered(
      Number(eventId),
    );

    return res.send(partisipants);
  }

  @Post('insert')
  @HttpCode(HttpStatus.OK)
  async insert(
    @Body()
    PartisipantsIndividualCreateManyArgs: Prisma.PartisipantsIndividualCreateManyArgs,
    @Res() res: Response,
  ) {
    const result = await this.partisipantService.insert(
      PartisipantsIndividualCreateManyArgs,
    );

    return res.send(result);
  }

  @Get('queue')
  @HttpCode(HttpStatus.OK)
  async getPartisipants(
    @Headers('eventId') eventId: string,
    @Res() res: Response,
  ) {
    const partisipants = await this.partisipantService.getPartisipants(
      Number(eventId),
    );

    return res.send(partisipants);
  }
}
