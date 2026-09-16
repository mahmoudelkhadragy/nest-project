import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { AuthService } from 'src/auth/auth.service';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService)) private authService: AuthService,
  ) {}

  private readonly users: User[] = [
    {
      id: 1,
      firstName: 'Alice',
      lastName: 'Smith',
      email: 'alice@mail.com',
      gender: 'female',
      password: 'password123',
    },
    {
      id: 2,
      firstName: 'Bob',
      lastName: 'Johnson',
      email: 'bob@mail.com',
      gender: 'male',
      password: 'password456',
    },
    {
      id: 3,
      firstName: 'Charlie',
      lastName: 'Brown',
      email: 'charlie@mail.com',
      gender: 'male',
      password: 'password789',
    },
  ];

  getUsers() {
    return this.users;
  }

  findAll(gender?: string) {
    let users = this.users;
    if (gender) {
      users = this.users.filter((user) => user.gender === gender);
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
    const newUser: User = { id: this.users.length + 1, ...user };
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
