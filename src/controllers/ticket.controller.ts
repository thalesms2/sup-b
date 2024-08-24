import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
    Query,
    Req,
} from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { Prisma } from '@prisma/client'
import { Request } from 'express';
import { Ticket } from '../interfaces/ticket.interface'

@Controller('ticket')
export class TicketController {
    constructor(private readonly prismaService: PrismaService) {}

    @Get()
    hello(): string {
        return 'hello World'
    }

    @Post()
    createNew(@Body() ticket: Ticket): string {
        this.prismaService.ticket.create({
            data: {
                title: ticket.title,
                description: ticket.description,
                public: ticket.public
            },
        });
        return 'sucess';
    }
    
}