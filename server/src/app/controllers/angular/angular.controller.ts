import { Controller, All, Res } from '@nestjs/common';
import { HttpException } from "@nestjs/core";

@Controller()
export class AngularController {
  constructor() { }

  @All('*')
  catchAll() {
    throw new HttpException("Not Found", 404)
  }
}
