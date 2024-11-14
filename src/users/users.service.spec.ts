import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../../services/prisma/prisma.service';
import { UserDto } from './interfaces/user.dto';
import { UserReturnDto } from './interfaces/userReturn.dto';

describe('UsersService', () => {
  let service: UsersService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn(),
              create: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a user if found', async () => {
      const date = new Date(Date.now());
      const mockUser: UserReturnDto = {
        id: 1,
        username: 'testuser',
        password: 'password',
        isActive: true,
        companyId: 1,
        createdAt: new Date(`${date.getFullYear() + 1}-10-29T14:42:10.000Z`),
        updatedAt: new Date(`${date.getFullYear() + 1}-10-29T14:42:10.000Z`),
      };
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(mockUser);

      const result = await service.findOne('testuser');
      expect(result).toEqual(mockUser);
    });

    it('should return null if user not found', async () => {
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);

      const result = await service.findOne('nonexistentuser');
      expect(result).toBeNull();
    });
  });

  describe('signUp', () => {
    it('should create a new user', async () => {
      const date = new Date(Date.now());
      const mockUserDTO: UserDto = {
        username: 'newuser',
        password: 'password',
        isActive: true,
        companyId: 1,
      };
      const mockCreatedUser = {
        id: 1,
        isActive: true,
        username: 'newuser',
        password: 'password',
        companyId: 1,
        createdAt: new Date(`${date.getFullYear() + 1}-10-29T14:42:10.000Z`),
        updatedAt: new Date(`${date.getFullYear() + 1}-10-29T14:42:10.000Z`),
      };
      jest
        .spyOn(prismaService.user, 'create')
        .mockResolvedValue(mockCreatedUser);

      const result = await service.signUp(mockUserDTO);
      expect(result).toEqual(mockCreatedUser);
    });
  });
});
