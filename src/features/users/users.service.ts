import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { Prisma, PrismaClient, User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

import { CreateUserDto } from './dtos/create-user.dto';
import { BaseCrudService } from 'src/shared/services/base-crud.service';
import { UpdateUserDto } from 'src/features/users/dtos/update-user.dto';
import { RegisterUserDto } from 'src/features/users/dtos/register-user.dto';
import { RolesEnum } from 'src/shared/enums/roles.enum';

@Injectable()
export class UsersService extends BaseCrudService<
    User,
    CreateUserDto,
    UpdateUserDto,
    Prisma.UserWhereInput
> {
    protected readonly prismaClient = new PrismaClient();
    protected readonly model = 'User';
    constructor() {
        super();
    }
    async getOneByEmail(email: string): Promise<User> {
        try {
            const item = await this.prismaClient['user'].findFirst({
                where: { email },
            });
            if (!item) throw new NotFoundException(`${this.model} not found`);
            return item;
        } catch (error) {
            if (error instanceof NotFoundException) return null;

            throw new InternalServerErrorException(
                `Error retrieving ${this.model} with email ${email}: ${error.message}`,
            );
        }
    }
    async create(body: CreateUserDto): Promise<User> {
        try {
            const { password, ...rest } = body;
            const result = await this.getOneByEmail(body.email);
            if (result)
                throw new BadRequestException(
                    'That email address is already registered',
                );
            const passwordHash = await bcrypt.hash(password, 12);
            const payload = { password: passwordHash, ...rest };
            return await this.prismaClient['user'].create({
                data: payload,
            });
        } catch (error) {
            if (error instanceof BadRequestException) throw error
            throw new InternalServerErrorException("Server Error")
        }
    }
    async register(body: RegisterUserDto): Promise<User> {
        try {
            const { password, ...rest } = body;
            const result = await this.getOneByEmail(body.email);
            if (result)
                throw new BadRequestException(
                    'That email address is already registered',
                );
            const passwordHash = await bcrypt.hash(password, 12);
            const payload = { password: passwordHash, ...rest };
            return await this.prismaClient['user'].create({
                data: {
                    role: {
                        connect: { id: RolesEnum.USUARIO_REGULAR }
                    }, ...payload
                },
            });
        } catch (error) {
            if (error instanceof BadRequestException) throw error
            throw new InternalServerErrorException("Server Error")
        }
    }
}