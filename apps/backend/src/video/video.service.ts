import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { JwtPayload } from 'src/auth/interfaces';
import { PrismaService } from 'src/prisma/prisma.service';
import { uploadFileStream } from 'src/utils/upload';
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
    const videoFile = await createVideoInput.video;

    if (videoFile.mimetype !== 'video/mp4') {
      throw new BadRequestException('File needs to be a video');
    }

    const fileName = `${uuid.v4()}${videoFile.filename}`;
    const uploadDir = join(this.configService.get('STATIC_PATH'), 'videos');

    const fileSize = await uploadFileStream(
      videoFile.createReadStream,
      uploadDir,
      fileName,
    );

    const uploadedVideo = await this.prismaService.videoFile.create({
      data: {
        extension: videoFile.mimetype,
        size: fileSize,
        url: fileName,
      },
    });

    const video = await this.prismaService.video.create({
      data: {
        name: createVideoInput.name,
        description: createVideoInput.description,
        author: { connect: { id: user.id } },
        videoFile: { connect: { id: uploadedVideo.id } },
      },
    });

    return video;
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
    const video = await this.prismaService.video.delete({
      where: {
        id,
      },
    });

    return video;
  }
}
