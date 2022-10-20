import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { BrandsController } from './brands.controller';
import { BrandsService } from './brands.service';
import { BrandsSchema } from "./brands.model";

@Module({
  imports:      [MongooseModule.forFeature([{ name: "brands", schema: BrandsSchema }])],
  controllers:  [BrandsController],
  providers:    [BrandsService],
  exports:      [BrandsService]
})
export class BrandsModule {}
