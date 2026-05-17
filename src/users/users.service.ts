import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  private readonly users = [
    { id: 1, name: 'Alice', email: 'alice@mail.com', role: 'admin' },
    { id: 2, name: 'Bob', email: 'bob@mail.com', role: 'user' },
    { id: 3, name: 'Charlie', email: 'charlie@mail.com', role: 'customer' },
  ];

  findAll(role?: 'admin' | 'user' | 'customer') {
    if (role) {
      return this.users.filter((user) => user.role === role);
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (user) {
      return user;
    }
    throw new NotFoundException(`User not found`);
  }

  create(user: { name: string; email: string; role: string }) {
    const newUser = { id: this.users.length + 1, ...user };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, user: { name?: string; email?: string; role?: string }) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...user };
      return this.users[index];
    }
    return null;
  }

  delete(id: number) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
      return { id };
    }
    return null;
  }
}
