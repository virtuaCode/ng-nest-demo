import { Module, NestModule } from '@nestjs/common';
import { AngularController } from '../../controllers/angular/angular.controller';

@Module({
    controllers: [AngularController],
})
export class AngularModule {}