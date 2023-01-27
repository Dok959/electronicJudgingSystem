import { UsersModule } from './users/user.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { AthleteModule } from './athletes/athletes.module';

@Module({
  imports: [UsersModule, AuthModule, AthleteModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
