import {Module} from '@nestjs/common';
import { UserController } from "./controllers/user/user.controller";
import { UserService } from "./services/user/user.service";
import {AngularController} from './controllers/angular/angular.controller';
import {AuthService} from './services/auth/auth.service';
import {AuthController} from './controllers/auth/auth.controller';

@Module({
  controllers: [
    UserController,
    AuthController,
    AngularController
  ],
  components: [
    UserService,
    AuthService
  ]
})
export class ApplicationModule {}