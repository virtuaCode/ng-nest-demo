import { PipeTransform, Pipe, ArgumentMetadata, HttpStatus } from '@nestjs/common';
import { HttpException } from "@nestjs/core";
import { validate } from "class-validator";
import { ValidationException } from "../../exceptions/validation.exception";

@Pipe()
export class ValidatorPipe implements PipeTransform<any> {
  public async transform(value, metadata: ArgumentMetadata) {
    if(metadata.metatype === undefined)
      throw new Error("Metatype is not defined");
    
    const metatype: (new (...args: any[]) => any) = metadata.metatype;

    if (!this.toValidate(metatype)) {
      return value;
    }
    const object = Object.assign(new metatype(), value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new ValidationException();
    }

    return value;
  }

  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find((type) => metatype === type);
  }
}