import { Controller, Post, Body, Put, UseGuards, Get } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { PrismaService } from '../../services/prisma/prisma.service';
import { ICompanyDTO, ICompany } from './company.interface';
import { IUser } from '../users/users.interface';
import { ControllerGeneric } from '../../services/utils/controller.generic';
import { CompanyService } from './company.service';

@Controller('company')
export class CompanyController extends ControllerGeneric<ICompanyDTO> {
  constructor(
    prismaService: PrismaService,
    private companyService: CompanyService,
  ) {
    super(prismaService, 'company');
  }

  @Get('list')
  async list(): Promise<Array<{ id: number; name: string }>> {
    return await this.prismaService.company.findMany({
      select: {
        id: true,
        name: true,
      },
    });
  }

  @Get('list-users')
  async listUsers(): Promise<
    Array<{
      id: number;
      name: string;
      User: Array<{ id: number; username: string }>;
    }>
  > {
    return await this.prismaService.company.findMany({
      select: {
        id: true,
        name: true,
        User: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createNew(@Body() company: ICompanyDTO): Promise<ICompanyDTO> {
    try {
      const result = await this.companyService.createNew(company);
      if (result) return result;
    } catch (error) {
      console.log(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async edit(@Body() id: number, company: ICompanyDTO): Promise<ICompanyDTO> {
    try {
      const result = await this.companyService.edit(id, company);
      if (result) return result;
    } catch (error) {
      console.log(error);
    }
  }
}
