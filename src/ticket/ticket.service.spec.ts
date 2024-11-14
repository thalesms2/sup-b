import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../services/prisma/prisma.service';
import { TicketService } from './ticket.service';
import { ITicketDTO, ITicket } from './ticket.interface';

describe('TicketService', () => {
  let service: TicketService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TicketService,
        {
          provide: PrismaService,
          useValue: {
            ticket: {
              create: jest.fn(),
              update: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<TicketService>(TicketService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should create a new ticket', async () => {
    const ticketDTO: ITicketDTO = {
      title: 'Test Ticket',
      description: 'Test Description',
      actions: [
        {
          clientUserId: 1,
          description: 'Test Action',
          isActive: true,
          userCreatorId: 1,
        },
      ],
      userCreatorId: 1,
      status: 'open',
      priority: 3,
      companyId: 1,
      public: true,
    };

    const createdTicket: ITicket = {
      ...ticketDTO,
      id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      actions: [
        {
          ...ticketDTO.actions[0],
          id: 1,
          isActive: true,
          userCreatorId: 1,
          clientUserId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          ticketId: 1,
        },
      ],
    };

    jest.spyOn(prismaService.ticket, 'create').mockResolvedValue(createdTicket);

    const result = await service.createNew(ticketDTO);
    expect(result).toEqual(createdTicket);
    expect(prismaService.ticket.create).toHaveBeenCalledWith({
      data: {
        title: ticketDTO.title,
        description: ticketDTO.description,
        actions: {
          createMany: {
            data: ticketDTO.actions.map((action) => ({
              ...action,
              isActive: true,
              userCreatorId: ticketDTO.userCreatorId,
              clientUserId: Number(action.clientUserId),
            })),
          },
        },
        userCreatorId: ticketDTO.userCreatorId,
        status: ticketDTO.status,
        priority: ticketDTO.priority,
        companyId: ticketDTO.companyId,
        public: ticketDTO.public,
      },
      include: {
        actions: true,
      },
    });
  });

  it('should edit an existing ticket', async () => {
    const ticketDTO: ITicketDTO = {
      title: 'Updated Ticket',
      description: 'Updated Description',
      actions: [
        {
          clientUserId: 1,
          description: 'Updated Action',
          isActive: true,
          userCreatorId: 1,
        },
      ],
      userCreatorId: 1,
      status: 'open',
      priority: 3,
      companyId: 1,
      public: true,
    };

    const updatedTicket: ITicket = {
      ...ticketDTO,
      id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      actions: [
        {
          ...ticketDTO.actions[0],
          id: 1,
          isActive: true,
          userCreatorId: 1,
          clientUserId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          ticketId: 1,
        },
      ],
    };

    jest.spyOn(prismaService.ticket, 'update').mockResolvedValue(updatedTicket);

    const result = await service.edit(1, ticketDTO);
    expect(result).toEqual(updatedTicket);
    expect(prismaService.ticket.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: {
        title: ticketDTO.title,
        description: ticketDTO.description,
        actions: {
          updateMany: {
            where: { ticketId: 1 },
            data: ticketDTO.actions,
          },
        },
        public: ticketDTO.public,
      },
      include: {
        actions: true,
      },
    });
  });
});
