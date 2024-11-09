import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { UserAvatar } from '@prisma/client';
import { Banner } from '../../banner/entities/banner.entity';
import { Comment } from '../../comment/entities/comment.entity';
import { Complaint } from '../../complaint/entities/complaint.entity';
import fieldsDescriptions from '../../constants/fields.descriptions';
import { History } from '../../history/entities/history.entity';
import { excludePasswordMiddleware } from '../../middlewares/exclude-password.middleware';
import { Notification } from '../../notification/entities/notification.entity';
import { PartnerRequest } from '../../partner-request/entities/partner-request.entity';
import { Playlist } from '../../playlist/entities/playlist.entity';
import { Rating } from '../../rating/entities/rating.entity';
import { Role } from '../../role/entities/role.entity';
import { Setting } from '../../settings/entities/setting.entity';
import { FileEntity } from '../../utils/entities/file.entity';
import { Video } from '../../video/entities/video.entity';
import { SelectedCategory } from './category-field.entity';

@ObjectType()
export class User {
  @Field(() => Int, { description: fieldsDescriptions.id })
  id: number;

  @Field(() => GraphQLISODateTime, {
    description: fieldsDescriptions.createdAt,
  })
  createdAt: Date;

  @Field(() => GraphQLISODateTime, {
    description: fieldsDescriptions.updatedAt,
  })
  updatedAt: Date;

  @Field(() => String, { description: fieldsDescriptions.user.email })
  email: string;

  @Field(() => String, { description: fieldsDescriptions.user.login })
  login: string;

  @Field(() => String, { description: fieldsDescriptions.user.name })
  name: string;

  @Field(() => String, {
    nullable: true,
    middleware: [excludePasswordMiddleware],
    description: fieldsDescriptions.user.password,
  })
  password?: string;

  @Field(() => Boolean, { description: fieldsDescriptions.user.isBanned })
  isBanned: boolean;

  @Field(() => Boolean, { description: fieldsDescriptions.user.isPartner })
  isPartner: boolean;

  @Field(() => Role, { description: fieldsDescriptions.role.name })
  role: Role;

  @Field(() => [SelectedCategory], {
    nullable: true,
    description: fieldsDescriptions.user.selectedCategories,
  })
  selectedCategories?: SelectedCategory[];

  @Field(() => [Banner], {
    nullable: true,
    description: fieldsDescriptions.user.banners,
  })
  banners?: Banner[];

  @Field(() => [Comment], {
    nullable: true,
    description: fieldsDescriptions.user.comments,
  })
  comments?: Comment[];

  @Field(() => [Complaint], {
    nullable: true,
    description: fieldsDescriptions.user.complaints,
  })
  complaints?: Complaint[];

  @Field(() => [Rating], {
    nullable: true,
    description: fieldsDescriptions.user.likes,
  })
  likes?: Rating[];

  @Field(() => [Rating], {
    nullable: true,
    description: fieldsDescriptions.user.dislikes,
  })
  dislikes?: Rating[];

  @Field(() => [Notification], {
    nullable: true,
    description: fieldsDescriptions.user.notifications,
  })
  notifications?: Notification[];

  @Field(() => [PartnerRequest], {
    nullable: true,
    description: fieldsDescriptions.user.partnerRequests,
  })
  partnerRequests?: PartnerRequest[];

  @Field(() => [Playlist], {
    nullable: true,
    description: fieldsDescriptions.user.playlists,
  })
  playlists?: Playlist[];

  @Field(() => [Setting], { description: fieldsDescriptions.user.settings })
  settings: Setting[];

  @Field(() => [User], {
    nullable: true,
    description: fieldsDescriptions.user.subscribers,
  })
  subscribers?: User[];

  @Field(() => FileEntity, {
    nullable: true,
    description: fieldsDescriptions.user.avatar,
  })
  userAvatar?: UserAvatar;

  @Field(() => [Video], {
    nullable: true,
    description: fieldsDescriptions.user.videos,
  })
  videos?: Video[];

  @Field(() => [History], {
    nullable: true,
    description: fieldsDescriptions.user.history,
  })
  history?: History[];
}
