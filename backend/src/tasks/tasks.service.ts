import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { DatabaseService } from 'src/database/database.service';

const TABLE_NAME = 'tasks';

type TaskSchema = {
    id: string;
    title: string;
    description: string;
    userId: string;
    status: "todo" | "doing" | "done";
    priority: "extremely low" | "low" | "medium" | "high" | "extremely high";
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

    findOne(userId: string, id: string) {
        return this.databaseService.findOne(TABLE_NAME, { userId, id });
    }

    getCount(userId: string) {
        console.log("Getting count for userId:", userId);
        const tasks = this.findAll(userId);

        console.log(tasks)

        return tasks.length;
    }

    create(data: any) {
        const user = this.usersService.findById(data.userId);
        if (!user) return null;
        try {
            const newData: TaskSchema = { id: user.username + "-" + this.getCount(data.userId), ...data };

            return this.databaseService.create(TABLE_NAME, newData);
        } catch (error) {
            throw new Error('Error creating task');
        }
    }

    update(userId: string, id: string, updates: any) {
        const user = this.usersService.findById(userId);
        if (!user) return null;
        const task = this.findOne(userId, id);
        if (!task) return null;

        return this.databaseService.update(TABLE_NAME, task.id, updates);
    }

    remove(userId: string, id: string) {
        const user = this.usersService.findById(userId);
        if (!user) return null;
        const task = this.findOne(userId, id);
        if (!task) return null;

        return this.databaseService.remove(TABLE_NAME, task.id);
    }
}
