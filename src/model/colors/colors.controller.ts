import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ColorsService } from './colors.service';
import { AuthenticatedGuard } from '../auth/authenticated.guard';

@Controller('colors')
export class ColorsController {
  constructor(private readonly colorsService: ColorsService) {}

  //Get Color By Code
  @UseGuards(AuthenticatedGuard)
  @Post('/colorbycode')
  getColorByCode(
    @Body('color_code') colorCode: string,
  ) {
    const result = this.colorsService.getColorByCode(colorCode);
    
    return result;
  }

    //Get All Colors
  @UseGuards(AuthenticatedGuard)
  @Get('/getcolors')
  getColorList() {
    const result = this.colorsService.getColorList();
      
    return result;
  }
}
