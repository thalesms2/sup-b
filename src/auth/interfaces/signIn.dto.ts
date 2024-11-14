import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @IsString()
  @ApiProperty({
    example: 'user',
    description: 'Nome de usuário',
  })
  username: string;

  @IsString()
  @ApiProperty({
    example: 'password',
    description: 'Senha do usuário',
  })
  password: string;
}
