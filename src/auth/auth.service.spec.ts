import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findOne: jest.fn(),
            signUp: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
            verifyAsync: jest.fn(),
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('signIn', () => {
    it('should return a token and user id if credentials are valid', async () => {
      const date = new Date(Date.now());
      const user = {
        username: 'test',
        password: 'test',
        id: 1,
        isActive: true,
        createdAt: new Date(`${date.getFullYear() + 1}-10-29T14:42:10.000Z`),
        updatedAt: new Date(`${date.getFullYear() + 1}-10-29T14:42:10.000Z`),
        companyId: 1,
      };
      jest.spyOn(usersService, 'findOne').mockResolvedValue(user);
      jest.spyOn(jwtService, 'signAsync').mockResolvedValue('token');

      const result = await authService.signIn('test', 'test');
      expect(result).toEqual({ token: 'token', id: 1 });
    });

    it('should throw UnauthorizedException if credentials are invalid', async () => {
      jest.spyOn(usersService, 'findOne').mockResolvedValue(null);

      await expect(authService.signIn('test', 'wrong')).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('validateUser', () => {
    it('should return user data without password if credentials are valid', async () => {
      const date = new Date(Date.now());
      const user = {
        username: 'test',
        password: 'test',
        id: 1,
        isActive: true,
        createdAt: new Date(`${date.getFullYear() + 1}-10-29T14:42:10.000Z`),
        updatedAt: new Date(`${date.getFullYear() + 1}-10-29T14:42:10.000Z`),
        companyId: 1,
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...expectedResult } = user;
      jest.spyOn(usersService, 'findOne').mockResolvedValue(user);

      const result = await authService.validateUser('test', 'test');
      expect(result).toEqual(expectedResult);
    });

    it('should return null if credentials are invalid', async () => {
      jest.spyOn(usersService, 'findOne').mockResolvedValue(null);

      const result = await authService.validateUser('test', 'wrong');
      expect(result).toBeNull();
    });
  });

  describe('validateToken', () => {
    it('should return true if token is valid', async () => {
      const tokenPayload = { exp: Math.floor(Date.now() / 1000) + 60 };
      jest.spyOn(jwtService, 'verifyAsync').mockResolvedValue(tokenPayload);

      const result = await authService.validateToken('token');
      expect(result).toBe(true);
    });

    it('should return false if token is expired', async () => {
      const tokenPayload = { exp: Math.floor(Date.now() / 1000) - 60 };
      jest.spyOn(jwtService, 'verifyAsync').mockResolvedValue(tokenPayload);

      const result = await authService.validateToken('token');
      expect(result).toBe(false);
    });

    it('should return false if token is invalid', async () => {
      jest
        .spyOn(jwtService, 'verifyAsync')
        .mockRejectedValue(new Error('Invalid token'));

      const result = await authService.validateToken('token');
      expect(result).toBe(false);
    });
  });

  describe('login', () => {
    it('should return an access token', async () => {
      const user = { username: 'test', password: 'test' };
      jest.spyOn(jwtService, 'sign').mockReturnValue('access_token');

      const result = await authService.login(user);
      expect(result).toEqual({ access_token: 'access_token' });
    });
  });

  describe('signUp', () => {
    it('should return the result of usersService.signUp', async () => {
      const date = new Date(Date.now());
      const user = {
        username: 'test',
        password: 'test',
        id: 1,
        isActive: true,
        createdAt: new Date(`${date.getFullYear() + 1}-10-29T14:42:10.000Z`),
        updatedAt: new Date(`${date.getFullYear() + 1}-10-29T14:42:10.000Z`),
        companyId: 1,
      };
      const signUpResult = { id: 1, isActive: true };
      jest.spyOn(usersService, 'signUp').mockResolvedValue(signUpResult);

      const result = await authService.signUp(user);
      expect(result).toEqual(signUpResult);
    });
  });
});
