import { Injectable } from '@nestjs/common';
import { JwtPayload } from 'src/auth/interfaces';
import { PrismaService } from 'src/prisma/prisma.service';
import { exclude } from 'src/utils/exclude';
import { CreatePlaylistInput } from './dto/create-playlist.input';
import { UpdatePlaylistInput } from './dto/update-playlist.input';
import { VideoPlaylistInput } from './dto/video-playlist.input';

const includeObject = {
  user: {
    select: exclude('User', ['password']),
  },
  videos: {
    select: {
      video: {
        include: {
          author: {
            select: exclude('User', ['password']),
          },
        },
      },
    },
  },
};

@Injectable()
export class PlaylistService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createPlaylistInput: CreatePlaylistInput, user: JwtPayload) {
    const playlist = await this.prismaService.playlist.create({
      data: { ...createPlaylistInput, userId: user.id },
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

  async findOne(id: number) {
    const playlist = await this.prismaService.playlist.findUnique({
      where: {
        id,
      },
      include: includeObject,
    });

    return playlist;
  }

  async update(updatePlaylistInput: UpdatePlaylistInput) {
    const playlist = await this.prismaService.playlist.update({
      where: {
        id: updatePlaylistInput.id,
      },
      data: updatePlaylistInput,
      include: includeObject,
    });

    return playlist;
  }

  async addToPlaylist(videoPlaylistInput: VideoPlaylistInput) {
    const updatedPlaylist = await this.prismaService.playlistsOnVideos.create({
      data: videoPlaylistInput,
      include: {
        playlist: {
          include: includeObject,
        },
      },
    });

    return updatedPlaylist.playlist;
  }

  async removeFromPlaylist(videoPlaylistInput: VideoPlaylistInput) {
    const updatedPlaylist = await this.prismaService.playlistsOnVideos.delete({
      where: {
        videoId_playlistId: {
          playlistId: videoPlaylistInput.playlistId,
          videoId: videoPlaylistInput.videoId,
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
