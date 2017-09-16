import { Module, NestModule } from '@nestjs/common';
import { TypeOrmDatabaseService } from '../../services/typeorm-database/typeorm-database.service';

@Module({
    components: [TypeOrmDatabaseService],
    exports: [TypeOrmDatabaseService]
})
export class DatabaseModule {}