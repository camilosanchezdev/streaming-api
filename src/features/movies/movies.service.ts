import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Movie, Prisma, PrismaClient } from '@prisma/client';
import { BaseCrudService } from '../../shared/services/base-crud.service';
import { CreateMovieDto } from 'src/features/movies/dtos/create-movie.dto';
import { UpdateMovieDto } from 'src/features/movies/dtos/update-movie.dto';
import { IListPublicMovies } from 'src/features/movies/interfaces/list-public-movies.interface';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class MoviesService extends BaseCrudService<
    Movie,
    CreateMovieDto,
    UpdateMovieDto,
    Prisma.MovieWhereInput
> {
    protected readonly prismaClient = new PrismaClient();
    protected readonly model = 'Movie';
    constructor(private readonly httpService: HttpService) {
        super();
    }

    async getPublicMovies(): Promise<IListPublicMovies> {
        try {
            const response = await firstValueFrom(this.httpService.get<IListPublicMovies>('https://swapi.dev/api/films'));
            return response.data
        } catch (error) {
            throw new InternalServerErrorException(`Error getting data`);
        }
    }

}
