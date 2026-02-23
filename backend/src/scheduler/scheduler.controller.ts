import { Controller, Get, Post } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';

@Controller('scheduler')
export class SchedulerController {
    constructor(private readonly schedulerService: SchedulerService) { }

    @Post('generate')
    generate() {
        return this.schedulerService.generate();
    }

    @Get()
    findAll() {
        return this.schedulerService.findAll();
    }
}
