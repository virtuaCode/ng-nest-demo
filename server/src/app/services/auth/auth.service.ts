import * as jwt from 'jsonwebtoken';
import { Component, HttpStatus, UsePipes } from "@nestjs/common";
import { HttpException } from "@nestjs/core";
import { UserService } from "../user/user.service";
import { User } from "../../models/user";
import * as bcrypt from "bcrypt";
import { IUserModel } from "../../schemas/user.schema";
import { LoginDto } from "../../dto/login.dto";
import { TokenDto } from "../../dto/token.dto";
import { RegisterDto } from "../../dto/register.dto";

const JWT_KEY: string = process.env.JWT_KEY || "secret";
const SALT_ROUNDS: number = process.env.SALT_ROUNDS || 12;


@Component()
export class AuthService {

  constructor(private userService: UserService) { }

  async login(login: LoginDto): Promise<TokenDto> {

    const lowerName = login.username.toLowerCase();

    const user: IUserModel = await this.userService.getUserByName(lowerName);

    if (!user) throw new HttpException("User Authentication failed", 401);


    const valid: boolean = await this.checkPassword(login.password, user.password);

    if (!valid) throw new HttpException("User Authentication failed", 401);

    return await this.createToken(user);
  }


  async register(registerDto: RegisterDto): Promise<TokenDto> {

    if (registerDto.displayname.length === 0)
      registerDto.displayname = registerDto.username;

    const hash = await this.hashPassword(registerDto.password);

    const user: User = {
      username: registerDto.username,
      displayname: registerDto.displayname,
      password: hash,
      created: new Date()
    }

    const doc = await this.userService.addUser(user);

    return await this.createToken(doc);
  }

  private async createToken(user: IUserModel): Promise<TokenDto> {
    const id: string = user.id;
    const username: string = user.username;

    const token = await this.signJwt(id, username);
    return token;
  }

  private hashPassword(password): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, SALT_ROUNDS, (err, hash) => {
        if (err)
          reject(err);
        else
          resolve(hash);
      })
    });
  }

  private checkPassword(password: string, hash: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, hash, function (err, res) {
        if (err)
          reject(err);
        else
          resolve(res);
      });
    });
  }

  private signJwt(id: string, username: string): Promise<TokenDto> {
    return new Promise((resolve, reject) => {
      jwt.sign({ id, username }, JWT_KEY, function (err, token) {
        if (err)
          reject(err);
        else
          resolve({ token });
      });
    });
  }
}