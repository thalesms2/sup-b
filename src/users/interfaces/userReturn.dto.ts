import { IsString, IsNumber, IsDate, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserReturnDto {
  @IsNumber()
  @ApiProperty({
    example: 1,
    description: 'Id de usuário',
  })
  id: number;

  @IsDate()
  @ApiProperty({
    example: '2021-09-01T00:00:00.000Z',
    description: 'Data de criação do usuário',
  })
  createdAt: Date;

  @IsDate()
  @ApiProperty({
    example: '2021-09-01T00:00:00.000Z',
    description: 'Data da última alteração do usuário',
  })
  updatedAt: Date;

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
