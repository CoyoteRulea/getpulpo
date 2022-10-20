import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Brands } from './brands.model';

@Injectable()
export class BrandsService {
  constructor(@InjectModel('brands') private readonly brandModel: Model<Brands>) {}

  async getBrandByCode(brandCode: string) {
    const brand_code  = brandCode.toLowerCase();
    const brand       = await this.brandModel.findOne({ 'brand_code': brandCode });

    return brand;
  }

  async getBrandList() {
    const brands      = await this.brandModel.find();

    return brands;
  }
}
