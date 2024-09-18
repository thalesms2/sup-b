import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service'
import { IUserDTO, IUser } from './users.interface'

@Injectable()
export class UsersService {
    constructor(private readonly prismaService: PrismaService) {}

    async findOne(username: string): Promise<IUser> {
        return this.prismaService.user.findUnique({
            where: {
                username:  username
            }
        });
    }
    async signUp(user: IUserDTO) {
        return this.prismaService.user.create({
            select: {
                id: true,
                isActive: true
            },
            data: {
                username: user.username,
                password: user.password,
                isActive: user.isActive,
                companyId: user.companyId,
            }
        })
    }
}