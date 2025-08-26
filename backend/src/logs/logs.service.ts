import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { v4 as uuid } from 'uuid';

@Injectable()
export class LogsService {
  constructor(private readonly db: DatabaseService) {}

  async createLog(entry: any) {
    const log = {
      id: uuid(),
      timestamp: new Date().toISOString(),
      ...entry,
    };
    return this.db.create('logs', log);
  }
}
