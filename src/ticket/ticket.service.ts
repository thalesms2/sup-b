import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service'

import { ITicketDTO, ITicket } from './ticket.interface'

@Injectable()
export class TicketService {
    constructor(private readonly prismaService: PrismaService) {}

    async createNew(ticket: ITicketDTO): Promise<ITicket> {
        ticket.actions.map((action) => {
            action.isActive = true
            action.userCreatorId = ticket.userCreatorId
            action.clientUserId = Number(action.clientUserId)
        })
        const model: ITicket = await this.prismaService.ticket.create({
            data: {
                title: ticket.title,
                description: ticket.description,
                actions: {
                    createMany: {
                        data: ticket.actions 
                    }
                },
                userCreatorId: ticket.userCreatorId,
                status: ticket.status,
                priority: ticket.priority,
                companyId: ticket.companyId,
                public: ticket.public
            },
            include: {
                actions: true,
            },
        });
        return model
    }

    async edit(id: number, ticket: ITicketDTO): Promise<ITicket> {
        return await this.prismaService.ticket.update({
            where: {
                id: id,
            },
            data: {
                title: ticket.title,
                description: ticket.description,
                actions: {
                    updateMany: {
                        where: {
                            ticketId: id,
                        },
                        data: ticket.actions
                    }
                },
                public: ticket.public
            },
            include: {
                actions: true,
            },
        })
    }
}