import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PrismaService } from '../prisma.service'
import {
    Controller,
    Post,
    Body,
    Put,
    UseGuards
} from '@nestjs/common'
import { ControllerGeneric } from 'src/controller.generic'
import { ITicketDTO, ITicket } from './ticket.interface'
import { TicketService } from './ticket.service'

@Controller('ticket')
export class TicketController extends ControllerGeneric<ITicketDTO> {
    constructor(prismaService: PrismaService, private ticketService: TicketService) {
        super(prismaService, 'ticket')
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createNew(@Body() ticket: ITicketDTO): Promise<ITicket> {
        try {
            const result = await this.ticketService.createNew(ticket);
            if(result)
                return result;
        } catch(error) {
            console.log(error)
        }
    }
    
    @UseGuards(JwtAuthGuard)
    @Put()
    async edit(@Body() id: number, ticket:ITicketDTO): Promise<ITicketDTO> {
        try {
            const result = await this.ticketService.edit(id, ticket);
            if(result)
                return result
        } catch(error) {
            console.log(error)
        }
    }
}