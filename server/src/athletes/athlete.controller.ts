import {
  Controller,
  HttpStatus,
  Res,
  UseGuards,
  Get,
  Req,
  HttpCode,
  Body,
  Post,
  Patch,
  Param,
  Delete,
  Headers,
} from '@nestjs/common';
import { Response } from 'express';
import { Prisma, User } from '@prisma/client';
import { AthleteService } from './athlete.service';
import { AuthService } from 'src/auth/auth.service';
import { JWTGuard } from 'src/auth/guards';
import { FilterGuard, HeadersGuard } from './guards';

@Controller('athlete')
export class AthleteController {
  constructor(
    private readonly athleteService: AthleteService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(JWTGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteAthlete(@Param('id') id: string) {
    return await this.athleteService.delete({
      where: { id: parseInt(id) },
    });
  }

  @UseGuards(JWTGuard)
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async updateAthlete(
    @Body() AthleteUpdateInput: Prisma.AthleteUpdateInput,
    @Param('id') id: string,
  ) {
    return await this.athleteService.update({
      data: AthleteUpdateInput,
      where: { id: parseInt(id) },
    });
  }

  @UseGuards(JWTGuard, HeadersGuard)
  @Post('create')
  @HttpCode(HttpStatus.OK)
  async create(
    @Headers('user') user: User,
    @Body() athleteCreateArgs: Prisma.AthleteCreateArgs,
  ) {
    athleteCreateArgs.data.trainerId = user.id;
    return await this.athleteService.create(athleteCreateArgs);
  }

  @UseGuards(JWTGuard, HeadersGuard, FilterGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(
    @Headers('user') user: User,
    @Headers('filter') filter: { cursor: any; skip: number },
    @Res() res: Response,
  ) {
    const athleteFindManyArgs: Prisma.AthleteFindManyArgs = {
      take: 2,
      include: {
        rank: true,
      },
      where: {
        trainerId: Number(user.id),
      },
      ...filter,
    };

    const athletes = await this.athleteService.findAll(athleteFindManyArgs);

    return res.send(athletes);
  }
}
