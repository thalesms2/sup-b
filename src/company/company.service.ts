import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service'

import { ICompanyDTO } from './company.interface'

@Injectable()
export class CompanyService {
    constructor(private readonly prismaService: PrismaService) {}

    async createNew(company: ICompanyDTO): Promise<ICompanyDTO> {
        return await this.prismaService.company.create({
            data: {
                doc: company.doc,
                name: company.name,
                email: company.email,
                contact: company.contact,
                isActive: company.isActive
            },
        });
    }

    async edit(id: number, company: ICompanyDTO): Promise<ICompanyDTO> {
        return await this.prismaService.company.update({
            where: {
                id: id,
            },
            data: {
                doc: company.doc,
                name: company.name,
                email: company.email,
                contact: company.contact,
                isActive: company.isActive
            }
        })
    }
}