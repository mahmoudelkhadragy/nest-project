import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService)) private usersService: UsersService,
  ) {}

  isAuthenticated = false;

  login(email: string, password: string) {
    const user = this.usersService
      .getUsers()
      .find((user) => user.email === email && user.password === password);
    if (!user) {
      throw new NotFoundException(`email or password is incorrect`);
    }
    this.isAuthenticated = true;
    return 'MY_TOKEN';
  }
}
