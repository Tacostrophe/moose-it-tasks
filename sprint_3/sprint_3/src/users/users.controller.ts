import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create_user.dto';
import { User } from './users.model';
import { UsersService } from './users.service';

@ApiTags('пользователи')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'вывод всех пользователей' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  list() {
    return this.usersService.listUsers();
  }

  @ApiOperation({ summary: 'создание пользователя' })
  @ApiResponse({ status: 200, type: User })
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }
}
