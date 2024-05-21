
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

import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesEnum } from '../../shared/enums/roles.enum';
import { Roles } from 'src/core/auth/decorators/role.decorator';
import { RoleGuard } from 'src/core/auth/guards/roles.guard';
import { MoviesService } from 'src/features/movies/movies.service';
import { CreateMovieDto } from 'src/features/movies/dtos/create-movie.dto';
import { UpdateMovieDto } from 'src/features/movies/dtos/update-movie.dto';
import { Movie } from '@prisma/client';
import { IListPublicMovies } from 'src/features/movies/interfaces/list-public-movies.interface';

@Controller('movies')
@ApiSecurity('bearer')
@ApiTags('Movies')
export class MoviesController {
    constructor(private readonly engineService: MoviesService) { }

    @Get()
    async getAll(): Promise<Movie[]> {
        return await this.engineService.getAll();
    }

    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Roles(RolesEnum.ADMINISTRADOR)
    @Get('public')
    async getPublicMovies(): Promise<IListPublicMovies> {
        return await this.engineService.getPublicMovies();
    }

    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Roles(RolesEnum.USUARIO_REGULAR)
    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number): Promise<Movie> {
        return await this.engineService.getOne(id);
    }

    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Roles(RolesEnum.ADMINISTRADOR)
    @Post()
    async create(@Body() body: CreateMovieDto): Promise<Movie> {
        return await this.engineService.create(body);
    }

    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Roles(RolesEnum.ADMINISTRADOR)
    @Put(':id')
    async edit(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: UpdateMovieDto,
    ): Promise<Movie> {
        return await this.engineService.update(id, body);
    }

    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Roles(RolesEnum.ADMINISTRADOR)
    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number): Promise<number> {
        return await this.engineService.remove(id);
    }
}
