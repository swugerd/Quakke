import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { JwtPayload } from 'src/auth/interfaces';
import { allowedFileTypes, folders } from 'src/constants';
import config from 'src/constants/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { FileTypes } from 'src/types';
import { FileInput } from 'src/utils/dto/file.input';
import { removeFile } from 'src/utils/remove';
import { uploadFile } from 'src/utils/upload';
import * as uuid from 'uuid';
import { CreateBannerInput } from './dto/create-banner.input';
import { UpdateBannerInput } from './dto/update-banner.input';

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
  ) {}

  async create(createBannerInput: CreateBannerInput, user: JwtPayload) {
    const banner = await this.prismaService.banner.create({
      data: {
        ...createBannerInput,
        userId: user.id,
      },
      include: includeObject,
    });

    return banner;
  }

  async uploadFile(file: FileInput, type: FileTypes) {
    const uploadedFile = await file.file;
    if (!allowedFileTypes[type].includes(uploadedFile.mimetype)) {
      const errorMessage =
        type === 'VIDEOS'
          ? 'File needs to be a video'
          : 'File needs to be an image';
      throw new BadRequestException(errorMessage);
    }

    const fileExtenstion = uploadedFile.filename
      .slice(uploadedFile.filename.lastIndexOf('.'))
      .toLowerCase();
    const fileName = `${uuid.v4()}${fileExtenstion}`;
    const uploadDir = join(
      this.configService.get(config.STATIC_PATH),
      folders[type],
    );

    const fileSize = await uploadFile(
      uploadedFile.createReadStream,
      uploadDir,
      fileName,
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

  async deleteFile(id: number, type: FileTypes) {
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

    await removeFile(
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

  async update(id: number, updateBannerInput: UpdateBannerInput) {
    const banner = await this.prismaService.banner.update({
      where: {
        id,
      },
      data: updateBannerInput,
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

    await removeFile(
      join(this.configService.get(config.STATIC_PATH), folders.IMAGES),
      banner.bannerImage.url,
    );

    if (banner.bannerVideo) {
      await removeFile(
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
