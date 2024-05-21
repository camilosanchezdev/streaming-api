import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../core/database/database.module';
import { RolesController } from 'src/features/roles/roles.controller';
import { RolesService } from 'src/features/roles/roles.service';

@Module({
    imports: [DatabaseModule],
    controllers: [RolesController],
    providers: [RolesService],
    exports: [RolesService],
})
export class RolesModule { }
