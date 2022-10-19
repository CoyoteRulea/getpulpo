import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from './users.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel('users') private readonly userModel: Model<Users>) {}
  
  async insertUser(userName: string, password: string) {

    const username  = userName.toLowerCase();
    const user      = await this.userModel.findOne({ username });
    if (user) {
      return {
        id: null,
        username: null
      }
    }

    const newUser   = new this.userModel({
      username,
      password,
    });

    await newUser.save();

    return newUser;
  }

  async getUser(userName: string) {
    const username  = userName.toLowerCase();
    const user      = await this.userModel.findOne({ username });

    return user;
  }

  async deleteUser(userName: string) {
    const username  = userName.toLowerCase();
    const user      = await this.userModel.findOne({ username });
    if (!user) {
      return {
        "msg": "User doesn't exists"
      }
    }
    return await user.delete();
  }
}
