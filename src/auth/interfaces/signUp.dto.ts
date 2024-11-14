import { IsString, IsBoolean, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
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
  @IsBoolean()
  @ApiProperty({
    example: true,
    description: 'Usuário ativo',
  })
  isActive: boolean;
  @IsNumber()
  @ApiProperty({
    example: 1,
    description: 'Id da empresa',
  })
  companyId: number;
}
