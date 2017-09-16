import { Controller, Post, Res, Body, UsePipes, HttpStatus, UseFilters, HttpCode } from '@nestjs/common';
import { Response } from "express";
import { AuthService } from "../../services/auth/auth.service";
import { UserService } from "../../services/user/user.service";
import { ValidatorPipe } from "../../pipes/validator/validator.pipe";
import { LoginExceptionFilter } from "../../filters/login.filter";
import { TokenResponse } from '../../transfer/token.response';
import { LoginRequest } from '../../transfer/login.request';
import { RegisterRequest } from '../../transfer/register.request';


@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ) { }

    @Post('login')
    @HttpCode(HttpStatus.ACCEPTED)
    @UsePipes(new ValidatorPipe())
    @UseFilters(new LoginExceptionFilter())
    public async loginUser(@Body() login: LoginRequest): Promise<TokenResponse> {
        return await this.authService.login(login);
    }

    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    @UsePipes(new ValidatorPipe())
    public async registerUser(@Body() register: RegisterRequest): Promise<TokenResponse> {
        return await this.authService.register(register);
    }
}