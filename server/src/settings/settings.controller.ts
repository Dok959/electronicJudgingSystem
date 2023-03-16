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
import { SettingsService } from './settings.service';
import { JWTGuard } from 'src/auth/guards';
import { ExistingGuard } from './guards';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @UseGuards(JWTGuard)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getOne(@Param('id') id: string, @Res() res: Response) {
    const settingsEvent = await this.settingsService.findOne({
      where: { id: parseInt(id) },
    });

    return res.send(settingsEvent);
  }

  @UseGuards(JWTGuard)
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() settingsEventCreateArgs: Prisma.SettingsEventCreateArgs,
    @Res() res: Response,
  ) {
    const settingsEvent = await this.settingsService.create(
      settingsEventCreateArgs,
    );

    return res.send(settingsEvent);
  }

  @UseGuards(JWTGuard, ExistingGuard)
  @Post('update')
  @HttpCode(HttpStatus.OK)
  async update(
    @Body() settingsEventUpdateArgs: Prisma.SettingsEventUpdateArgs,
    @Res() res: Response,
  ) {
    const settingsEvent = await this.settingsService.update(
      settingsEventUpdateArgs,
    );

    return res.send(settingsEvent);
  }

  @UseGuards(JWTGuard, ExistingGuard)
  @Post('delete')
  @HttpCode(HttpStatus.OK)
  async delete(
    @Body() settingsEventDeleteArgs: Prisma.SettingsEventDeleteArgs,
    @Res() res: Response,
  ) {
    const settingsEvent = await this.settingsService.delete(
      settingsEventDeleteArgs,
    );

    return res.send(settingsEvent);
  }

  @UseGuards(JWTGuard, ExistingGuard)
  @Post('deleteMany')
  @HttpCode(HttpStatus.OK)
  async deleteMany(
    @Body() settingsEventDeleteArgs: Prisma.SettingsEventDeleteArgs,
    @Res() res: Response,
  ) {
    const settingsEvent = await this.settingsService.deleteMany(
      settingsEventDeleteArgs,
    );

    return res.send(settingsEvent);
  }
}
