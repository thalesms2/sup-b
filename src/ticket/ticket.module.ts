import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service'
import { LocalStrategy } from 'src/auth/local.strategy';
import { JwtStrategy } from 'src/auth/jwt.strategy';

import { TicketController} from './ticket.controller'
import { TicketService } from './ticket.service'

@Module({
    providers: [TicketService, PrismaService],
    controllers: [TicketController],
    exports: [TicketService],
})
export class TicketModule {}