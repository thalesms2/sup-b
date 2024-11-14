import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../services/prisma/prisma.service';
import { CompanyService } from './company.service';
import { ICompanyDTO } from './company.interface';

describe('CompanyService', () => {
  let service: CompanyService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyService,
        {
          provide: PrismaService,
          useValue: {
            company: {
              create: jest.fn(),
              update: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<CompanyService>(CompanyService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createNew', () => {
    it('should create a new company', async () => {
      const company: ICompanyDTO = {
        doc: '123456789',
        name: 'Test Company',
        email: 'test@example.com',
        contact: '1234567890',
        isActive: true,
      };

      (prismaService.company.create as jest.Mock).mockResolvedValue(company);

      const result = await service.createNew(company);
      expect(result).toEqual(company);
      expect(prismaService.company.create).toHaveBeenCalledWith({
        data: {
          doc: company.doc,
          name: company.name,
          email: company.email,
          contact: company.contact,
          isActive: company.isActive,
        },
      });
    });
  });

  describe('edit', () => {
    it('should update an existing company', async () => {
      const company: ICompanyDTO = {
        doc: '123456789',
        name: 'Updated Company',
        email: 'updated@example.com',
        contact: '0987654321',
        isActive: false,
      };

      (prismaService.company.update as jest.Mock).mockResolvedValue(company);

      const result = await service.edit(1, company);
      expect(result).toEqual(company);
      expect(prismaService.company.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: {
          doc: company.doc,
          name: company.name,
          email: company.email,
          contact: company.contact,
          isActive: company.isActive,
        },
      });
    });
  });
});
