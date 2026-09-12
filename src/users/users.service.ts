import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService)) private authService: AuthService,
  ) {}

  private readonly users = [
    {
      id: 1,
      name: 'Alice',
      email: 'alice@mail.com',
      role: 'admin',
      isMarried: true,
      password: 'password123',
    },
    {
      id: 2,
      name: 'Bob',
      email: 'bob@mail.com',
      role: 'user',
      isMarried: false,
      password: 'password456',
    },
    {
      id: 3,
      name: 'Charlie',
      email: 'charlie@mail.com',
      role: 'customer',
      isMarried: true,
      password: 'password789',
    },
  ];

  getUsers() {
    return this.users;
  }

  findAll(role?: 'admin' | 'user' | 'customer') {
    let users = this.users;
    if (role) {
      users = this.users.filter((user) => user.role === role);
    }
    return this.authService.isAuthenticated
      ? users
      : 'You are not authenticated';
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (user) {
      return user;
    }
    throw new NotFoundException(`User not found`);
  }

  create(user: CreateUserDto) {
    const newUser = { id: this.users.length + 1, ...user };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, user: UpdateUserDto) {
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
