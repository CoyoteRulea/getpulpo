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
  //@UseGuards(AuthenticatedGuard)
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
    
    return {
      msg:      result.id === null ? 'Vehicle Already Exists' : 'New vehicle added',
      vehicleId:   result.id,
      vehicleCode: result.vehicle_id
    };
  }

  //post to add vehicle
  //@UseGuards(AuthenticatedGuard)
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
    
    return {
      msg:         result.id === null ? "Vehicle doens't exits" : 'Vehicle updated',
      vehicleId:   result.id,
      vehicleCode: result.vehicle_id
    };
  }

  //post to delete vehicle
  //@UseGuards(AuthenticatedGuard)
  @Post('/deletevehicle')
  async deleteVehicle(
      @Body('_id') _id  : string
    ) {
    const result = await this.vehiclesService.deleteVehicle(_id);
    return  {
      "msg": !result ? "Vehicle doesn't exists" : "Vehicle deleted"
    };
  }

  //@UseGuards(AuthenticatedGuard)
  @Post('/findbyfields')
  async findbyFields(@Body() body) {
    console.log(body);
    return await this.vehiclesService.getFilteredList(body);
  }
}

