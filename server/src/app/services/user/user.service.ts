import { Component } from '@nestjs/common';
import { HttpException } from '@nestjs/core';

import * as bcrypt from "bcrypt";
import { User } from "../../entities/user.entity";
import { UserExistsException } from "../../exceptions/user-exists.exception";
import { Service } from '../../interfaces/service.interface';
import { TypeOrmDatabaseService } from '../typeorm-database/typeorm-database.service';
import { Repository } from 'typeorm';


@Component()
export class UserService implements Service<User> {

    constructor(private databaseService: TypeOrmDatabaseService) { }

    private get repository(): Promise<Repository<User>> {
        return this.databaseService.getRepository(User);
    }

    // C
    public async add(user: User): Promise<User> {
        return (await this.repository).persist(user);
    }

    public async addAll(users: User[]): Promise<User[]> {
        return (await this.repository).persist(users);
    }

    // R
    public async getAll(): Promise<User[]> {
        return (await this.repository).find();
    }

    public async get(id: number): Promise<User | undefined> {
        return (await this.repository).findOneById(id);
    }

    public async getByUsername(username: string): Promise<User | undefined>  {
        return (await this.repository).findOne({username});
    }

    // U
    public async update(user: User): Promise<User> {
        return (await this.repository).persist(user);
    }

    // D
    public async remove(user: User): Promise<User> {
        return (await this.repository).remove(user);
    }
}