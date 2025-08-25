import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { DatabaseService } from 'src/database/database.service';
import { v4 as uuid } from 'uuid';

const TABLE_NAME = 'tasks';

type TaskSchema = {
    id: string;
    title: string;
    description: string;
    userId: string;
};

@Injectable()
export class TasksService {
    constructor(
        private readonly usersService: UsersService,
        private readonly databaseService: DatabaseService
    ) { }

    findAll(userId: string) {
        return this.databaseService.findMany(TABLE_NAME, { userId });
    }

    findOne(userId: string, title: string) {
        return this.databaseService.findOne(TABLE_NAME, { userId, title });
    }

    create(data: any) {
        const user = this.usersService.findById(data.userId);
        if (!user) return null;
        try {
            const newData: TaskSchema = { id: uuid(), ...data };

            return this.databaseService.create(TABLE_NAME, newData);
        } catch (error) {
            throw new Error('Error creating task');
        }
    }

    update(userId: string, title: string, updates: any) {
        const user = this.usersService.findById(userId);
        if (!user) return null;
        const task = this.findOne(userId, title);
        if (!task) return null;

        return this.databaseService.update(TABLE_NAME, task.id, updates);
    }

    remove(userId: string, title: string) {
        const user = this.usersService.findById(userId);
        if (!user) return null;
        const task = this.findOne(userId, title);
        if (!task) return null;

        return this.databaseService.remove(TABLE_NAME, task.id);
    }
}
