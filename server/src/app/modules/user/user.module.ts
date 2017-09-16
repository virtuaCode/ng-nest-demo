import { Module, NestModule, RequestMethod, MiddlewaresConsumer, OnModuleInit } from '@nestjs/common';
import { DatabaseConfig } from '../../configs/database.config';
import { UserService } from '../../services/user/user.service';
import { UserController } from '../../controllers/user/user.controller';
import { DatabaseModule } from '../database/database.module';
import { AuthController } from '../../controllers/auth/auth.controller';
import { AuthService } from '../../services/auth/auth.service';

@Module({
    modules: [DatabaseModule],
    controllers: [UserController, AuthController],
    components: [
        UserService,
        AuthService,
        { provide: DatabaseConfig, useClass: DatabaseConfig },
    ],
})
export class UserModule {}