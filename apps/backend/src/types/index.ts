export type FilesType = 'IMAGES' | 'VIDEOS';
export type LikesType = 'LIKE' | 'DISLIKE';

export enum RatingEnum {
  LIKE = 'LIKE',
  DISLIKE = 'DISLIKE',
}

export enum OrderEnum {
  ASC = 'asc',
  DESC = 'desc',
}

export interface PaginatedData<T> {
  data: T[];
  count: number;
}
