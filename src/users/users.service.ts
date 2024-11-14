import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../services/prisma/prisma.service';
import { UserDto } from './interfaces/user.dto';
import { UserReturnDto } from './interfaces/userReturn.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(username: string): Promise<UserReturnDto> {
    return this.prismaService.user.findUnique({
      where: {
        username: username,
      },
    });
  }

  async signUp(user: UserDto) {
    return this.prismaService.user.create({
      select: {
        id: true,
        isActive: true,
      },
      data: {
        username: user.username,
        password: user.password,
        isActive: user.isActive,
        companyId: user.companyId,
      },
    });
  }

  async list(companyId: number) {
    return await this.prismaService.user.findMany({
      select: {
        id: true,
        username: true,
      },
      where: {
        companyId: companyId,
      },
    });
  }
}
