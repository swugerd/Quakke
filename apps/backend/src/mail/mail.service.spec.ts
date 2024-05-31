import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from './mail.service';

describe('MailService', () => {
  let service: MailService;

  const mockPrismaService = {
    emailVerification: {
      findUnique: jest.fn(),
    },
  };

  const mockMailerService = {
    sendMail: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MailService,
        ConfigService,
        {
          provide: MailerService,
          useValue: mockMailerService,
        },
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<MailService>(MailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('sendUserConfirmation', () => {
    it('should send user confirmation email', async () => {
      const email = 'mail@mail.ru';
      const emailVerificationData = {
        email,
        token: 'token',
      };

      jest
        .spyOn(service, 'sendUserConfirmation')
        .mockResolvedValue(emailVerificationData);

      const result = await service.sendUserConfirmation(email);

      expect(result).toBe(emailVerificationData);
    });
  });

  describe('sendForgotPassword', () => {
    it('should send forgot password email', async () => {
      const email = 'mail@mail.ru';
      const forgottenPasswordData = {
        email,
        token: 'token',
      };

      jest
        .spyOn(service, 'sendForgotPassword')
        .mockResolvedValue(forgottenPasswordData);

      const result = await service.sendForgotPassword(email);

      expect(result).toBe(forgottenPasswordData);
    });
  });
});
