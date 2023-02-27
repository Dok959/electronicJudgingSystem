import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { RankService } from './rank.service';

@Controller('rank')
export class RankController {
  constructor(private readonly rankService: RankService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(@Res() res: Response) {
    const ranks = await this.rankService.findAll();
    return res.send(ranks);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getOne(@Param('id') id: string, @Res() res: Response) {
    const rank = await this.rankService.findOne({
      where: { id: parseInt(id) },
    });

    return res.send(rank);
  }
}
