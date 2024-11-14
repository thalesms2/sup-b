import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import {
  ApiBasicAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignInReturnDto } from './interfaces/signInReturn.dto';
import { SignInDto } from './interfaces/signIn.dto';
import { SignUpDto } from './interfaces/signUp.dto';
import { SignUpReturnDto } from './interfaces/signUpReturn.dto';

@ApiBasicAuth('apiKey')
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'Login no sistema' })
  @ApiResponse({
    status: 200,
    description: 'Ok',
    type: [SignInReturnDto],
  })
  signIn(@Body() signInDto: SignInDto): Promise<SignInReturnDto> {
    const result = this.authService.signIn(
      signInDto.username,
      signInDto.password,
    );

    return result;
  }

  @HttpCode(HttpStatus.OK)
  @Post('validate-token')
  @ApiOperation({ summary: 'Validar token' })
  @ApiResponse({
    status: 200,
    description: 'Ok',
    type: Boolean,
  })
  validateToken(@Body() { token }: { token: string }): Promise<boolean> {
    return this.authService.validateToken(token);
  }

  @Post('sign-up')
  @ApiOperation({ summary: 'Cadastro de novos usuários' })
  @ApiResponse({
    status: 200,
    description: 'Ok',
    type: [SignUpReturnDto],
  })
  async signUp(@Body() user: SignUpDto): Promise<SignUpReturnDto> {
    return this.authService.signUp(user);
  }
}
