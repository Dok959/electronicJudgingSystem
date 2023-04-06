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
  async createAthlete(
    @Headers('user') user: User,
    @Body() AthleteCreateInput: Prisma.AthleteCreateInput,
  ) {
    console.log(user);
    console.log(AthleteCreateInput);
    // const token = req.token;
    // const user = await this.authService.getUserByTokenData(token);

    return await this.athleteService.create({
      data: AthleteCreateInput,
    });
  }

  // TODO
  // @Headers('user') user: User,
  //   @Headers('filter') filter: { cursor: any; skip: number },
  @UseGuards(JWTGuard, HeadersGuard, FilterGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllAthletes(
    @Headers('user') user: User,
    @Req() req: any,
    @Res() res: Response,
  ) {
    // const token = req.token;

    // const user = await this.authService.getUserByTokenData(token);
    const athletes = await this.athleteService.findAll();
    // const filtredAthletes = athletes.filter(
    //   (athlete) => athlete.trainerId === user.id,
    // );

    return res.send(athletes);
  }
}
