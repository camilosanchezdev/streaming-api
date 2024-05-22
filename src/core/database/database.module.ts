import { Module } from '@nestjs/common';
import { PrismaService } from './../../core/database/database.service';

@Module({
    providers: [PrismaService],
    exports: [PrismaService],
})
export class DatabaseModule { }
