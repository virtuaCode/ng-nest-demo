import * as jwt from 'jsonwebtoken';
import { Component, HttpStatus, UsePipes } from "@nestjs/common";
import { HttpException } from "@nestjs/core";
import { UserService } from "../user/user.service";
import * as bcrypt from "bcrypt";
import { User } from '../../entities/user.entity';
import { LoginRequest } from '../../transfer/login.request';
import { TokenResponse } from '../../transfer/token.response';
import { RegisterRequest } from '../../transfer/register.request';

const JWT_KEY: string = process.env.JWT_KEY || "secret";
const SALT_ROUNDS: number = process.env.SALT_ROUNDS || 12;


@Component()
export class AuthService {

  constructor(private userService: UserService) { }

  async login(login: LoginRequest): Promise<TokenResponse> {

    console.log(login);
    
    const lowerName = login.username.toLowerCase();

    console.log("lowercase success");

    const user = await this.userService.getByUsername(lowerName);
    if (!user) throw new HttpException("User Authentication failed", 401);

    console.log(user);

    const valid: boolean = await this.checkPassword(login.password, user.password);
    if (!valid) throw new HttpException("User Authentication failed", 401);

    return await this.createToken(user);
  }


  async register(register: RegisterRequest): Promise<TokenResponse> {

    const hash = await this.hashPassword(register.password);

    const newUser: User = new User(register.username, register.displayname, hash);

    let savedUser;
    try {
      savedUser = await this.userService.add(newUser);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY')
        throw new HttpException("Username already taken", HttpStatus.CONFLICT)
      throw error;
    }

    return await this.createToken(savedUser);
  }

  private async createToken(user: User): Promise<TokenResponse> {
    const id: number = user.id;
    const username: string = user.username;

    return await this.signJwt(id, username);;
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

  private signJwt(id: number, username: string): Promise<TokenResponse> {
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