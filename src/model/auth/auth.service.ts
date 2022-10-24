import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { Users } from '../users/users.model';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(username: string, password: string): Promise<Users> {
    const user = await this.usersService.getUser(username);
    
    if (!user) {
      throw new NotAcceptableException('user doesn´t exists.');
    }

    const passwordValid = await bcrypt.compare(password, user.password);

    if (user && passwordValid) {
      return user;
    }
    
    return null;
  }
}
