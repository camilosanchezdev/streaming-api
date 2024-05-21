import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export abstract class BaseCrudService<T, CreateDto, UpdateDto, WhereInput> {
    protected abstract readonly prismaClient: PrismaClient;
    protected abstract readonly model: Prisma.ModelName;

    async getAll(): Promise<T[]> {
        try {
            const res = await this.prismaClient[this.model].findMany({
                orderBy: { createdAt: 'desc' },
                where: { deleted: false },
            });

            if (!res) throw new NotFoundException();
            return res;
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException(`Error getting data`);
        }
    }

    async getOne(id: number, conditions?: WhereInput): Promise<T> {
        try {
            const item = await this.prismaClient[this.model].findFirst({
                where: { id: id, deleted: false, ...conditions },
            });
            if (!item) throw new NotFoundException(`${this.model} not found`);
            return item;
        } catch (error) {
            if (error instanceof NotFoundException) throw error;

            throw new InternalServerErrorException(
                `Error retrieving ${this.model} with id ${id}: ${error.message}`,
            );
        }
    }

    async create(body: CreateDto): Promise<T> {
        try {
            return await this.prismaClient[this.model].create({
                data: body,
            });
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async update(id: number, body: UpdateDto): Promise<T> {
        try {
            await this.getOne(id);
            return await this.prismaClient[this.model].update({
                data: body,
                where: { id },
            });
        } catch (error) {
            throw error;
        }
    }

    async remove(id: number): Promise<number> {
        try {
            await this.getOne(id);
            await this.prismaClient[this.model].update({
                where: { id },
                data: { deleted: true },
            });

            return id;
        } catch (error) {
            throw error;
        }
    }
}
