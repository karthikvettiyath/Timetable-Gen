import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class CreateTimeSlotDto {
    @IsInt()
    @Min(1)
    @Max(7)
    dayOfWeek: number;

    @IsString()
    @IsNotEmpty()
    startTime: string;

    @IsString()
    @IsNotEmpty()
    endTime: string;
}
