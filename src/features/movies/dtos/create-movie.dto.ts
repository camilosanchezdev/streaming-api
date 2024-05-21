import { IsString } from "class-validator"

export class CreateMovieDto {

    @IsString()
    title: string

    @IsString()
    release_date: string

    @IsString()
    producer: string

    @IsString()
    url: string
}