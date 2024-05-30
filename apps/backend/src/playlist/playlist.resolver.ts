import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../auth/decorators';
import { JwtPayload } from '../auth/interfaces';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { PlaylistQuerySearchDto } from './dto/query-search.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { VideoPlaylistDto } from './dto/video-playlist.dto';
import { PlaylistPagination } from './entities/playlist-pagination.entity';
import { Playlist } from './entities/playlist.entity';
import { PlaylistService } from './playlist.service';

@Resolver(() => Playlist)
export class PlaylistResolver {
  constructor(private readonly playlistService: PlaylistService) {}

  @Mutation(() => Playlist)
  createPlaylist(
    @Args('dto') dto: CreatePlaylistDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.playlistService.create(dto, user);
  }

  @Query(() => [Playlist])
  getPlaylists() {
    return this.playlistService.findAll();
  }

  @Query(() => PlaylistPagination)
  getPlaylistsWithQuery(@Args('query') query: PlaylistQuerySearchDto) {
    return this.playlistService.getAllWithQuery(query);
  }

  @Query(() => Playlist)
  getPlaylist(@Args('id', { type: () => Int }) id: number) {
    return this.playlistService.findOne(id);
  }

  @Mutation(() => Playlist)
  updatePlaylist(@Args('dto') dto: UpdatePlaylistDto) {
    return this.playlistService.update(dto);
  }

  @Mutation(() => Playlist)
  addVideoToPlaylist(@Args('dto') dto: VideoPlaylistDto) {
    return this.playlistService.addToPlaylist(dto);
  }

  @Mutation(() => Playlist)
  removeFromPlaylist(
    @Args('dto')
    dto: VideoPlaylistDto,
  ) {
    return this.playlistService.removeFromPlaylist(dto);
  }

  @Mutation(() => Playlist)
  removePlaylist(@Args('id', { type: () => Int }) id: number) {
    return this.playlistService.remove(id);
  }
}
