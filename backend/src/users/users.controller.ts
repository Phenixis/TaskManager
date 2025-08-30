import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { UsersService } from './users.service';

export const usernameRegex = /^[a-zA-Z0-9_\.-]{3,16}$/;
export const emailRegex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
export const passwordRegex = /(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,24}$/;


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    if (!users || users.length === 0) {
      return { statusCode: 404, message: 'No users found.' };
    }
    // Return users without password field, as described in README
    return users.map(({ password, ...rest }) => rest);
  }

  @Post()
  async create(@Body() user: any) {
    if (!user.username || !usernameRegex.test(user.username)) {
      return { statusCode: 400, message: 'Invalid username format.' };
    } else if (!user.email || !emailRegex.test(user.email)) {
      return { statusCode: 400, message: 'Invalid email format.' };
    } else if (!user.password || !passwordRegex.test(user.password)) {
      return { statusCode: 400, message: 'Invalid password format.' };
    }

    if (this.usersService.findByUsername(user.username)) {
      return { statusCode: 409, message: 'Username already exists.' };
    } else if (this.usersService.findByEmail(user.email)) {
      return { statusCode: 409, message: 'Email already exists.' };
    }

    const createdUser = await this.usersService.create(user);
    
    const { password, ...rest } = createdUser;

    return rest;
  }

  @Get(':username')
  async findOne(@Param('username') username: string) {
    const user = await this.usersService.findByUsername(username);

    // Return user without password field
    if (!user) {
      return { statusCode: 404, message: 'User not found.' };
    }

    // Return user without password field
    const { password, ...rest } = user;
    return rest;
  }

  @Put(':username')
  async update(@Param('username') username: string, @Body() updates: any) {
    if (this.usersService.findByUsername(username) === null) {
      return { statusCode: 404, message: 'User not found.' };
    }

    if (updates.username && !usernameRegex.test(updates.username)) {
      return { statusCode: 400, message: 'Invalid username format.' };
    } else if (updates.email && !emailRegex.test(updates.email)) {
      return { statusCode: 400, message: 'Invalid email format.' };
    } else if (updates.password && !passwordRegex.test(updates.password)) {
      return { statusCode: 400, message: 'Invalid password format.' };
    }

    if (this.usersService.findByUsername(updates.username)) {
      return { statusCode: 409, message: 'Username already exists.' };
    } else if (this.usersService.findByEmail(updates.email)) {
      return { statusCode: 409, message: 'Email already exists.' };
    }

    const updatedUser = await this.usersService.update(username, updates);

    // Return updated user without password field
    const { password, ...rest } = updatedUser;
    return rest;
  }

  @Delete(':username')
  async remove(@Param('username') username: string) {
    if (this.usersService.findByUsername(username) === null) {
      return { statusCode: 404, message: 'User not found.' };
    }
    // Return a confirmation message as per README
    await this.usersService.remove(username);
    
    return { message: `User '${username}' deleted successfully.` };
  }
}
