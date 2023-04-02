import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({
    example: 'Admin',
    description: 'значение роли',
  })
  readonly value: string;
  @ApiProperty({
    example: 'highest form of life',
    description: 'описание роли',
  })
  readonly description: string;
}
