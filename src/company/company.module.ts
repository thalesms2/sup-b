import { Module } from '@nestjs/common';
import { PrismaService } from 'services/prisma/prisma.service';

import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';

@Module({
  providers: [CompanyService, PrismaService],
  controllers: [CompanyController],
  exports: [CompanyService],
})
export class CompanyModule {}
