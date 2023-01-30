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
} from '@nestjs/common';
import { Response } from 'express';
import { AthleteService } from './athletes.service';
import { AuthService } from 'src/auth/auth.service';
import { JWTGuard } from 'src/auth/guards/jwt.guard';
import { Prisma } from '@prisma/client';

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

  @UseGuards(JWTGuard)
  @Post()
  @HttpCode(HttpStatus.OK)
  async createAthlete(
    @Body() AthleteCreateInput: Prisma.AthleteCreateInput,
    @Req() req: any,
  ) {
    // const token = req.token;

    // const user = await this.authService.getUserByTokenData(token);

    return await this.athleteService.create({
      data: AthleteCreateInput,
    });
  }

  @UseGuards(JWTGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllAthletes(@Req() req: any, @Res() res: Response) {
    const token = req.token;

    const user = await this.authService.getUserByTokenData(token);
    const athletes = await this.athleteService.findAll();
    const filtredAthletes = athletes.filter(
      (athlete) => athlete.trainerId === user.id,
    );

    return res.send(filtredAthletes);
  }
}
