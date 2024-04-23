import { Injectable } from '@nestjs/common';
import { JwtPayload } from 'src/auth/interfaces';
import { PrismaService } from 'src/prisma/prisma.service';
import { exclude } from 'src/utils/exclude';
import { CreatePlaylistInput } from './dto/create-playlist.input';
import { UpdatePlaylistInput } from './dto/update-playlist.input';

const includeObject = {
  user: {
    select: exclude('User', ['password']),
  },
  videos: true,
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

  async update(id: number, updatePlaylistInput: UpdatePlaylistInput) {
    const playlist = await this.prismaService.playlist.update({
      where: {
        id: id,
      },
      data: updatePlaylistInput,
      include: includeObject,
    });

    return playlist;
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
