import { Component } from '@nestjs/common';
import { ConnectionOptions } from 'typeorm';
import { join } from "path";
import { User } from '../entities/user.entity';


@Component()
export class DatabaseConfig {
    public getConfiguration(): ConnectionOptions {
        return {
            driver: {
                type: process.env.DB_DRIVER,
                host: process.env.DB_HOST,
                port: process.env.DB_PORT,
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME
            },
            entities: [
                User
            ],
            autoSchemaSync: true,
        }
    }
}