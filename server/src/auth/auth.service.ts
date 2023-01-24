import { Injectable } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { User as UserModel } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async generateRefreshToken(userId: number) {
    return {
      refresh_token: this.jwtService.sign(
        { userId },
        {
          secret: jwtConstants.secret,
          expiresIn: '7d',
        },
      ),
    };
  }

  async generateAccessToken(user: UserModel) {
    return {
      access_token: this.jwtService.sign({ user }),
    };
  }

  async validateUser(email: string): Promise<UserModel | null> {
    const user = await this.userService.findOne({ email });

    if (!user) {
      return null;
    }

    return user;
  }
}
