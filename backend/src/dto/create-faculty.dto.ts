import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateFacultyDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsInt()
    @Min(0)
    @Max(40)
    @IsOptional()
    weeklyWorkload?: number;

    @IsOptional()
    unavailableSlots?: any;

    @IsOptional()
    subjectIds?: string[];
}
