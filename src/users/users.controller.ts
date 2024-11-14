import { Param, Controller, UseGuards, Get } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { PrismaService } from '../../services/prisma/prisma.service';
import { ControllerGeneric } from '../../services/utils/controller.generic';
import { UsersService } from './users.service';
import { UserReturnDto } from './interfaces/userReturn.dto';
import { UserListDto } from './interfaces/userList.dto';
import {
  ApiBasicAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiBasicAuth('apiKey')
@ApiTags('User')
@Controller('user')
export class UsersController extends ControllerGeneric<UserReturnDto> {
  constructor(
    prismaService: PrismaService,
    private userService: UsersService,
  ) {
    super(prismaService, 'user');
  }

  @UseGuards(JwtAuthGuard)
  @Get('list/:id')
  @ApiOperation({ summary: 'Retorna uma listagem de usuários' })
  @ApiResponse({
    status: 200,
    description: 'Ok',
    type: [UserListDto],
  })
  async list(@Param('id') companyId: string): Promise<Array<UserListDto>> {
    return await this.userService.list(+companyId);
  }
}
