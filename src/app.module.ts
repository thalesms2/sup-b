import { Module } from '@nestjs/common'
import { TicketController } from './controllers/ticket.controller'
import { PrismaService } from './prisma.service'

@Module({
  imports: [],
  controllers: [TicketController],
  providers: [PrismaService],
})
export class AppModule {}
