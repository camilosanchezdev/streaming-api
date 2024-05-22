import { Module } from '@nestjs/common';
import { DatabaseModule } from './../../core/database/database.module';
import { UsersController } from './../../features/users/users.controller';
import { UsersService } from './../../features/users/users.service';

@Module({
    imports: [DatabaseModule],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule { }
