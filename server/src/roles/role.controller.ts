import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { RoleService } from './role.service';
import { JWTGuard } from 'src/auth/guards';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @UseGuards(JWTGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(@Res() res: Response) {
    const roles = await this.roleService.findAll();
    return res.send(roles);
  }

  @UseGuards(JWTGuard)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getOne(@Param('id') id: string, @Res() res: Response) {
    const role = await this.roleService.findOne({
      where: { id: parseInt(id) },
    });

    return res.send(role);
  }
}
