import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class CreateRoomDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsInt()
    @Min(1)
    capacity: number;

    @IsBoolean()
    @IsOptional()
    isLab?: boolean;

    @IsBoolean()
    @IsOptional()
    hasProjector?: boolean;
}
