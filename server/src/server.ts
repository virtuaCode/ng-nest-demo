import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as mongoose from "mongoose";
import * as Q from "q";
import { Response as ResponseE } from "express";
import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common/interfaces/nest-application.interface';
import { ApplicationModule } from "./app/app.module";

(<any>mongoose).Promise = Q.Promise;

function angularRouter(req, res: ResponseE) {
  res.sendFile(__dirname + "/public/index.html");
}

function notFoundRouter(req, res: ResponseE) {
  res.sendStatus(404);
}

async function bootstrap() {
  mongoose.connect('mongodb://localhost/ngexample');

  const expressInstance = express();

  expressInstance.use(express.static(__dirname + '/public'));
  expressInstance.use(bodyParser.json());
  const app = await NestFactory.create(ApplicationModule, expressInstance);

  app.setGlobalPrefix('api');

  await app.listen(3000);

  expressInstance.get('*', angularRouter);
}
bootstrap();
