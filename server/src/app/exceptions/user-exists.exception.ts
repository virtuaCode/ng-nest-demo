import { HttpException } from "@nestjs/core";
import { HttpStatus } from "@nestjs/common";

export class UserExistsException extends HttpException {
    constructor () {
        super('User already exists', HttpStatus.CONFLICT);
    }
}