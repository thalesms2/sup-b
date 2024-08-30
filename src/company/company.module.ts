import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service'
import { LocalStrategy } from 'src/auth/local.strategy';
import { JwtStrategy } from 'src/auth/jwt.strategy';

import { CompanyController} from './company.controller'
import { CompanyService } from './company.service'

@Module({
    providers: [CompanyService, PrismaService],
    controllers: [CompanyController],
    exports: [CompanyService],
})
export class CompanyModule {}