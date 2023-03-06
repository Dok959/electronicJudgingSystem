import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { RankModule } from './ranks';
import { SettingsModule } from './settings';
import { EventModule } from './events';
import { UsersModule } from './users';
import { AuthModule } from './auth';
import { AthleteModule } from './athletes';
import { RoleModule } from './roles';
import { TypeModule } from './types';

@Module({
  imports: [
    TypeModule,
    RoleModule,
    RankModule,
    SettingsModule,
    EventModule,
    UsersModule,
    AuthModule,
    AthleteModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
