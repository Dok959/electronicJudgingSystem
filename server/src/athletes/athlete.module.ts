import { Module } from '@nestjs/common';
import { AthleteService } from './athlete.service';
import { AthleteController } from './athlete.controller';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaService } from 'src/prisma.service';
import { UsersModule } from 'src/users';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [AthleteController],
  providers: [AthleteService, PrismaService],
})
export class AthleteModule {}
