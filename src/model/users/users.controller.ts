import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthenticatedGuard } from '../auth/authenticated.guard';
import { LocalAuthGuard } from '../auth/local.auth.guard';
import * as bcrypt from 'bcrypt';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //post for signup page
  @Post('/signup')
  async addUser(
    @Body('password') userPassword: string,
    @Body('username') userName    : string,
  ) {
    const saltOrRounds    = 10;
    const hashedPassword  = await bcrypt.hash(userPassword, saltOrRounds);
    const result          = await this.usersService.insertUser(
      userName,
      hashedPassword,
    );
    
    return {
      msg:      result.id === null ? 'User Already Exists' : 'New user added',
      userId:   result.id,
      userName: result.username
    };
  }

    //post for delete user
  @UseGuards(AuthenticatedGuard)
  @Post('/deleteuser')
  async deleteUser(
    @Body('username') userName    : string,
  ) {
    const result = await this.usersService.deleteUser(userName);
      
    return result;
  }
  
  //Post for login page
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Request() req): any {
    return {
      User: req.user,
      msg:  'Valid user'
    };
  }

  // Get / protected
  @UseGuards(AuthenticatedGuard)
  @Get('/protected')
  getHello(@Request() req): string {
    return req.user;
  }

  @Get('/logout')
  logout(@Request() req): any {
    req.session.destroy();
    return { 
      msg: 'Good luck, Mr. Gorsky' 
    }
  }
}
