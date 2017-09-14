import { ExceptionFilter, Catch, HttpStatus} from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import { Response } from "express";
import { ValidationException } from "../exceptions/validation.exception";

@Catch(HttpException)
export class LoginExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, response: Response) {
    const status = HttpStatus.UNAUTHORIZED

    response.status(status).json({
      statusCode: status,
      message: `User authentication failed`,
    });
  }
}