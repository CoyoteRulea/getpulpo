import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { ColorsService } from '../colors/colors.service';
import { BrandsService } from '../brands/brands.service';
import { AuthenticatedGuard } from '../auth/authenticated.guard';

@Controller('vehicles')
export class VehiclesController {
  constructor(
    private readonly vehiclesService: VehiclesService,
    private readonly colorsService: ColorsService,
    private readonly brandsService: BrandsService
    ) {}

  //post to add vehicle
  @UseGuards(AuthenticatedGuard)
  @Post('/addvehicle')
  async addVehicle(
    @Body('vehicle_id') vehicle_id  : string,
    @Body('brand')      brand       : string,
    @Body('model')      model       : string,
    @Body('color')      color       : string,
    @Body('status')     status      : boolean,
    @Body('assigned')   assigned    : boolean,
  ) {
    if (!await this.colorsService.getColorByCode(color)) {
      return {
        msg: "Unknow color assigned"
      }
    }
    
    if (!await this.brandsService.getBrandByCode(brand)) {
      return {
        msg: "Unknow brand assigned"
      }
    }

    const result = await this.vehiclesService.insertVehicle(
      vehicle_id,
      brand,
      model,
      color,
      status,
      assigned
    );
    
    if (result.id === null) {
      return {
        vehicle:    null,
        statusCode: 409,
        msg:        'Vehicle already exists.'
      };
    } else {
      return {
        vehicle:    result,
        statusCode: 201,
        msg:        'Vehicle created correctly.'
      }
    }
  }

  //post to add vehicle
  @UseGuards(AuthenticatedGuard)
  @Post('/updatevehicle')
  async updateVehicle(
    @Body('_id')        id          : string,
    @Body('vehicle_id') vehicle_id  : string,
    @Body('brand')      brand       : string,
    @Body('model')      model       : string,
    @Body('color')      color       : string,
    @Body('status')     status      : boolean,
    @Body('assigned')   assigned    : boolean,
  ) {
    if (!await this.colorsService.getColorByCode(color)) {
      return {
        msg: "Unknow color assigned"
      }
    }
    
    if (!await this.brandsService.getBrandByCode(brand)) {
      return {
        msg: "Unknow brand assigned"
      }
    }

    const result = await this.vehiclesService.updateVehicle(
      id,
      vehicle_id,
      brand,
      model,
      color,
      status,
      assigned
    );
    
    if (result.id === null) {
      return {
        Vehicle:     null,
        statusCode:  401,
        vehicleCode: 'Vehicle doens\'t exits'
      };
    } else {
      return {
        Vehicle:     result,
        statusCode:  204,
        vehicleCode: 'Vehicle updated'
      };
    }
  }

  //post to delete vehicle
  @UseGuards(AuthenticatedGuard)
  @Post('/deletevehicle')
  async deleteVehicle(
      @Body('_id') _id  : string
    ) {
    const result = await this.vehiclesService.deleteVehicle(_id);
    return  {
      statusCode: !result ? 401 : 204,
      msg:        !result ? "Vehicle doesn't exists" : "Vehicle deleted"
    };
  }

  @UseGuards(AuthenticatedGuard)
  @Post('/findbyfields')
  async findbyFields(@Body() body) {
    return await this.vehiclesService.getFilteredList(body);
  }
}

