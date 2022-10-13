import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose"
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './model/users/users.module';
import { AuthModule } from './model/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      "mongodb+srv://victor_ivan_mendez:Q1w2e3r4t5Y6@cluster0.lbh1auf.mongodb.net/?retryWrites=true&w=majority"
    ),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}