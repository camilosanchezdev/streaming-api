import { Test, TestingModule } from '@nestjs/testing';
import { Movie } from '@prisma/client';
import { CreateMovieDto } from '../../features/movies/dtos/create-movie.dto';
import { UpdateMovieDto } from '../../features/movies/dtos/update-movie.dto';
import { MoviesController } from '../../features/movies/movies.controller';
import { MoviesService } from '../../features/movies/movies.service';

describe('MoviesController', () => {
    let controller: MoviesController;
    let service: MoviesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [MoviesController],
            providers: [
                {
                    provide: MoviesService,
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

        controller = module.get<MoviesController>(MoviesController);
        service = module.get<MoviesService>(MoviesService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('getAll', () => {
        it('should return an array of movies', async () => {
            const result: Movie[] = [];

            jest.spyOn(service, 'getAll').mockResolvedValue(result);

            expect(await controller.getAll()).toBe(result);
        });
    });

    describe('getOne', () => {
        it('should return a single movie by id', async () => {
            const result: Movie = { id: 1, title: 'Rocky', release_date: '2024-05-21', producer: 'Camilo Sanchez', url: 'https://google.com', createdAt: new Date(), updatedAt: new Date(), deleted: false };

            const id = 1;

            jest.spyOn(service, 'getOne').mockResolvedValue(result);

            expect(await controller.getOne(id)).toBe(result);
        });
    });

    describe('create', () => {
        it('should create a new movie', async () => {
            const dto: CreateMovieDto = { title: 'Rocky', release_date: '2024-05-21', producer: 'Camilo Sanchez', url: 'https://google.com' };
            const result: Movie = { id: 1, title: 'Rocky', release_date: '2024-05-21', producer: 'Camilo Sanchez', url: 'https://google.com', createdAt: new Date(), updatedAt: new Date(), deleted: false };


            jest.spyOn(service, 'create').mockResolvedValue(result);

            expect(await controller.create(dto)).toBe(result);
        });
    });

    describe('edit', () => {
        it('should update an existing movie', async () => {
            const dto: UpdateMovieDto = { title: 'Rocky 2' };
            const result: Movie = { id: 1, title: 'Rocky 2', release_date: '2024-05-21', producer: 'Camilo Sanchez', url: 'https://google.com', createdAt: new Date(), updatedAt: new Date(), deleted: false };

            const id = 1;

            jest.spyOn(service, 'update').mockResolvedValue(result);

            expect(await controller.edit(id, dto)).toBe(result);
        });
    });

    describe('remove', () => {
        it('should remove a movie by id', async () => {
            const id = 1;
            const result = 1;

            jest.spyOn(service, 'remove').mockResolvedValue(result);

            expect(await controller.remove(id)).toBe(result);
        });
    });
});