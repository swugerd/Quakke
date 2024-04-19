import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { JwtPayload } from 'src/auth/interfaces';
import { folders } from 'src/constants';
import { PrismaService } from 'src/prisma/prisma.service';
import { FileInput } from 'src/utils/dto/file.input';
import { removeFile } from 'src/utils/remove';
import { uploadFile } from 'src/utils/upload';
import * as uuid from 'uuid';
import { CreateVideoInput } from './dto/create-video.input';
import { UpdateVideoInput } from './dto/update-video.input';

@Injectable()
export class VideoService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async create(createVideoInput: CreateVideoInput, user: JwtPayload) {
    const video = await this.prismaService.video.create({
      data: {
        name: createVideoInput.name,
        description: createVideoInput.description,
        author: { connect: { id: user.id } },
        videoFile: { connect: { id: createVideoInput.videoId } },
      },
    });

    return video;
  }

  async uploadVideo(file: FileInput) {
    const uploadedFile = await file.file;
    if (uploadedFile.mimetype !== 'video/mp4') {
      throw new BadRequestException('File needs to be a video');
    }

    const fileExtenstion = uploadedFile.filename
      .slice(uploadedFile.filename.lastIndexOf('.'))
      .toLowerCase();
    const fileName = `${uuid.v4()}${fileExtenstion}`;
    const uploadDir = join(
      this.configService.get('STATIC_PATH'),
      folders.VIDEO,
    );

    const fileSize = await uploadFile(
      uploadedFile.createReadStream,
      uploadDir,
      fileName,
    );

    const uploadedVideo = await this.prismaService.videoFile.create({
      data: {
        extension: uploadedFile.mimetype,
        size: fileSize,
        url: fileName,
      },
    });

    return uploadedVideo;
  }

  async dropVideo(id: number) {
    const videoFile = await this.prismaService.videoFile.findUnique({
      where: {
        id,
      },
    });

    await removeFile(
      join(this.configService.get('STATIC_PATH'), folders.VIDEO),
      videoFile.url,
    );

    const deletedVideoFile = this.prismaService.videoFile.delete({
      where: {
        id: videoFile.id,
      },
    });

    return deletedVideoFile;
  }

  async findAll() {
    const videos = await this.prismaService.video.findMany({
      include: {
        videoFile: true,
        author: true,
      },
    });

    return videos;
  }

  async findOne(id: number) {
    const video = await this.prismaService.video.findUnique({
      where: {
        id,
      },
    });

    return video;
  }

  async update(id: number, updateVideoInput: UpdateVideoInput) {
    const video = await this.prismaService.video.update({
      where: {
        id,
      },
      data: updateVideoInput,
    });

    return video;
  }

  async remove(id: number) {
    const video = await this.prismaService.video.findUnique({
      where: {
        id,
      },
      include: {
        videoFile: true,
      },
    });

    await removeFile(
      join(this.configService.get('STATIC_PATH'), folders.VIDEO),
      video.videoFile.url,
    );

    const [deletedVideo] = await this.prismaService.$transaction([
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
    ]);

    return deletedVideo;
  }
}
