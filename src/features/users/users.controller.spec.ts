import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@prisma/client';
import { CreateUserDto } from './dtos/create-user.dto';
import { RegisterUserDto } from './dtos/register-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersController } from './users.controller';
import { UsersService } from "./users.service";

describe('UsersController', () => {
    let controller: UsersController;
    let service: UsersService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                {
                    provide: UsersService,
                    useValue: {
                        register: jest.fn(),
                        getAll: jest.fn(),
                        getOne: jest.fn(),
                        create: jest.fn(),
                        update: jest.fn(),
                        remove: jest.fn(),
                    },
                },
            ],
        }).compile();

        controller = module.get<UsersController>(UsersController);
        service = module.get<UsersService>(UsersService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('register', () => {
        it('should register a new user', async () => {
            const dto: RegisterUserDto = { email: 'email@test.com', password: '123' };
            const result: User = { id: 1, email: 'email@test.com', password: '123', createdAt: new Date(), updatedAt: new Date(), deleted: false, roleId: 2 };

            jest.spyOn(service, 'register').mockResolvedValue(result);
            const response = await controller.register(dto)
            expect(response.email).toBe(dto.email);
        });
    });

    describe('getAll', () => {
        it('should return an array of users', async () => {
            const result: User[] = [];

            jest.spyOn(service, 'getAll').mockResolvedValue(result);

            expect(await controller.getAll()).toBe(result);
        });
    });

    describe('getOne', () => {
        it('should return a single user by id', async () => {
            const result: User = { id: 1, email: 'email@test.com', password: '123', createdAt: new Date(), updatedAt: new Date(), deleted: false, roleId: 2 };

            const id = 1;

            jest.spyOn(service, 'getOne').mockResolvedValue(result);

            expect(await controller.getOne(id)).toBe(result);
        });
    });

    describe('create', () => {
        it('should create a new user', async () => {
            const dto: CreateUserDto = { email: 'test@test.com', password: '123', roleId: 2 };
            const result: User = { id: 1, email: 'email@test.com', password: '123', createdAt: new Date(), updatedAt: new Date(), deleted: false, roleId: 2 };


            jest.spyOn(service, 'create').mockResolvedValue(result);

            expect(await controller.create(dto)).toBe(result);
        });
    });

    describe('edit', () => {
        it('should update an existing user', async () => {
            const dto: UpdateUserDto = { email: 'test@test.com' };
            const result: User = { id: 1, email: 'email@test.com', password: '123', createdAt: new Date(), updatedAt: new Date(), deleted: false, roleId: 2 };

            const id = 1;

            jest.spyOn(service, 'update').mockResolvedValue(result);

            expect(await controller.edit(id, dto)).toBe(result);
        });
    });

    describe('remove', () => {
        it('should remove a user by id', async () => {
            const id = 1;
            const result = 1;

            jest.spyOn(service, 'remove').mockResolvedValue(result);

            expect(await controller.remove(id)).toBe(result);
        });
    });
});