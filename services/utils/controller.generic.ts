import {
  Get,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtAuthGuard } from '../../src/auth/guard/jwt-auth.guard';

export class ControllerGeneric<T> {
  constructor(
    readonly prismaService: PrismaService,
    private readonly db: string,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('list-all')
  async listAll(): Promise<Array<T>> {
    return await this.prismaService[this.db].findMany();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findPerId(@Param('id') id: string): Promise<T> {
    try {
      const result = await this.prismaService[this.db].findUnique({
        where: {
          id: parseInt(id),
        },
      });
      if (result) return result;
      throw new HttpException({}, HttpStatus.NO_CONTENT);
    } catch (error) {
      throw new HttpException({ error: error }, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deletePerId(@Param('id') id: string): Promise<T> {
    try {
      const result = await this.prismaService[this.db].delete({
        where: {
          id: parseInt(id),
        },
      });
      if (result) return result;
      throw new HttpException({}, HttpStatus.NO_CONTENT);
    } catch (error) {
      throw new HttpException({ error: error }, HttpStatus.BAD_REQUEST);
    }
  }
}
