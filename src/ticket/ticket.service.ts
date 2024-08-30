import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service'

import { ITicketDTO } from './ticket.interface'

@Injectable()
export class TicketService {
    constructor(private readonly prismaService: PrismaService) {}

    async createNew(ticket: ITicketDTO): Promise<ITicketDTO> {
        return await this.prismaService.ticket.create({
            data: {
                title: ticket.title,
                description: ticket.description,
                public: ticket.public
            },
        });
    }

    async edit(id: number, ticket: ITicketDTO): Promise<ITicketDTO> {
        return await this.prismaService.ticket.update({
            where: {
                id: id,
            },
            data: {
                title: ticket.title,
                description: ticket.description,
                public: ticket.public
            }
        })
    }
}