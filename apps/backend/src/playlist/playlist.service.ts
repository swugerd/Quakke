import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { PlaylistQuerySearchDto } from './dto/query-search.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { VideoPlaylistDto } from './dto/video-playlist.dto';
import { PrismaService } from '../prisma/prisma.service';
import { JwtPayload } from '../auth/interfaces';

const includeObject = {
  user: true,
  videos: {
    select: {
      video: {
        include: {
          author: true,
        },
      },
    },
  },
};

@Injectable()
export class PlaylistService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreatePlaylistDto, user: JwtPayload) {
    const playlist = await this.prismaService.playlist.create({
      data: { ...dto, userId: user.id },
      include: includeObject,
    });

    return playlist;
  }

  async findAll() {
    const playlists = await this.prismaService.playlist.findMany({
      include: includeObject,
    });

    return playlists;
  }

  async getAllWithQuery(query: PlaylistQuerySearchDto) {
    const findManyOptions: Prisma.PlaylistFindManyArgs = {
      where: {},
      skip: query.offset,
      take: query.limit,
    };

    if (query.orderBy && query.orderDirection) {
      findManyOptions.orderBy = [
        Object.fromEntries([[query.orderBy, query.orderDirection]]),
      ];
    }

    const searchParams = PrismaService.getPrismaSearchingProperties({
      name: query.name,
      privacy: query.privacy,
    });

    if (searchParams.length) {
      findManyOptions.where.OR = [...searchParams];
    }

    const [data, count] = await this.prismaService.$transaction([
      this.prismaService.playlist.findMany({
        ...findManyOptions,
      }),
      this.prismaService.playlist.count({ where: findManyOptions.where }),
    ]);

    return {
      data,
      count,
    };
  }

  async findOne(id: number) {
    const playlist = await this.prismaService.playlist.findUnique({
      where: {
        id,
      },
      include: includeObject,
    });

    return playlist;
  }

  async update(dto: UpdatePlaylistDto) {
    const playlist = await this.prismaService.playlist.update({
      where: {
        id: dto.id,
      },
      data: dto,
      include: includeObject,
    });

    return playlist;
  }

  async addToPlaylist(dto: VideoPlaylistDto) {
    const updatedPlaylist = await this.prismaService.playlistsOnVideos.create({
      data: dto,
      include: {
        playlist: {
          include: includeObject,
        },
      },
    });

    return updatedPlaylist.playlist;
  }

  async removeFromPlaylist(dto: VideoPlaylistDto) {
    const updatedPlaylist = await this.prismaService.playlistsOnVideos.delete({
      where: {
        videoId_playlistId: {
          playlistId: dto.playlistId,
          videoId: dto.videoId,
        },
      },
      include: {
        playlist: {
          include: includeObject,
        },
      },
    });

    return updatedPlaylist.playlist;
  }

  async remove(id: number) {
    const playlist = await this.prismaService.playlist.delete({
      where: {
        id,
      },
      include: includeObject,
    });

    return playlist;
  }
}
