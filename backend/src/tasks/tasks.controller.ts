import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    @Get()
    findAll(@Body('userId') userId: string) {
        return this.tasksService.findAll(userId);
    }

    @Get(':title')
    findOne(@Body('userId') userId: string, @Param('title') title: string) {
        return this.tasksService.findOne(userId, title);
    }

    @Post()
    create(@Body() data: any) {
        return this.tasksService.create(data);
    }

    @Put(':title')
    update(@Body('userId') userId: string, @Param('title') title: string, @Body("data") updates: any) {
        return this.tasksService.update(userId, title, updates);
    }

    @Delete(':title')
    remove(@Body('userId') userId: string, @Param('title') title: string) {
        return this.tasksService.remove(userId, title);
    }
}
