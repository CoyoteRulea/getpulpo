import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './model/users/users.module';
import { AuthModule } from './model/auth/auth.module';
import { VehiclesModule } from './model/vehicles/vehicles.module';
import { BrandsModule } from './model/brands/brands.module';
import { ColorsModule } from './model/colors/colors.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_CONNECTION_STRING, { dbName: process.env.MONGO_DBNAME }),
    UsersModule,
    AuthModule,
    VehiclesModule,
    BrandsModule,
    ColorsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
