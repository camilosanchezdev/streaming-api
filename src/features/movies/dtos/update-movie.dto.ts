import { IsOptional, IsString } from "class-validator"

export class UpdateMovieDto {

    @IsString()
    @IsOptional()
    title: string

    @IsString()
    @IsOptional()
    release_date: string

    @IsString()
    @IsOptional()
    producer: string

    @IsString()
    @IsOptional()
    url: string
}