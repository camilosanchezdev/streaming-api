import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    ParseIntPipe,
    UseGuards,
} from '@nestjs/common';

import { Role } from '@prisma/client';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesEnum } from '../../shared/enums/roles.enum';
import { Roles } from 'src/core/auth/decorators/role.decorator';
import { RoleGuard } from 'src/core/auth/guards/roles.guard';
import { RolesService } from 'src/features/roles/roles.service';
import { CreateUpdateRoleDto } from 'src/features/roles/dtos/create-update-role.dto';

@Controller('roles')
@ApiSecurity('bearer')
@UseGuards(AuthGuard('jwt'), RoleGuard)
@Roles(RolesEnum.ADMINISTRADOR)
@ApiTags('Roles')
export class RolesController {
    constructor(private readonly engineService: RolesService) { }

    @Get()
    async getAll(): Promise<Role[]> {
        return await this.engineService.getAll();
    }

    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number): Promise<Role> {
        return await this.engineService.getOne(id);
    }

    @Post()
    async create(@Body() body: CreateUpdateRoleDto): Promise<Role> {
        return await this.engineService.create(body);
    }

    @Put(':id')
    async edit(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: CreateUpdateRoleDto,
    ): Promise<Role> {
        return await this.engineService.update(id, body);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number): Promise<number> {
        return await this.engineService.remove(id);
    }
}
