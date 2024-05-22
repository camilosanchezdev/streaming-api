import { Test, TestingModule } from '@nestjs/testing';
import { Role } from '@prisma/client';
import { CreateUpdateRoleDto } from '../../features/roles/dtos/create-update-role.dto';
import { RolesController } from '../../features/roles/roles.controller';
import { RolesService } from '../../features/roles/roles.service';

describe('RolesController', () => {
    let controller: RolesController;
    let service: RolesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [RolesController],
            providers: [
                {
                    provide: RolesService,
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

        controller = module.get<RolesController>(RolesController);
        service = module.get<RolesService>(RolesService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('getAll', () => {
        it('should return an array of roles', async () => {
            const result: Role[] = [];

            jest.spyOn(service, 'getAll').mockResolvedValue(result);

            expect(await controller.getAll()).toBe(result);
        });
    });

    describe('getOne', () => {
        it('should return a single role by id', async () => {
            const result: Role = { id: 1, name: 'admin', createdAt: new Date(), updatedAt: new Date(), deleted: false };

            const id = 1;

            jest.spyOn(service, 'getOne').mockResolvedValue(result);

            expect(await controller.getOne(id)).toBe(result);
        });
    });

    describe('create', () => {
        it('should create a new role', async () => {
            const dto: CreateUpdateRoleDto = { name: 'admin' };
            const result: Role = { id: 1, name: 'admin', createdAt: new Date(), updatedAt: new Date(), deleted: false };


            jest.spyOn(service, 'create').mockResolvedValue(result);

            expect(await controller.create(dto)).toBe(result);
        });
    });

    describe('edit', () => {
        it('should update an existing role', async () => {
            const dto: CreateUpdateRoleDto = { name: 'admin' };
            const result: Role = { id: 1, name: 'admin', createdAt: new Date(), updatedAt: new Date(), deleted: false };

            const id = 1;

            jest.spyOn(service, 'update').mockResolvedValue(result);

            expect(await controller.edit(id, dto)).toBe(result);
        });
    });

    describe('remove', () => {
        it('should remove a role by id', async () => {
            const id = 1;
            const result = 1;

            jest.spyOn(service, 'remove').mockResolvedValue(result);

            expect(await controller.remove(id)).toBe(result);
        });
    });
});