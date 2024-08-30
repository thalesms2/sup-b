import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PrismaService } from '../prisma.service'
import {
    Controller,
    Post,
    Body,
    Put,
    UseGuards
} from '@nestjs/common'
import { ICompanyDTO } from './company.interface'
import { ControllerGeneric } from '../controller.generic'
import { CompanyService } from './company.service';

@Controller('company')
export class CompanyController extends ControllerGeneric<ICompanyDTO>{
    constructor(prismaService: PrismaService, private companyService: CompanyService) {
        super(prismaService, 'company')
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createNew(@Body() company: ICompanyDTO): Promise<ICompanyDTO> {
        try {
            const result = await this.companyService.createNew(company);
            if(result)
                return result;
        } catch(error) {
            console.log(error);
        }
    }
    
    @UseGuards(JwtAuthGuard)
    @Put()
    async edit(@Body() id: number, company:ICompanyDTO): Promise<ICompanyDTO> {
        try {
            const result = await this.companyService.edit(id, company);
            if(result)
                return result;
        } catch(error) {
            console.log(error);
        }
    }
}