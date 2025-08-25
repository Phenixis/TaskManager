import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { v4 as uuid } from 'uuid';

type UserSchema = {
  id: string;
  username: string;
  password: string;
}

@Injectable()
export class UsersService {
  constructor(private readonly db: DatabaseService) { }

  findAll() {
    return this.db.findAll('users');
  }

  findById(id: string) {
    return this.db.findOne('users', { id });
  }

  findByUsername(username: string) {
    return this.db.findOne('users', { username });
  }

  create(user: any) {
    try {
      const newUser: UserSchema = { id: uuid(), ...user };

      return this.db.create('users', newUser);
    } catch (error) {
      throw new Error('Error creating user');
    }
  }

  update(username: string, updates: any) {
    const user = this.db.findOne('users', { username });
    if (!user) return null;
    return this.db.update('users', user.id, updates);
  }

  remove(username: string) {
    const user = this.db.findOne('users', { username });
    if (!user) return null;
    return this.db.remove('users', user.id);
  }
}
