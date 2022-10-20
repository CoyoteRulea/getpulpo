import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vehicles } from './vehicles.model';

@Injectable()
export class VehiclesService {
  constructor(@InjectModel('vehicles') private readonly vehiclesModel: Model<Vehicles>) {}
  

  async insertVehicle(vehicle_id: string, brand: string, model: string, color: string, status: boolean, assigned: boolean) {
    const vehicle = await this.vehiclesModel.findOne({ vehicle_id });
    if (vehicle) {
      return {
        id: null,
        vehicle_id: null
      }
    }
    const newVehicle   = new this.vehiclesModel({
      vehicle_id,
      brand,
      model,
      color,
      status,
      assigned
    });

    return newVehicle.save();
  }

  async updateVehicle(id: string, vehicle_id: string, brand: string, model: string, color: string, status: boolean, assigned: boolean) {
  
    return await this.vehiclesModel.findByIdAndUpdate(
      { _id: id },
      { vehicle_id, brand, model, color, status, assigned },
      { upsert: false }
    );
  }

  async deleteVehicle(id: string) {
    return this.vehiclesModel.findByIdAndRemove(id);
  }

  async getFilteredList(params: string[]) {
    return this.vehiclesModel.find(params);
  }
}
