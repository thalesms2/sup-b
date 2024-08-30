import { Module } from '@nestjs/common'
import { PrismaService } from './prisma.service'

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TicketModule } from 'src/ticket/ticket.module'
import { CompanyModule } from 'src/company/company.module'

@Module({
  imports: [AuthModule, UsersModule, TicketModule, CompanyModule],
  providers: [PrismaService],
})
export class AppModule {}
