import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../core/database/database.module';
import { MoviesService } from 'src/features/movies/movies.service';
import { MoviesController } from 'src/features/movies/movies.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [DatabaseModule, HttpModule],
    controllers: [MoviesController],
    providers: [MoviesService],
    exports: [MoviesService],
})
export class MoviesModule { }
