import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service'
import { IUserDTO } from './users.interface'

@Injectable()
export class UsersService {
    constructor(private readonly prismaService: PrismaService) {}

    async findOne(username: string): Promise<IUserDTO> {
        return this.prismaService.user.findUnique({
            where: {
                username:  username
            }
        });
    }
    async signUp(user: IUserDTO) {
        return this.prismaService.user.create({
            data: {
                username: user.username,
                password: user.password,
                isActive: user.isActive,
                companyId: user.companyId,
            }
        })
    }
}