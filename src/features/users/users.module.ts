import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/core/database/database.module';
import { UsersController } from 'src/features/users/users.controller';
import { UsersService } from 'src/features/users/users.service';

@Module({
    imports: [DatabaseModule],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule { }
