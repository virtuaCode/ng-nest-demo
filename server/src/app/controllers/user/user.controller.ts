import { Controller, Post, Body, Get, Dependencies, Param, Res } from '@nestjs/common';
import { UserService } from "../../services/user/user.service";
import { Response } from "express";

@Controller('users')
@Dependencies(UserService)
export class UserController {

    constructor(private userService: UserService) { }

    @Get()
    public async getAllUsers( @Res() res: Response) {
        const users =  await this.userService.getAllUsers();
        res.json(users);
    }

    @Get(':id')
    public async getUser( @Res() res: Response, @Param("id") id) {
        const user = await this.userService.getUserById(+id);
        res.json(user);
    }
}