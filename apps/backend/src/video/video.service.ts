import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { JwtPayload } from 'src/auth/interfaces';
import { folders } from 'src/constants';
import config from 'src/constants/config';
import { FileService } from 'src/file/file.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { FilesType } from 'src/types';
import { FileDto } from 'src/utils/dto/file.dto';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';

const includeObject = {
  videoFile: true,
  videoPreview: true,
  author: true,
  category: true,
  subCategory: true,
  tags: true,
  comments: {
    include: {
      likes: true,
      dislikes: true,
    },
  },
  likes: true,
  dislikes: true,
};

@Injectable()
export class VideoService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly fileService: FileService,
  ) {}

  async create(dto: CreateVideoDto, user: JwtPayload) {
    const video = await this.prismaService.video.create({
      data: {
        ...dto,
        userId: user.id,
      },
      include: includeObject,
    });

    return video;
  }

  async uploadFile(file: FileDto, type: FilesType) {
    const uploadedFile = await file.file;
    const { fileName, fileSize } = await this.fileService.createFile(
      file,
      type,
    );

    const savedFile =
      type === 'VIDEOS'
        ? await this.prismaService.videoFile.create({
            data: {
              extension: uploadedFile.mimetype,
              size: fileSize,
              url: fileName,
            },
          })
        : await this.prismaService.videoPreview.create({
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
        ? await this.prismaService.videoFile.findUnique({
            where: {
              id,
            },
          })
        : await this.prismaService.videoPreview.findUnique({
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
    const videos = await this.prismaService.video.findMany({
      include: includeObject,
    });

    return videos;
  }

  async findOne(id: number) {
    const video = await this.prismaService.video.findUnique({
      where: {
        id,
      },
      include: includeObject,
    });

    return video;
  }

  async update(id: number, dto: UpdateVideoDto) {
    const video = await this.prismaService.video.update({
      where: {
        id,
      },
      data: { ...dto },
      include: includeObject,
    });

    return video;
  }

  async remove(id: number) {
    const video = await this.prismaService.video.findUnique({
      where: {
        id,
      },
      include: includeObject,
    });

    await this.fileService.deleteFile(
      join(this.configService.get(config.STATIC_PATH), folders.VIDEOS),
      video.videoFile.url,
    );

    if (video.videoPreview) {
      await this.fileService.deleteFile(
        join(this.configService.get(config.STATIC_PATH), folders.IMAGES),
        video.videoPreview.url,
      );
    }

    const dbOperations = [
      this.prismaService.video.delete({
        where: {
          id,
        },
      }),
      this.prismaService.videoFile.delete({
        where: {
          id: video.videoFileId,
        },
      }),
    ];

    if (video.videoPreviewId) {
      dbOperations.push(
        this.prismaService.videoPreview.delete({
          where: {
            id: video.videoPreviewId,
          },
        }),
      );
    }

    const [deletedVideo] = await this.prismaService.$transaction(dbOperations);

    return deletedVideo;
  }
}
