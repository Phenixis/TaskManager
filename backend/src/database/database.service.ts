import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

const DB_FILE = 'db.json';

@Injectable()
export class DatabaseService {
  private readDB() {
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(data);
  }

  private writeDB(data: any) {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  }

  findOne(table: string, query: any) {
    const db = this.readDB();
    return db[table].find((item: any) => {
      return Object.keys(query).every(key => item[key] === query[key]);
    });
  }

  findAll(table: string) {
    const db = this.readDB();
    return db[table];
  }

  findById(table: string, id: string) {
    const db = this.readDB();
    return db[table].find((item: any) => item.id === id);
  }

  create(table: string, item: any) {
    const db = this.readDB();
    db[table].push(item);
    this.writeDB(db);
    return item;
  }

  update(table: string, id: string, updates: any) {
    const db = this.readDB();
    const index = db[table].findIndex((item: any) => item.id === id);
    if (index === -1) return null;
    db[table][index] = { ...db[table][index], ...updates };
    this.writeDB(db);
    return db[table][index];
  }

  remove(table: string, id: string) {
    const db = this.readDB();
    db[table] = db[table].filter((item: any) => item.id !== id);
    this.writeDB(db);
    return true;
  }
}
