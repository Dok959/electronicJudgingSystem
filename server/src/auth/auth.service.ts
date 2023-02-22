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

  async getUserByTokenData(token: string): Promise<UserModel> {
    const parsedTokenData = this.parseJwt(token);

    return await this.userService.findOne({
      where: { ...parsedTokenData.user },
    });
  }

  parseJwt(token: string) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  }

  verifyToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      return { error: error.message };
    }
  }

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
}
