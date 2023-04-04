import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create_user.dto';
import { AuthService } from './auth.service';

@ApiTags('авторизация')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  logIn(@Body() userDto: CreateUserDto) {
    return this.authService.logIn(userDto);
  }

  @Post('/signin')
  signIn(@Body() userDto: CreateUserDto) {
    return this.authService.signIn(userDto);
  }
}
