import { Test, TestingModule } from '@nestjs/testing';
import { Banner, BannerTypes, Roles } from '@prisma/client';
import { JwtPayload } from 'src/auth/interfaces';
import { BannerResolver } from './banner.resolver';
import { BannerService } from './banner.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';

// need to write file tests

describe('BannerResolver', () => {
  let resolver: BannerResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BannerResolver,
        {
          provide: BannerService,
          useValue: {
            create: jest.fn(),
            findMany: jest.fn(),
            findUnique: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<BannerResolver>(BannerResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createBanner', () => {
    it('should create banner', async () => {
      const dto: CreateBannerDto = {
        title: 'test banner',
        bannerImageId: 1,
        type: BannerTypes.IMAGE,
      };

      const user: JwtPayload = {
        email: 'mail@mail.ru',
        id: 1,
        role: Roles.ADMIN,
      };

      const createdBanner: Banner = {
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        bannerVideoId: null,
        description: null,
        publishDate: null,
        unpublishDate: null,
        userId: 1,
        ...dto,
      };

      jest.spyOn(resolver, 'createBanner').mockResolvedValue(createdBanner);

      expect(await resolver.createBanner(dto, user)).toEqual(createdBanner);
    });
  });

  describe('getBanners', () => {
    it('should return an array of banners', async () => {
      const banners: Banner[] = [
        {
          id: 1,
          title: 'test banner',
          bannerImageId: 1,
          type: BannerTypes.IMAGE,
          bannerVideoId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
          description: null,
          publishDate: null,
          unpublishDate: null,
          userId: 1,
        },
        {
          id: 2,
          title: 'test banner',
          bannerImageId: 1,
          type: BannerTypes.IMAGE,
          bannerVideoId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
          description: null,
          publishDate: null,
          unpublishDate: null,
          userId: 1,
        },
      ];

      jest.spyOn(resolver, 'getBanners').mockResolvedValue(banners);

      expect(await resolver.getBanners()).toEqual(banners);
    });
  });

  describe('getBanner', () => {
    it('should return a banner by id', async () => {
      const bannerId = 1;

      const banner: Banner = {
        id: bannerId,
        title: 'test banner',
        bannerImageId: 1,
        type: BannerTypes.IMAGE,
        bannerVideoId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        description: null,
        publishDate: null,
        unpublishDate: null,
        userId: 1,
      };

      jest.spyOn(resolver, 'getBanner').mockResolvedValue(banner);

      expect(await resolver.getBanner(bannerId)).toEqual(banner);
    });
  });

  describe('updateBanner', () => {
    it('should update a banner by id', async () => {
      const bannerId = 1;

      const dto: UpdateBannerDto = {
        id: bannerId,
        title: 'test banner',
      };

      const updatedBanner = {
        ...dto,
        bannerImageId: 1,
        type: BannerTypes.IMAGE,
        bannerVideoId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        description: null,
        publishDate: null,
        unpublishDate: null,
        userId: 1,
      };

      jest.spyOn(resolver, 'updateBanner').mockResolvedValue(updatedBanner);

      expect(await resolver.updateBanner(dto)).toEqual(updatedBanner);
    });
  });

  describe('removeBanner', () => {
    it('should remove a banner by id', async () => {
      const bannerId = 1;

      const removedBanner: Banner = {
        id: bannerId,
        title: 'test banner',
        bannerImageId: 1,
        type: BannerTypes.IMAGE,
        bannerVideoId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        description: null,
        publishDate: null,
        unpublishDate: null,
        userId: 1,
      };

      jest.spyOn(resolver, 'removeBanner').mockResolvedValue(removedBanner);

      expect(await resolver.removeBanner(bannerId)).toEqual(removedBanner);
    });
  });
});
