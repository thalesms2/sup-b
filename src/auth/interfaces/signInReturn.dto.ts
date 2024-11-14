import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInReturnDto {
  @IsString()
  @ApiProperty({
    example: 'ahbdsgfiujahgipuadhigdpahu',
    description: 'Token de autenticação',
  })
  token: string;

  @IsNumber()
  @ApiProperty({
    example: 1,
    description: 'Id do usuário',
  })
  id: number;
}
