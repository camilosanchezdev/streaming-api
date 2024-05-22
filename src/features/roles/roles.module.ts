import { Module } from '@nestjs/common';
import { DatabaseModule } from './../../core/database/database.module';
import { RolesController } from './../../features/roles/roles.controller';
import { RolesService } from './../../features/roles/roles.service';

@Module({
    imports: [DatabaseModule],
    controllers: [RolesController],
    providers: [RolesService],
    exports: [RolesService],
})
export class RolesModule { }
