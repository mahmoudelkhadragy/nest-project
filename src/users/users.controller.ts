import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  findAll(@Query('role') role?: 'admin' | 'user' | 'customer') {
    if (role === 'admin') {
      return ['admin1', 'admin2', 'admin3'];
    } else if (role === 'user') {
      return ['user1', 'user2', 'user3'];
    } else if (role === 'customer') {
      return ['customer1', 'customer2', 'customer3'];
    }
    return [];
  }

  @Get('customers')
  getAllCustomers() {
    return [];
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return { id };
  }

  @Post()
  create(@Body() user: {}) {
    return user;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() user: {}) {
    return { id, ...user };
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return { id };
  }
}
