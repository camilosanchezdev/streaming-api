import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient, Role } from '@prisma/client';
import { BaseCrudService } from '../../shared/services/base-crud.service';
import { CreateUpdateRoleDto } from 'src/features/roles/dtos/create-update-role.dto';

@Injectable()
export class RolesService extends BaseCrudService<
    Role,
    CreateUpdateRoleDto,
    CreateUpdateRoleDto,
    Prisma.RoleWhereInput
> {
    protected readonly prismaClient = new PrismaClient();
    protected readonly model = 'Role';
    constructor() {
        super();
    }
}
