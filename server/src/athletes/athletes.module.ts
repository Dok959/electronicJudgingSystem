import { Module } from '@nestjs/common';
import { AthleteService } from './athletes.service';
import { AthleteController } from './athletes.controller';

@Module({
  imports: [],
  controllers: [AthleteController],
  providers: [AthleteService],
  exports: [],
})
export class AuthModule {}
