import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import * as fs from 'fs';
import path from 'path';
import { FileDto } from '../utils/dto/file.dto';
import { FileService } from './file.service';

describe('FileService', () => {
  let service: FileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileService, ConfigService],
    }).compile();

    service = module.get<FileService>(FileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createFile', () => {
    it('should create a file', async () => {
      const file = new FileDto();

      file.file = Promise.resolve({
        filename: 'test.jpg',
        mimetype: 'image/jpeg',
        createReadStream: jest.fn(),
        encoding: 'test',
      });

      const result = await service.createFile(file, 'IMAGES');

      expect(result).toEqual({
        fileSize: expect.any(Number),
        fileName: expect.any(String),
      });
    });

    it('should throw an error for an invalid file type', async () => {
      const file = new FileDto();

      file.file = Promise.resolve({
        filename: 'test.jpg',
        mimetype: 'image/jpeg',
        createReadStream: jest.fn(),
        encoding: 'test',
      });

      await expect(service.createFile(file, 'VIDEOS')).rejects.toThrow(
        new BadRequestException('File needs to be a video'),
      );
    });
  });

  describe('deleteFile', () => {
    it('should delete a file', async () => {
      const dir = 'testDir';
      const fileName = 'testFile.txt';

      await service.deleteFile(dir, fileName);

      expect(fs.promises.unlink).toHaveBeenCalledTimes(1);
      expect(fs.promises.unlink).toHaveBeenCalledWith(path.join(dir, fileName));
    });

    it('should throw an error for a non-existent file', async () => {
      const dir = 'testDir';
      const fileName = 'nonExostentFile.txt';

      await expect(service.deleteFile(dir, fileName)).rejects.toThrow(
        new NotFoundException('ENOENT: no such file or directory'),
      );
    });
  });
});
