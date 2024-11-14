import { Module } from '@nestjs/common';
import { PrismaModule } from '../services/prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TicketModule } from 'src/ticket/ticket.module';
import { CompanyModule } from 'src/company/company.module';

@Module({
  imports: [PrismaModule, AuthModule, UsersModule, TicketModule, CompanyModule],
})
export class AppModule {}
