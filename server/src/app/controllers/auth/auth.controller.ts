import { Controller, Post, Res, Body, UsePipes, HttpStatus, UseFilters } from '@nestjs/common';
import { Response } from "express";
import { AuthService } from "../../services/auth/auth.service";
import { UserService } from "../../services/user/user.service";
import { ValidatorPipe } from "../../pipes/validator/validator.pipe";
import { TokenDto } from "../../dto/token.dto";
import { LoginDto } from "../../dto/login.dto";
import { RegisterDto } from "../../dto/register.dto";
import { LoginExceptionFilter } from "../../filters/login.filter";


@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService,
        private userService: UserService
    ) { }

    @Post('login')
    @UseFilters(new LoginExceptionFilter())
    public async loginUser( @Res() res: Response, @Body("", new ValidatorPipe()) loginDto: LoginDto) {
        const token: TokenDto = await this.authService.login(loginDto);
        res.json(token);
    }

    @Post('register')
    @UsePipes(new ValidatorPipe())
    public async registerUser( @Res() res: Response, @Body() registerDto: RegisterDto) {
        const token: TokenDto = await this.authService.register(registerDto);
        res.status(HttpStatus.CREATED).json(token);
    }
}