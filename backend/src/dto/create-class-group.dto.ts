import { IsNotEmpty, IsString } from 'class-validator';

export class CreateClassGroupDto {
    @IsString()
    @IsNotEmpty()
    name: string;
}
