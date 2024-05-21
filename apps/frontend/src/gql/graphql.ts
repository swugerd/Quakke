/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
  /** The `Upload` scalar type represents a file upload. */
  Upload: { input: any; output: any; }
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  accessToken: Scalars['String']['output'];
};

export type Banner = {
  __typename?: 'Banner';
  bannerImage: FileEntity;
  bannerVideo?: Maybe<FileEntity>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  publishDate: Scalars['DateTime']['output'];
  title: Scalars['String']['output'];
  type: BannerTypes;
  unpublishDate: Scalars['DateTime']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: User;
};

export enum BannerTypes {
  Image = 'IMAGE',
  Stream = 'STREAM',
  Video = 'VIDEO'
}

export type CategoriesQuerySearchDto = {
  limit: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  offset?: Scalars['Int']['input'];
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<OrderEnum>;
};

export type Category = {
  __typename?: 'Category';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  subCategories: Array<SubCategory>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CategoryPagination = {
  __typename?: 'CategoryPagination';
  count: Scalars['Int']['output'];
  data: Array<Category>;
};

export type Comment = {
  __typename?: 'Comment';
  createdAt: Scalars['DateTime']['output'];
  dislikes?: Maybe<Array<Rating>>;
  id: Scalars['Int']['output'];
  likes?: Maybe<Array<Rating>>;
  parent?: Maybe<Comment>;
  replies?: Maybe<Array<Comment>>;
  text: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  video: Video;
};

export type CommentPagination = {
  __typename?: 'CommentPagination';
  count: Scalars['Int']['output'];
  data: Array<Comment>;
};

export type CommentsQuerySearchDto = {
  limit: Scalars['Int']['input'];
  offset?: Scalars['Int']['input'];
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<OrderEnum>;
  text?: InputMaybe<Scalars['String']['input']>;
};

export type Complaint = {
  __typename?: 'Complaint';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  reason: ComplaintReasons;
  updatedAt: Scalars['DateTime']['output'];
  user?: Maybe<User>;
  video?: Maybe<Video>;
};

export type ComplaintPagination = {
  __typename?: 'ComplaintPagination';
  count: Scalars['Int']['output'];
  data: Array<Complaint>;
};

export type ComplaintQuerySearchDto = {
  limit: Scalars['Int']['input'];
  message?: InputMaybe<Scalars['String']['input']>;
  offset?: Scalars['Int']['input'];
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<OrderEnum>;
  reason?: InputMaybe<ComplaintReasons>;
};

export enum ComplaintReasons {
  Inconsistency = 'INCONSISTENCY',
  Negative = 'NEGATIVE',
  Racism = 'RACISM'
}

export type CreateBannerDto = {
  bannerImageId: Scalars['Int']['input'];
  bannerVideoId?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  publishDate?: InputMaybe<Scalars['DateTime']['input']>;
  title: Scalars['String']['input'];
  type: BannerTypes;
  unpublishDate?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CreateCategoryDto = {
  name: Scalars['String']['input'];
};

export type CreateCommentDto = {
  parentId?: InputMaybe<Scalars['Int']['input']>;
  text: Scalars['String']['input'];
  videoId: Scalars['Int']['input'];
};

export type CreateComplaintDto = {
  message: Scalars['String']['input'];
  reason: ComplaintReasons;
  userId?: InputMaybe<Scalars['Int']['input']>;
  videoId?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateNotificationDto = {
  type: Notifications;
  userId?: InputMaybe<Scalars['Int']['input']>;
};

export type CreatePartnerRequestDto = {
  message: Scalars['String']['input'];
};

export type CreatePlaylistDto = {
  name: Scalars['String']['input'];
};

export type CreateRatingDto = {
  commentId?: InputMaybe<Scalars['Int']['input']>;
  type: RatingEnum;
  videoId?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateRoleDto = {
  name: Roles;
};

export type CreateSettingDto = {
  userId: Scalars['Int']['input'];
};

export type CreateSubCategoryDto = {
  categoryId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
};

export type CreateTagDto = {
  name: Scalars['String']['input'];
};

export type CreateUserDto = {
  email: Scalars['String']['input'];
  login: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  userAvatarId?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateVideoDto = {
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  subCategoryId?: InputMaybe<Scalars['Int']['input']>;
  videoFileId: Scalars['Int']['input'];
  videoPreviewId?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateViewDto = {
  videoId: Scalars['Int']['input'];
};

export type EmailResponse = {
  __typename?: 'EmailResponse';
  message: Scalars['String']['output'];
};

export type FileDto = {
  file: Scalars['Upload']['input'];
};

export type FileEntity = {
  __typename?: 'FileEntity';
  createdAt: Scalars['DateTime']['output'];
  extension: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  size: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
  url: Scalars['String']['output'];
};

export type LogoutResponse = {
  __typename?: 'LogoutResponse';
  success: Scalars['Boolean']['output'];
};

export type Monitoring = {
  __typename?: 'Monitoring';
  commentsCount: Scalars['Int']['output'];
  dislikesCount: Scalars['Int']['output'];
  likesCount: Scalars['Int']['output'];
  subscribersCount: Scalars['Int']['output'];
  viewsCount: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addVideoToPlaylist: Playlist;
  createBanner: Banner;
  createCategory: Category;
  createComment: Comment;
  createComplaint: Complaint;
  createNotification: Notification;
  createPartnerRequest: PartnerRequest;
  createPlaylist: Playlist;
  createRating: Rating;
  createRole: Role;
  createSettings: Setting;
  createSubCategory: SubCategory;
  createTag: Tag;
  createUser: User;
  createVideo: Video;
  createView: View;
  dropAvatar: FileEntity;
  dropBannerImage: FileEntity;
  dropBannerVideo: FileEntity;
  dropPreview: FileEntity;
  dropVideo: FileEntity;
  login: AuthResponse;
  logout: LogoutResponse;
  refreshTokens: AuthResponse;
  register: AuthResponse;
  removeBanner: Banner;
  removeCategory: Category;
  removeComment: Comment;
  removeComplaint: Complaint;
  removeFromPlaylist: Playlist;
  removeNotification: Notification;
  removePartnerRequest: PartnerRequest;
  removePlaylist: Playlist;
  removeRating: Rating;
  removeRole: Role;
  removeSettings: Setting;
  removeSubCategory: SubCategory;
  removeTag: Tag;
  removeUser: User;
  removeVideo: Video;
  removeView: View;
  setNewPassord: EmailResponse;
  updateBanner: Banner;
  updateCategory: Category;
  updateComment: Comment;
  updateComplaint: Complaint;
  updateNotification: Notification;
  updatePartnerRequest: PartnerRequest;
  updatePlaylist: Playlist;
  updateRating: Rating;
  updateRole: Role;
  updateSettings: Setting;
  updateSubCategory: SubCategory;
  updateTag: Tag;
  updateUser: User;
  updateVideo: Video;
  updateView: View;
  uploadAvatar: FileEntity;
  uploadBannerImage: FileEntity;
  uploadBannerVideo: FileEntity;
  uploadPreview: FileEntity;
  uploadVideo: FileEntity;
};


export type MutationAddVideoToPlaylistArgs = {
  dto: VideoPlaylistDto;
};


export type MutationCreateBannerArgs = {
  dto: CreateBannerDto;
};


export type MutationCreateCategoryArgs = {
  dto: CreateCategoryDto;
};


export type MutationCreateCommentArgs = {
  dto: CreateCommentDto;
};


export type MutationCreateComplaintArgs = {
  dto: CreateComplaintDto;
};


export type MutationCreateNotificationArgs = {
  dto: CreateNotificationDto;
};


export type MutationCreatePartnerRequestArgs = {
  dto: CreatePartnerRequestDto;
};


export type MutationCreatePlaylistArgs = {
  dto: CreatePlaylistDto;
};


export type MutationCreateRatingArgs = {
  dto: CreateRatingDto;
};


export type MutationCreateRoleArgs = {
  dto: CreateRoleDto;
};


export type MutationCreateSettingsArgs = {
  dto: CreateSettingDto;
};


export type MutationCreateSubCategoryArgs = {
  dto: CreateSubCategoryDto;
};


export type MutationCreateTagArgs = {
  dto: CreateTagDto;
};


export type MutationCreateUserArgs = {
  dto: CreateUserDto;
};


export type MutationCreateVideoArgs = {
  dto: CreateVideoDto;
};


export type MutationCreateViewArgs = {
  dto: CreateViewDto;
};


export type MutationDropAvatarArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDropBannerImageArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDropBannerVideoArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDropPreviewArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDropVideoArgs = {
  id: Scalars['Int']['input'];
};


export type MutationLoginArgs = {
  dto: SignInDto;
};


export type MutationRegisterArgs = {
  dto: SignUpDto;
};


export type MutationRemoveBannerArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveCommentArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveComplaintArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveFromPlaylistArgs = {
  dto: VideoPlaylistDto;
};


export type MutationRemoveNotificationArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemovePartnerRequestArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemovePlaylistArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveRatingArgs = {
  id: Scalars['Int']['input'];
  type: RatingEnum;
};


export type MutationRemoveRoleArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveSettingsArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveSubCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveTagArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveUserArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveVideoArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveViewArgs = {
  id: Scalars['Int']['input'];
};


export type MutationSetNewPassordArgs = {
  dto: ResetPasswordDto;
};


export type MutationUpdateBannerArgs = {
  dto: UpdateBannerDto;
};


export type MutationUpdateCategoryArgs = {
  dto: UpdateCategoryDto;
};


export type MutationUpdateCommentArgs = {
  dto: UpdateCommentDto;
};


export type MutationUpdateComplaintArgs = {
  dto: UpdateComplaintDto;
};


export type MutationUpdateNotificationArgs = {
  dto: UpdateNotificationDto;
};


export type MutationUpdatePartnerRequestArgs = {
  dto: UpdatePartnerRequestDto;
};


export type MutationUpdatePlaylistArgs = {
  dto: UpdatePlaylistDto;
};


export type MutationUpdateRatingArgs = {
  dto: UpdateRatingDto;
};


export type MutationUpdateRoleArgs = {
  dto: UpdateRoleDto;
};


export type MutationUpdateSettingsArgs = {
  dto: UpdateSettingDto;
};


export type MutationUpdateSubCategoryArgs = {
  dto: UpdateSubCategoryDto;
};


export type MutationUpdateTagArgs = {
  dto: UpdateTagDto;
};


export type MutationUpdateUserArgs = {
  dto: UpdateUserDto;
};


export type MutationUpdateVideoArgs = {
  dto: UpdateVideoDto;
};


export type MutationUpdateViewArgs = {
  dto: UpdateViewDto;
};


export type MutationUploadAvatarArgs = {
  file: FileDto;
};


export type MutationUploadBannerImageArgs = {
  file: FileDto;
};


export type MutationUploadBannerVideoArgs = {
  file: FileDto;
};


export type MutationUploadPreviewArgs = {
  file: FileDto;
};


export type MutationUploadVideoArgs = {
  file: FileDto;
};

export type Notification = {
  __typename?: 'Notification';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  type: Notifications;
  updatedAt: Scalars['DateTime']['output'];
  user?: Maybe<User>;
};

export type NotificationPagination = {
  __typename?: 'NotificationPagination';
  count: Scalars['Int']['output'];
  data: Array<Notification>;
};

export type NotificationQuerySearchDto = {
  limit: Scalars['Int']['input'];
  offset?: Scalars['Int']['input'];
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<OrderEnum>;
};

export enum Notifications {
  NewComment = 'NEW_COMMENT',
  NewDislike = 'NEW_DISLIKE',
  NewLike = 'NEW_LIKE',
  NewSubscriber = 'NEW_SUBSCRIBER',
  SystemUpdate = 'SYSTEM_UPDATE',
  VideoBlock = 'VIDEO_BLOCK',
  VideoUnblock = 'VIDEO_UNBLOCK'
}

export enum OrderEnum {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type PartnerRequest = {
  __typename?: 'PartnerRequest';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  status: PartnerRequestStatuses;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
};

export type PartnerRequestPagination = {
  __typename?: 'PartnerRequestPagination';
  count: Scalars['Int']['output'];
  data: Array<PartnerRequest>;
};

export type PartnerRequestQuerySearchDto = {
  limit: Scalars['Int']['input'];
  message?: InputMaybe<Scalars['String']['input']>;
  offset?: Scalars['Int']['input'];
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<OrderEnum>;
  status?: InputMaybe<PartnerRequestStatuses>;
};

export enum PartnerRequestStatuses {
  Approved = 'APPROVED',
  Open = 'OPEN',
  Rejected = 'REJECTED'
}

export type Playlist = {
  __typename?: 'Playlist';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  privacy: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  videos?: Maybe<Array<VideoPlaylist>>;
};

export type PlaylistPagination = {
  __typename?: 'PlaylistPagination';
  count: Scalars['Int']['output'];
  data: Array<Playlist>;
};

export type PlaylistQuerySearchDto = {
  limit: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  offset?: Scalars['Int']['input'];
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<OrderEnum>;
  privacy?: InputMaybe<Privacy>;
};

export enum Privacy {
  Closed = 'CLOSED',
  Open = 'OPEN'
}

export type ProfileResponse = {
  __typename?: 'ProfileResponse';
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  role: Roles;
};

export type Query = {
  __typename?: 'Query';
  getBanner: Banner;
  getBanners: Array<Banner>;
  getCategories: Array<Category>;
  getCategoriesWithQuery: CategoryPagination;
  getCategory: Category;
  getComment: Comment;
  getComments: Array<Comment>;
  getCommentsWithQuery: CommentPagination;
  getComplaint: Complaint;
  getComplaints: Array<Complaint>;
  getComplaintsWithQuery: ComplaintPagination;
  getMe: ProfileResponse;
  getMonitoring: Monitoring;
  getNotification: Notification;
  getNotifications: Array<Notification>;
  getNotificationsWithQuery: NotificationPagination;
  getPartnerRequest: PartnerRequest;
  getPartnerRequests: Array<PartnerRequest>;
  getPartnerRequestsWithQuery: PartnerRequestPagination;
  getPlaylist: Playlist;
  getPlaylists: Array<Playlist>;
  getPlaylistsWithQuery: PlaylistPagination;
  getRating: Rating;
  getRatings: Array<Rating>;
  getRole: Role;
  getRoles: Array<Role>;
  getSettings: Array<Setting>;
  getSettingsById: Setting;
  getSubCategories: Array<SubCategory>;
  getSubCategory: SubCategory;
  getTag: Tag;
  getTags: Array<Tag>;
  getUser: User;
  getUserNotifications: Array<Notification>;
  getUserSettings: Setting;
  getUsers: Array<User>;
  getUsersWithQuery: UserPagination;
  getVideo: Video;
  getVideos: Array<Video>;
  getVideosWithQuery: VideoPagination;
  getView: View;
  getViews: Array<View>;
  sendEmailForgotPassword: EmailResponse;
  sendEmailVerification: EmailResponse;
  verifyEmail: EmailResponse;
};


export type QueryGetBannerArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetCategoriesWithQueryArgs = {
  query: CategoriesQuerySearchDto;
};


export type QueryGetCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetCommentArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetCommentsWithQueryArgs = {
  query: CommentsQuerySearchDto;
};


export type QueryGetComplaintArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetComplaintsWithQueryArgs = {
  query: ComplaintQuerySearchDto;
};


export type QueryGetNotificationArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetNotificationsWithQueryArgs = {
  query: NotificationQuerySearchDto;
};


export type QueryGetPartnerRequestArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetPartnerRequestsWithQueryArgs = {
  query: PartnerRequestQuerySearchDto;
};


export type QueryGetPlaylistArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetPlaylistsWithQueryArgs = {
  query: PlaylistQuerySearchDto;
};


export type QueryGetRatingArgs = {
  id: Scalars['Int']['input'];
  type: RatingEnum;
};


export type QueryGetRatingsArgs = {
  type: RatingEnum;
};


export type QueryGetRoleArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetSettingsByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetSubCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetTagArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetUserArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetUsersWithQueryArgs = {
  query: QuerySearchDto;
};


export type QueryGetVideoArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetVideosWithQueryArgs = {
  query: VideoQuerySearchDto;
};


export type QueryGetViewArgs = {
  id: Scalars['Int']['input'];
};


export type QuerySendEmailForgotPasswordArgs = {
  email: Scalars['String']['input'];
};


export type QuerySendEmailVerificationArgs = {
  email: Scalars['String']['input'];
};


export type QueryVerifyEmailArgs = {
  token: Scalars['String']['input'];
};

export type QuerySearchDto = {
  email?: InputMaybe<Scalars['String']['input']>;
  isBanned?: InputMaybe<Scalars['Boolean']['input']>;
  isPartner?: InputMaybe<Scalars['Boolean']['input']>;
  limit: Scalars['Int']['input'];
  login?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  offset?: Scalars['Int']['input'];
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<OrderEnum>;
};

export type Rating = {
  __typename?: 'Rating';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: User;
};

export enum RatingEnum {
  Dislike = 'DISLIKE',
  Like = 'LIKE'
}

export type ResetPasswordDto = {
  email: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type Role = {
  __typename?: 'Role';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  name: Roles;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export enum Roles {
  Admin = 'ADMIN',
  Moderator = 'MODERATOR',
  User = 'USER'
}

export type SelectedCategory = {
  __typename?: 'SelectedCategory';
  category: Category;
};

export type Setting = {
  __typename?: 'Setting';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  privacy: Privacy;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
};

export type SignInDto = {
  credentials: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type SignUpDto = {
  email: Scalars['String']['input'];
  login: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type SubCategory = {
  __typename?: 'SubCategory';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type Tag = {
  __typename?: 'Tag';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type UpdateBannerDto = {
  bannerImageId?: InputMaybe<Scalars['Int']['input']>;
  bannerVideoId?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  publishDate?: InputMaybe<Scalars['DateTime']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<BannerTypes>;
  unpublishDate?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UpdateCategoryDto = {
  id: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCommentDto = {
  id: Scalars['Int']['input'];
  parentId?: InputMaybe<Scalars['Int']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
  videoId?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateComplaintDto = {
  id: Scalars['Int']['input'];
  message?: InputMaybe<Scalars['String']['input']>;
  reason?: InputMaybe<ComplaintReasons>;
  userId?: InputMaybe<Scalars['Int']['input']>;
  videoId?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateNotificationDto = {
  id: Scalars['Int']['input'];
  type?: InputMaybe<Notifications>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdatePartnerRequestDto = {
  id: Scalars['Int']['input'];
  message?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<PartnerRequestStatuses>;
};

export type UpdatePlaylistDto = {
  id: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateRatingDto = {
  commentId?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['Int']['input'];
  type?: InputMaybe<RatingEnum>;
  videoId?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateRoleDto = {
  id: Scalars['Int']['input'];
  name?: InputMaybe<Roles>;
};

export type UpdateSettingDto = {
  id: Scalars['Int']['input'];
  privacy?: InputMaybe<Privacy>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateSubCategoryDto = {
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateTagDto = {
  id: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserDto = {
  email?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  login?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  userAvatarId?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateVideoDto = {
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  subCategoryId?: InputMaybe<Scalars['Int']['input']>;
  videoFileId?: InputMaybe<Scalars['Int']['input']>;
  videoPreviewId?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateViewDto = {
  id: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
  videoId?: InputMaybe<Scalars['Int']['input']>;
};

export type User = {
  __typename?: 'User';
  banners?: Maybe<Array<Banner>>;
  comments?: Maybe<Array<Comment>>;
  complaints?: Maybe<Array<Complaint>>;
  createdAt: Scalars['DateTime']['output'];
  dislikes?: Maybe<Array<Rating>>;
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  isBanned: Scalars['Boolean']['output'];
  isPartner: Scalars['Boolean']['output'];
  likes?: Maybe<Array<Rating>>;
  login: Scalars['String']['output'];
  name: Scalars['String']['output'];
  notifications?: Maybe<Array<Notification>>;
  partnerRequests?: Maybe<Array<PartnerRequest>>;
  password?: Maybe<Scalars['String']['output']>;
  playlists?: Maybe<Array<Playlist>>;
  role: Role;
  selectedCategories?: Maybe<Array<SelectedCategory>>;
  settings: Array<Setting>;
  subscribers?: Maybe<Array<User>>;
  updatedAt: Scalars['DateTime']['output'];
  userAvatar?: Maybe<FileEntity>;
  videos?: Maybe<Array<Video>>;
};

export type UserPagination = {
  __typename?: 'UserPagination';
  count: Scalars['Int']['output'];
  data: Array<User>;
};

export type Video = {
  __typename?: 'Video';
  author: User;
  category?: Maybe<Category>;
  comments?: Maybe<Array<Comment>>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  dislikes?: Maybe<Array<Rating>>;
  id: Scalars['Int']['output'];
  isBanned: Scalars['Boolean']['output'];
  likes?: Maybe<Array<Rating>>;
  name: Scalars['String']['output'];
  subCategory?: Maybe<SubCategory>;
  tags?: Maybe<Array<Tag>>;
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['Int']['output'];
  videoFile: FileEntity;
  videoPreview?: Maybe<FileEntity>;
};

export type VideoPagination = {
  __typename?: 'VideoPagination';
  count: Scalars['Int']['output'];
  data: Array<Video>;
};

export type VideoPlaylist = {
  __typename?: 'VideoPlaylist';
  video: Video;
};

export type VideoPlaylistDto = {
  playlistId: Scalars['Int']['input'];
  videoId: Scalars['Int']['input'];
};

export type VideoQuerySearchDto = {
  description?: InputMaybe<Scalars['String']['input']>;
  isBanned?: InputMaybe<Scalars['Boolean']['input']>;
  limit: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  offset?: Scalars['Int']['input'];
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<OrderEnum>;
};

export type View = {
  __typename?: 'View';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  video: Video;
};
