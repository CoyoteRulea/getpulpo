import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { ColorsController } from './colors.controller';
import { ColorsService } from './colors.service';
import { ColorsSchema } from "./colors.model";

@Module({
  imports:      [MongooseModule.forFeature([{ name: "colors", schema: ColorsSchema }])],
  controllers:  [ColorsController],
  providers:    [ColorsService],
  exports:      [ColorsService],
})
export class ColorsModule {}
