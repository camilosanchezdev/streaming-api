import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class CreateMovieDto {

    @ApiProperty()
    @IsString()
    title: string

    @ApiProperty()
    @IsString()
    release_date: string

    @ApiProperty()
    @IsString()
    producer: string

    @ApiProperty()
    @IsString()
    url: string
}