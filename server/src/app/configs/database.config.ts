import { Component } from '@nestjs/common';
import { ConnectionOptions } from 'typeorm';
import { join } from "path";
import { User } from '../entities/user.entity';


@Component()
export class DatabaseConfig {
    public getConfiguration(): ConnectionOptions {
        return {
            driver: {
                type: "mysql",
                host: "localhost",
                port: 3306,
                username: "root",
                password: "toor",
                database: "nest_demo",
            },
            entities: [
                User
            ],
            autoSchemaSync: true,
        }
    }
}