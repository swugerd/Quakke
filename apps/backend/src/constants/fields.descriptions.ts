import {
  BannerTypes,
  ComplaintReasons,
  Notifications,
  PartnerRequestStatuses,
  Privacy,
  Roles,
} from '@prisma/client';

export default {
  id: 'Unique id',
  createdAt: 'Creation record date with time zone',
  updatedAt: 'Update record date with time zone',
  imageId: 'Unique image id that already uploaded',
  videoId: 'Unique video id that already uploaded',
  banner: {
    publishDate: 'Date of publishing banner to the main page (default now)',
    unPublishDate:
      'Date of unpublishing banner from the main page (default end of day)',
    title: 'Title of banner',
    description: 'Description of banner',
    type: `Banner type (${Object.values(BannerTypes).join(' | ')})`,
  },
  category: {
    name: 'Category name',
  },
  comment: {
    text: 'Comment text',
  },
  complaint: {
    reason: `Complaint reason (${Object.values(ComplaintReasons).join(' | ')})`,
    message: 'Complaint message',
    user: 'User for which a complaint was left',
    video: 'Video for which a complaint was left',
  },
  history: {
    video: 'Video for which a history was left',
    user: 'User that created history',
    time: 'Video timestamp',
  },
  notification: {
    user: 'User for which a notification was left',
    type: `Notification type (${Object.values(Notifications).join(' | ')})`,
  },
  partnerRequest: {
    message: 'Partner request message',
    status: `Partner request status (${Object.values(PartnerRequestStatuses).join(' | ')})`,
    user: 'User that created partner request',
  },
  playlist: {
    name: 'Playlist name',
    privacy: `Playlist privacy (${Object.values(Privacy).join(' | ')})`,
    user: 'Playlist author',
    videos: 'Playlist videos',
  },
  role: {
    name: `Role name (${Object.values(Roles).join(' | ')})`,
  },
  settings: {
    user: 'User settings',
    privacy: `User profile privacy (${Object.values(Privacy).join(' | ')})`,
  },
  subCategory: {
    name: 'Sub category name',
  },
  tag: {
    name: 'Tag name',
  },
  user: {
    email: 'User email',
    login: 'User login',
    name: 'User name',
    password: 'User password',
    isBanned: 'Is user banned or not',
    isPartner: 'Is user partner or not',
    avatar: 'User avatar',
    selectedCategories: 'Selected user categoires',
    banners: 'Created user banners',
    comments: 'User comments',
    complaints: 'User complaints',
    likes: 'User likes',
    dislikes: 'User dislikes',
    notifications: 'User notifications',
    partnerRequests: 'User partner requests',
    playlists: 'User playlists',
    settings: 'User settings',
    subscribers: 'User subscribers',
    videos: 'User videos',
    history: 'User video history',
  },
  video: {
    name: 'Video name',
    description: 'Video description',
    isBanned: 'Is video blocked',
    preview: 'Video preview',
    category: 'Video category',
    subCategory: 'Video sub category',
    author: 'Video author',
    file: 'Video file',
    tags: 'Video tags',
    comments: 'Video comments',
    likes: 'Video likes',
    dislikes: 'Video dislikes',
  },
  views: {
    user: 'User that created view',
    video: 'Video that belongs to view',
  },
};
