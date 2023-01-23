import { Injectable } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { User as UserModel } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(email: string): Promise<UserModel | null> {
    const user = await this.userService.findOne({ email });

    if (!user) {
      return null;
    }

    return user;
  }
}
