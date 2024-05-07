import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { UserAvatar } from '@prisma/client';
import { Banner } from 'src/banner/entities/banner.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { Complaint } from 'src/complaint/entities/complaint.entity';
import { excludePasswordMiddleware } from 'src/middlewares/exclude-password.middleware';
import { Notification } from 'src/notification/entities/notification.entity';
import { PartnerRequest } from 'src/partner-request/entities/partner-request.entity';
import { Playlist } from 'src/playlist/entities/playlist.entity';
import { Rating } from 'src/rating/entities/rating.entity';
import { Role } from 'src/role/entities/role.entity';
import { Setting } from 'src/settings/entities/setting.entity';
import { FileEntity } from 'src/utils/entities/file.entity';
import { Video } from 'src/video/entities/video.entity';
import { SelectedCategory } from './category-field.entity';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;

  @Field(() => String)
  email: string;

  @Field(() => String)
  login: string;

  @Field(() => String)
  name: string;

  @Field(() => String, {
    nullable: true,
    middleware: [excludePasswordMiddleware],
  })
  password?: string;

  @Field(() => Boolean)
  isBanned: boolean;

  @Field(() => Boolean)
  isPartner: boolean;

  @Field(() => Role)
  role?: Role;

  @Field(() => [SelectedCategory], { nullable: true })
  selectedCategories?: SelectedCategory[];

  @Field(() => [Banner], { nullable: true })
  banners?: Banner[];

  @Field(() => [Comment], { nullable: true })
  comments?: Comment[];

  @Field(() => [Complaint], { nullable: true })
  complaints?: Complaint[];

  @Field(() => [Rating], { nullable: true })
  likes?: Rating[];

  @Field(() => [Rating], { nullable: true })
  dislikes?: Rating[];

  @Field(() => [Notification], { nullable: true })
  notifications?: Notification[];

  @Field(() => [PartnerRequest], { nullable: true })
  partnerRequests?: PartnerRequest[];

  @Field(() => [Playlist], { nullable: true })
  playlists?: Playlist[];

  @Field(() => [Setting])
  settings: Setting[];

  @Field(() => [User], { nullable: true })
  subscribers?: User[];

  @Field(() => FileEntity, { nullable: true })
  userAvatar?: UserAvatar;

  @Field(() => [Video], { nullable: true })
  videos?: Video[];
}
