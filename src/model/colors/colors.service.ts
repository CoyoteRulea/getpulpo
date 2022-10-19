import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Colors } from './colors.model';

@Injectable()
export class ColorsService {
  constructor(@InjectModel('colors') private readonly colorModel: Model<Colors>) {}

  async getColorByCode(colorCode: string) {
    const color_code  = colorCode.toLowerCase();
    const color       = await this.colorModel.findOne({ 'color_code': colorCode });

    return color;
  }

  async getColorList() {
    const colors      = await this.colorModel.find();

    return colors;
  }
}
