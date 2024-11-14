import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserListDto {
  @IsNumber()
  @ApiProperty({
    example: 1,
    description: 'Id do usuário',
  })
  id: number;

  @IsString()
  @ApiProperty({
    example: 'user',
    description: 'Username do usuário',
  })
  username: string;
}
