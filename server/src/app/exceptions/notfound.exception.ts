import { HttpException } from "@nestjs/core";
import { HttpStatus } from "@nestjs/common";

export class NotFoundException extends HttpException {
    constructor () {
        super('Not found', HttpStatus.NOT_FOUND);
    }
}