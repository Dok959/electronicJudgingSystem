import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { UserService } from 'src/users/user.service';
import { Prisma } from '@prisma/client';

@Controller('auth')
export class AthleteController {
  constructor(private userService: UserService) {}
}
