import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { IUserDTO } from 'src/users/users.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService, 
        private readonly jwtService: JwtService
    ) {}

    async signIn(username: string, pass: string) {
        const user = await this.usersService.findOne(username);
        if (user?.password !== pass) {
            throw new UnauthorizedException();
        }
        const payload = { username: user.username, sub: user.password };
        return {
            token: await this.jwtService.signAsync(payload),
        };
    }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
    async login(user: any) {
        const payload = { username: user.username, sub: user.password };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async signUp(user: IUserDTO) {
        const result = await this.usersService.signUp(user);
        return result;
    }
}