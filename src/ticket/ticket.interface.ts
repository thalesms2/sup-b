interface ITicketDTO {
    title: string;
    description: string;
    actions: Array<ITicketActionDTO>
    userCreatorId: number;
    companyId: number;
    status: string;
    priority: number;
    public: boolean;
}

interface ITicket {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    description: string;
    actions: Array<ITicketAction>
    userCreatorId: number;
    companyId: number;
    status: string;
    priority: number;
    public: boolean;
}

interface ITicketAction {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    ticketId: number;
    description: string;
    clientUserId: number;
    userCreatorId: number;
    isActive: boolean;
}

interface ITicketActionDTO {
    description: string;
    clientUserId: number;
    isActive: boolean;
    userCreatorId: number;
}

export { 
    ITicketDTO,
    ITicket,
    ITicketAction
}