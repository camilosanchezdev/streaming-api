import { ApiProperty } from "@nestjs/swagger"
import { IsOptional, IsString } from "class-validator"

export class UpdateMovieDto {

    @ApiProperty()
    @IsString()
    @IsOptional()
    title?: string

    @ApiProperty()
    @IsString()
    @IsOptional()
    release_date?: string

    @ApiProperty()
    @IsString()
    @IsOptional()
    producer?: string

    @ApiProperty()
    @IsString()
    @IsOptional()
    url?: string
}