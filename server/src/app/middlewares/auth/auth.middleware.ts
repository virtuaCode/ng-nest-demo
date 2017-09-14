import { Middleware, NestMiddleware, HttpStatus } from '@nestjs/common';
import * as jwt from 'express-jwt';

const JWT_KEY = process.env.JWT_KEY || "secret";

@Middleware()
export class AuthMiddleware implements NestMiddleware {
    constructor() {}
    resolve(): (req, res, next) => void {
        return jwt({secret: JWT_KEY});
    }
}