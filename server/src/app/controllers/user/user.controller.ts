import { Controller, Post, Body, Get, Dependencies, Param, Res, UseInterceptors, HttpCode, HttpStatus, Put, UsePipes } from '@nestjs/common';
import { UserService } from "../../services/user/user.service";
import { Response } from "express";
import { UserInterceptor } from "../../interceptors/user.interceptor";
import { User } from '../../entities/user.entity';
import { ProfileRequest } from '../../transfer/profile.request';
import { NotFoundException } from '../../exceptions/notfound.exception';
import { ProfileResponse } from '../../transfer/profile.response';
import { ValidatorPipe } from '../../pipes/validator/validator.pipe';

@Controller('users')
@Dependencies(UserService)
export class UserController {

    constructor(private userService: UserService) { }

    @Get()
    @HttpCode(HttpStatus.ACCEPTED)
    @UseInterceptors(UserInterceptor)
    public async getAllUsers(): Promise<User[]> {
        return await this.userService.getAll();
    }


    @Get(':id')
    @HttpCode(HttpStatus.ACCEPTED)
    @UseInterceptors(UserInterceptor)
    public async getUser( @Param("id") id): Promise<User> {

        const user = await this.userService.get(+id);

        if (user === undefined) throw new NotFoundException();

        return user;
    }

    @Get(':id/profile')
    @HttpCode(HttpStatus.ACCEPTED)
    public async getUserProfile( @Param("id") id): Promise<ProfileResponse> {

        let user = await this.userService.get(+id);

        if (user === undefined) throw new NotFoundException();

        const { displayname, homepage, luckynumber } = user;

        return { displayname, homepage, luckynumber };
    }

    @Put(':id/profile')
    @HttpCode(HttpStatus.ACCEPTED)
    @UsePipes(new ValidatorPipe())
    public async putUserProfile( @Param("id") id, @Body() profile: ProfileRequest): Promise<ProfileResponse> {

        let user = await this.userService.get(+id);

        if (user === undefined) throw new NotFoundException();

        user.displayname = profile.displayname;
        user.luckynumber = profile.luckynumber;
        user.homepage = profile.homepage;

        const { displayname, homepage, luckynumber } = await this.userService.update(user);

        return { displayname, homepage, luckynumber };
    }
}