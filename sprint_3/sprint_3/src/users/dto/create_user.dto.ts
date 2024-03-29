import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'example@mail.ru',
    description: 'адрес электронной почты',
  })
  readonly email: string;

  @ApiProperty({
    example: 'password123',
    description: 'пароль',
  })
  readonly password: string;
}
