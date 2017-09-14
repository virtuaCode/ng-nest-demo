import { Component } from '@nestjs/common';
import { HttpException } from '@nestjs/core';

import * as bcrypt from "bcrypt";
import { Users, IUserModel } from "../../schemas/user.schema";
import { User } from "../../models/user";
import { RegisterDto } from "../../dto/register.dto";
import { UserExistsException } from "../../exceptions/user-exists.exception";

@Component()
export class UserService {

  public async getAllUsers(): Promise<IUserModel[]> {
    const users = Users.find().exec();
    return users;
  }

  public async getUserById(id: number): Promise<IUserModel> {
    const user = Users.findById(id).exec();
    return user;
  }

  public async getUserByName(username: string): Promise<IUserModel> {
    const user = Users.findOne({ username: username }).exec();
    return user;
  }

  public async addUser(user: User): Promise<IUserModel> {
    let doc;

    try {
      doc = await Users.create(user);
    } catch (error) {
      if (error.name === 'MongoError' && error.code === 11000)
        throw new UserExistsException();
      else
        throw error;
    }
    
    return doc;
  }
}