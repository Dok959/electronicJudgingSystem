import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { RoleService } from './role.service';
import { JWTGuard } from 'src/auth/guards';
import { AuthService } from 'src/auth';

@Controller('role')
export class RoleController {
  constructor(
    private readonly roleService: RoleService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(JWTGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(@Res() res: Response) {
    const roles = await this.roleService.findAll();
    return res.send(roles);
  }

  @UseGuards(JWTGuard)
  @Get('user')
  async getRole(
    @Req() request: Request,
    @Res() res: Response,
  ): Promise<Response> {
    const token: string = request.headers.authorization || null;

    const user = await this.authService.getUserByTokenData(token);

    const role = await this.roleService.findOne({
      where: { id: user.roleId },
    });

    res.statusCode = HttpStatus.OK;
    return res.send(role);
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
