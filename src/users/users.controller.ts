import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PrismaService } from '../prisma.service'
import {
  Param,
  Controller,
  UseGuards,
  Get
} from '@nestjs/common'
import { ControllerGeneric } from 'src/controller.generic'
import { UsersService } from './users.service'
import { IUserDTO } from './users.interface'

@Controller('user')
export class UsersController extends ControllerGeneric<IUserDTO> {
    constructor(prismaService: PrismaService, private userService: UsersService) {
        super(prismaService, 'user')
    }

    @UseGuards(JwtAuthGuard)
    @Get('list/:id')
    async list(@Param('id') companyId: string): Promise<Array<{id: number, username: string}>> {
        return await this.prismaService.user.findMany({
            select: {
                id: true,
                username: true,
            },
            where: {
              companyId: Number(companyId)
            }
        })
    }
}