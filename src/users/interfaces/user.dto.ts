import { IsString, IsBoolean, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @IsString()
  @ApiProperty({
    example: 'user',
    description: 'Username do usuário',
  })
  username: string;

  @IsString()
  @ApiProperty({
    example: 'password',
    description: 'Senha do usuário',
  })
  password: string;

  @IsBoolean()
  @ApiProperty({
    example: true,
    description: 'Usuário está ativo',
  })
  isActive: boolean;

  @IsNumber()
  @ApiProperty({
    example: 1,
    description: 'Id da empresa que o usuário faz parte',
  })
  companyId: number;
}
