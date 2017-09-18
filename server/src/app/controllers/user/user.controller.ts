import { Controller, Post, Body, Get, Dependencies, Param, Res, UseInterceptors, HttpCode, HttpStatus, Put, UsePipes } from '@nestjs/common';
import { UserService } from "../../services/user/user.service";
import { Response } from "express";
import { UserInterceptor } from "../../interceptors/user.interceptor";
import { User } from '../../entities/user.entity';
import { ProfileRequest } from '../../transfer/profile.request';
import { NotFoundException } from '../../exceptions/notfound.exception';
import { ValidatorPipe } from '../../pipes/validator/validator.pipe';
import { ProfileInterceptor } from '../../interceptors/profile.interceptor';

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
    @UseInterceptors(ProfileInterceptor)
    public async getUserProfile( @Param("id") id): Promise<User> {

        let user = await this.userService.get(+id);

        if (user === undefined) throw new NotFoundException();

        return user;
    }

    @Put(':id/profile')
    @HttpCode(HttpStatus.ACCEPTED)
    @UsePipes(new ValidatorPipe())
    @UseInterceptors(ProfileInterceptor)
    public async putUserProfile( @Param("id") id, @Body() profile: ProfileRequest): Promise<User> {

        let user = await this.userService.get(+id);

        if (user === undefined) throw new NotFoundException();

        user.displayname = profile.displayname;
        user.luckynumber = profile.luckynumber;
        user.homepage = profile.homepage;

        return await this.userService.update(user);
    }
}