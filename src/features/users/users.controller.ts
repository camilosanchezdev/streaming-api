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
import { User } from '@prisma/client';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { UsersService } from 'src/features/users/users.service';
import { RoleGuard } from 'src/core/auth/guards/roles.guard';
import { Roles } from 'src/core/auth/decorators/role.decorator';
import { CreateUserDto } from 'src/features/users/dtos/create-user.dto';
import { RolesEnum } from 'src/shared/enums/roles.enum';
import { UpdateUserDto } from 'src/features/users/dtos/update-user.dto';
import { RegisterUserDto } from 'src/features/users/dtos/register-user.dto';

@Controller('users')
@ApiTags('Users')
export class UsersController {
    constructor(private readonly engineService: UsersService) { }

    @Post('register')
    async register(@Body() body: RegisterUserDto): Promise<User> {
        return await this.engineService.register(body);
    }

    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Roles(RolesEnum.ADMINISTRADOR)
    @ApiSecurity('bearer')
    @Get()
    async getAll(): Promise<User[]> {
        return await this.engineService.getAll();
    }

    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
        return await this.engineService.getOne(id);
    }

    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Roles(RolesEnum.ADMINISTRADOR)
    @ApiSecurity('bearer')
    @Post()
    async create(@Body() body: CreateUserDto): Promise<User> {
        return await this.engineService.create(body);
    }

    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Roles(RolesEnum.ADMINISTRADOR)
    @ApiSecurity('bearer')
    @Put(':id')
    async edit(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: UpdateUserDto,
    ): Promise<User> {
        return await this.engineService.update(id, body);
    }

    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Roles(RolesEnum.ADMINISTRADOR)
    @ApiSecurity('bearer')
    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number): Promise<number> {
        return await this.engineService.remove(id);
    }


}
