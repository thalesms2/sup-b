import { 
    Body, 
    Controller, 
    Post, 
    HttpCode, 
    HttpStatus, 
    UseGuards,
    Get,
    Request
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { IUserDTO } from 'src/users/users.interface';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: Record<string, any>) {
        return this.authService.signIn(signInDto.username, signInDto.password);
    }

    @HttpCode(HttpStatus.OK)
    @Post('validate-token')
    validateToken(@Body() body :{ token: string }) {
        return this.authService.validateToken(body.token);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }

    @Post('sign-up')
    async signUp(@Body() user: IUserDTO): Promise<{ id: number, isActive: boolean }> {
        return this.authService.signUp(user);
    }
}