import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { JwtPayload } from '../auth/interfaces';
import { folders } from '../constants';
import config from '../constants/config';
import { FileService } from '../file/file.service';
import { PrismaService } from '../prisma/prisma.service';
import { FilesType } from '../types';
import { FileDto } from '../utils/dto/file.dto';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';

const includeObject = {
  bannerImage: true,
  bannerVideo: true,
  user: true,
};

@Injectable()
export class BannerService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly fileService: FileService,
  ) {}

  async create(dto: CreateBannerDto, user: JwtPayload) {
    const banner = await this.prismaService.banner.create({
      data: {
        ...dto,
        userId: user.id,
      },
      include: includeObject,
    });

    return banner;
  }

  async uploadFile(file: FileDto, type: FilesType) {
    const uploadedFile = await file.file;
    const { fileName, fileSize } = await this.fileService.createFile(
      file,
      type,
    );

    const savedFile =
      type === 'VIDEOS'
        ? await this.prismaService.bannerVideo.create({
            data: {
              extension: uploadedFile.mimetype,
              size: fileSize,
              url: fileName,
            },
          })
        : await this.prismaService.bannerImage.create({
            data: {
              extension: uploadedFile.mimetype,
              size: fileSize,
              url: fileName,
            },
          });

    return savedFile;
  }

  async deleteFile(id: number, type: FilesType) {
    const file =
      type === 'VIDEOS'
        ? await this.prismaService.bannerVideo.findUnique({
            where: {
              id,
            },
          })
        : await this.prismaService.bannerImage.findUnique({
            where: {
              id,
            },
          });

    await this.fileService.deleteFile(
      join(this.configService.get(config.STATIC_PATH), folders[type]),
      file.url,
    );

    const deletedFile =
      type === 'VIDEOS'
        ? await this.prismaService.videoFile.delete({
            where: {
              id: file.id,
            },
          })
        : await this.prismaService.videoPreview.delete({
            where: {
              id: file.id,
            },
          });

    return deletedFile;
  }

  async findAll() {
    const banners = await this.prismaService.banner.findMany({
      include: includeObject,
    });

    return banners;
  }

  async findOne(id: number) {
    const banner = await this.prismaService.banner.findUnique({
      where: {
        id,
      },
      include: includeObject,
    });

    return banner;
  }

  async update(id: number, dto: UpdateBannerDto) {
    const banner = await this.prismaService.banner.update({
      where: {
        id,
      },
      data: dto,
      include: includeObject,
    });

    return banner;
  }

  async remove(id: number) {
    const banner = await this.prismaService.banner.findUnique({
      where: {
        id,
      },
      include: includeObject,
    });

    await this.fileService.deleteFile(
      join(this.configService.get(config.STATIC_PATH), folders.IMAGES),
      banner.bannerImage.url,
    );

    if (banner.bannerVideo) {
      await this.fileService.deleteFile(
        join(this.configService.get(config.STATIC_PATH), folders.VIDEOS),
        banner.bannerVideo.url,
      );
    }

    const dbOperations = [
      this.prismaService.banner.delete({
        where: {
          id,
        },
        include: includeObject,
      }),
      this.prismaService.bannerImage.delete({
        where: {
          id: banner.bannerImageId,
        },
      }),
    ];

    if (banner.bannerVideoId) {
      dbOperations.push(
        this.prismaService.bannerVideo.delete({
          where: {
            id: banner.bannerVideoId,
          },
        }),
      );
    }

    const [deletedBanner] = await this.prismaService.$transaction(dbOperations);

    return deletedBanner;
  }
}
