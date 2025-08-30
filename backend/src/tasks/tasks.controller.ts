import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { UsersService } from '../users/users.service';
import { usernameRegex } from 'src/users/users.controller';
import { isUUID } from 'class-validator';

export const idRegex = new RegExp(usernameRegex.source + '-\\d+$');
export const statusValues = ["pending", "in-progress", "completed"];
export const priorityValues = ["extremely low", "low", "medium", "high", "extremely high"];
export const titleMaxLength = 101;
export const descriptionMaxLength = 501;

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService, private readonly usersService: UsersService) { }

    @Get()
    findAll(@Body('userId') userId: string) {
        if (!userId || !isUUID(userId)) {
            return { statusCode: 400, message: 'Invalid userId format' }
        }

        if (!this.usersService.findById(userId)) {
            return { statusCode: 404, message: 'User not found' }
        }

        if (this.tasksService.getCount(userId) === 0) {
            return { statusCode: 404, message: 'No tasks found' }
        }

        return this.tasksService.findAll(userId);
    }

    @Get(':id')
    findOne(@Body('userId') userId: string, @Param('id') id: string) {
        if (!userId || !isUUID(userId)) {
            return { statusCode: 400, message: 'Invalid userId format' }
        }

        if (!this.usersService.findById(userId)) {
            return { statusCode: 404, message: 'User not found' }
        }

        if (!id || !idRegex.test(id)) {
            return { statusCode: 400, message: 'Invalid id format' }
        }

        if (!this.tasksService.findOne(userId, id)) {
            return { statusCode: 404, message: 'Task not found' }
        }

        return this.tasksService.findOne(userId, id);
    }

    @Post()
    create(@Body() data: any) {
        if (!data.userId || !isUUID(data.userId)) {
            return { statusCode: 400, message: 'Invalid userId format' }
        }

        if (!this.usersService.findById(data.userId)) {
            return { statusCode: 404, message: 'User not found' }
        }

        if (!data.title || typeof data.title !== 'string' || data.title.trim() === '' || data.title.length >= titleMaxLength) {
            return { statusCode: 400, message: 'Invalid title format' }
        }

        if (!data.description || typeof data.description !== 'string' || data.description.trim() === '' || data.description.length >= descriptionMaxLength) {
            return { statusCode: 400, message: 'Invalid description format' }
        }

        if (!data.status || !statusValues.includes(data.status)) {
            return { statusCode: 400, message: 'Invalid status format' }
        }

        if (!data.priority || !priorityValues.includes(data.priority)) {
            return { statusCode: 400, message: 'Invalid priority format' }
        }

        return this.tasksService.create(data);
    }

    @Put(':id')
    update(@Body('userId') userId: string, @Param('id') id: string, @Body("data") updates: any) {
        if (!userId || !isUUID(userId)) {
            return { statusCode: 400, message: 'Invalid userId format' }
        }

        if (!this.usersService.findById(userId)) {
            return { statusCode: 404, message: 'User not found' }
        }

        if (!id || !idRegex.test(id)) {
            return { statusCode: 400, message: 'Invalid id format' }
        }

        if (!this.tasksService.findOne(userId, id)) {
            return { statusCode: 404, message: 'Task not found' }
        }

        if (updates.title && (typeof updates.title !== 'string' || updates.title.trim() === '' || updates.title.length >= titleMaxLength)) {
            return { statusCode: 400, message: 'Invalid title format' }
        }

        if (updates.description && (typeof updates.description !== 'string' || updates.description.trim() === '' || updates.description.length >= descriptionMaxLength)) {
            return { statusCode: 400, message: 'Invalid description format' }
        }

        if (updates.status && !statusValues.includes(updates.status)) {
            return { statusCode: 400, message: 'Invalid status format' }
        }

        if (updates.priority && !priorityValues.includes(updates.priority)) {
            return { statusCode: 400, message: 'Invalid priority format' }
        }

        return this.tasksService.update(userId, id, updates);
    }

    @Delete(':id')
    remove(@Body('userId') userId: string, @Param('id') id: string) {
        if (!userId || !isUUID(userId)) {
            return { statusCode: 400, message: 'Invalid userId format' }
        }

        if (!this.usersService.findById(userId)) {
            return { statusCode: 404, message: 'User not found' }
        }

        if (!id || !idRegex.test(id)) {
            return { statusCode: 400, message: 'Invalid id format' }
        }

        if (!this.tasksService.findOne(userId, id)) {
            return { statusCode: 404, message: 'Task not found' }
        }

        return this.tasksService.remove(userId, id);
    }
}
