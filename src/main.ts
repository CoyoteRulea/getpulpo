import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from "express-session";
import * as passport from "passport";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  var cors = require('cors');
  app.use(cors({ origin: [ "http://localhost:4200" ], credentials: true }));
  app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","http://localhost:4200");
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization');
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    } else {
        next();
    }
  });
  
  app.setGlobalPrefix('api');
  
  app.use(
    session({
      secret: "keyboard",
      resave: false,
      saveUninitialized: false,
      cookie: { httpOnly: false }
    })
  )
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(3000);
}

bootstrap();
