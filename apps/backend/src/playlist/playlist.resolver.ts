import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/decorators';
import { JwtPayload } from 'src/auth/interfaces';
import { CreatePlaylistInput } from './dto/create-playlist.input';
import { UpdatePlaylistInput } from './dto/update-playlist.input';
import { Playlist } from './entities/playlist.entity';
import { PlaylistService } from './playlist.service';

@Resolver(() => Playlist)
export class PlaylistResolver {
  constructor(private readonly playlistService: PlaylistService) {}

  @Mutation(() => Playlist)
  createPlaylist(
    @Args('createPlaylistInput') createPlaylistInput: CreatePlaylistInput,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.playlistService.create(createPlaylistInput, user);
  }

  @Query(() => [Playlist])
  getPlaylists() {
    return this.playlistService.findAll();
  }

  @Query(() => Playlist)
  getPlaylist(@Args('id', { type: () => Int }) id: number) {
    return this.playlistService.findOne(id);
  }

  @Mutation(() => Playlist)
  updatePlaylist(
    @Args('id', { type: () => Int }) id: number,
    @Args('updatePlaylistInput') updatePlaylistInput: UpdatePlaylistInput,
  ) {
    return this.playlistService.update(id, updatePlaylistInput);
  }

  @Mutation(() => Playlist)
  removePlaylist(@Args('id', { type: () => Int }) id: number) {
    return this.playlistService.remove(id);
  }
}
