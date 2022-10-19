import { Controller, Get, Body, Request, UseGuards } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { AuthenticatedGuard } from '../auth/authenticated.guard';

@Controller('brands')
export class BrandsController {
    constructor(private readonly brandsService: BrandsService) {}

    //Get Brand By Code
    @UseGuards(AuthenticatedGuard)
    @Get('/brandbycode')
    getColorByCode(
      @Body('brand_code') brandCode: string,
    ) {
      const result = this.brandsService.getBrandByCode(brandCode);
      
      return result;
    }
  
      //Get All Brands
    @UseGuards(AuthenticatedGuard)
    @Get('/getbrands')
    getColorList() {
      const result = this.brandsService.getBrandList();
        
      return result;
    }
}
