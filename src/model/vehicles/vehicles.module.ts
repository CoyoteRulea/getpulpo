import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { VehiclesController } from './vehicles.controller';
import { VehiclesSchema } from "./vehicles.model";
import { VehiclesService } from './vehicles.service';
import { BrandsService } from '../brands/brands.service';
import { BrandsSchema } from '../brands/brands.model';
import { ColorsService } from '../colors/colors.service';
import { ColorsSchema} from '../colors/colors.model';

@Module({
  imports:      [
                  MongooseModule.forFeature([{ name: "vehicles", schema: VehiclesSchema }]),
                  MongooseModule.forFeature([{ name: "brands", schema: BrandsSchema }]),
                  MongooseModule.forFeature([{ name: "colors", schema: ColorsSchema }])
                ],
  controllers:  [VehiclesController],
  providers:    [
                  VehiclesService,
                  ColorsService,
                  BrandsService
                ],
  exports:      [VehiclesService]
})

export class VehiclesModule {}
