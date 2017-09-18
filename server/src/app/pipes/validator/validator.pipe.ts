import { PipeTransform, Pipe, ArgumentMetadata, HttpStatus } from '@nestjs/common';
import { HttpException } from "@nestjs/core";
import { validate } from "class-validator";
import { ValidationException } from "../../exceptions/validation.exception";
import { plainToClass } from 'class-transformer';



@Pipe()
export class ValidatorPipe implements PipeTransform<any> {

  /**
   * Converts a plain JavaScript object to a specific class and validates its properties.
   * 
   * @throws { ValidationException }
   */
  public async transform(value, metadata: ArgumentMetadata) {

    if (metadata.metatype === undefined)
      throw new Error("Metatype is not defined");

    const metatype = metadata.metatype;

    if (!this.toValidate(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      throw new ValidationException();
    }

    return object;
  }

  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find((type) => metatype === type);
  }
}