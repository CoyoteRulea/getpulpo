import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthenticatedGuard } from '../auth/authenticated.guard';
import { LocalAuthGuard } from '../auth/local.auth.guard';
import * as bcrypt from 'bcrypt';
import { UserResponse } from './users.model';

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
  ): Promise<UserResponse> {
    const result = await this.usersService.deleteUser(userName);
    if (typeof result !== "string") {
      return {
        User: result,
        status: 205,
        msg: 'User credential removed correctly'
      }
    } else {
      return {
        User: null,
        status: 400,
        msg: 'Unregistered user'
      };
    }
  }
  
  //Post for login page
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Request() req): UserResponse {
    return {
      User: req.user,
      status: 201,
      msg:  'Valid user'
    };
  }

  // Get / protected
  @UseGuards(AuthenticatedGuard)
  @Get('/protected')
  getHello(@Request() req): UserResponse {
    return {
      User: req.user,
      status: 202,
      msg: 'Request Accepted'
    }
  }

  @Get('/logout')
  logout(@Request() req): UserResponse {
    req.session.destroy();
    return { 
      User: null,
      status: 205,
      msg: 'Good luck, Mr. Gorsky' 
    }
  }
}
