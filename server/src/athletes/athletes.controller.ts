import {
  Controller,
  HttpStatus,
  Res,
  UseGuards,
  Get,
  Req,
  HttpCode,
} from '@nestjs/common';
import { Response } from 'express';
import { AthleteService } from './athletes.service';
import { AuthService } from 'src/auth/auth.service';
import { JWTGuard } from 'src/auth/guards/jwt.guard';

@Controller('athlete')
export class AthleteController {
  constructor(
    private readonly athleteService: AthleteService,
    private readonly authService: AuthService,
  ) {}

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
