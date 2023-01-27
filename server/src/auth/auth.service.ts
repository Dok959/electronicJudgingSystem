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
      id: parsedTokenData.user.id,
    });
  }

  parseJwt(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join(''),
    );

    return JSON.parse(jsonPayload);
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

  async validateUser(email: string): Promise<UserModel | null> {
    const user = await this.userService.findOne({ email });

    if (!user) {
      return null;
    }

    return user;
  }
}
