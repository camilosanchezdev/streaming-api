import { IsString } from 'class-validator';

export class CreateUpdateRoleDto {
    @IsString()
    name: string;
}
