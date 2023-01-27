import { Module } from '@nestjs/common';
import { AthleteService } from './athletes.service';
import { AthleteController } from './athletes.controller';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [AuthModule],
  controllers: [AthleteController],
  providers: [AthleteService, PrismaService],
})
export class AthleteModule {}
