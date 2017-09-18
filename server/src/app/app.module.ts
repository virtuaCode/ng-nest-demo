import { Module } from '@nestjs/common';
import { UserController } from "./controllers/user/user.controller";
import { UserService } from "./services/user/user.service";
import { AngularController } from './controllers/angular/angular.controller';
import { AuthService } from './services/auth/auth.service';
import { AuthController } from './controllers/auth/auth.controller';
import { TypeOrmDatabaseService } from './services/typeorm-database/typeorm-database.service';
import { UserModule } from './modules/user/user.module';
import { AngularModule } from './modules/angular/angular.module';


@Module({
  modules: [UserModule, AngularModule],
})
export class ApplicationModule { }