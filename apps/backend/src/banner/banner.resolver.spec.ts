import { Test, TestingModule } from '@nestjs/testing';
import { BannerTypes, Roles } from '@prisma/client';
import { JwtPayload } from 'src/auth/interfaces';
import { BannerResolver } from './banner.resolver';
import { BannerService } from './banner.service';
import { CreateBannerDto } from './dto/create-banner.dto';

// need to write file tests

const bannerData = {
  bannerImage: null,
  user: null,
  bannerVideo: null,
};

describe('BannerResolver', () => {
  let resolver: BannerResolver;

  const mockBannerService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BannerResolver,
        {
          provide: BannerService,
          useValue: mockBannerService,
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

      const createdBanner = {
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        bannerVideoId: null,
        description: null,
        publishDate: new Date(),
        unpublishDate: new Date(),
        userId: 1,
        ...dto,
        ...bannerData,
      };

      jest.spyOn(resolver, 'createBanner').mockResolvedValue(createdBanner);

      expect(await resolver.createBanner(dto, user)).toEqual(createdBanner);
    });
  });

  describe('getBanners', () => {
    it('should return an array of banners', async () => {
      const banners = [
        {
          id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          bannerVideoId: null,
          description: null,
          publishDate: new Date(),
          unpublishDate: new Date(),
          userId: 1,
          title: 'test banner',
          bannerImageId: 1,
          type: BannerTypes.IMAGE,
          ...bannerData,
        },
      ];

      jest.spyOn(resolver, 'getBanners').mockResolvedValue(banners);

      expect(await resolver.getBanners()).toEqual(banners);
    });
  });

  describe('getBanner', () => {
    it('should return a banner by id', async () => {
      const bannerId = 1;

      const banner = {
        id: bannerId,
        title: 'test banner',
        bannerImageId: 1,
        type: BannerTypes.IMAGE,
        bannerVideoId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        description: null,
        publishDate: new Date(),
        unpublishDate: new Date(),
        userId: 1,
        ...bannerData,
      };

      jest.spyOn(resolver, 'getBanner').mockResolvedValue(banner);

      expect(await resolver.getBanner(bannerId)).toEqual(banner);
    });
  });

  describe('updateBanner', () => {
    it('should update a banner by id', async () => {
      const bannerId = 1;

      const dto = {
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
        publishDate: new Date(),
        unpublishDate: new Date(),
        userId: 1,
        ...bannerData,
      };

      jest.spyOn(resolver, 'updateBanner').mockResolvedValue(updatedBanner);

      expect(await resolver.updateBanner(dto)).toEqual(updatedBanner);
    });
  });

  describe('removeBanner', () => {
    it('should remove a banner by id', async () => {
      const bannerId = 1;

      const removedBanner = {
        id: bannerId,
        title: 'test banner',
        bannerImageId: 1,
        type: BannerTypes.IMAGE,
        bannerVideoId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        description: null,
        publishDate: new Date(),
        unpublishDate: new Date(),
        userId: 1,
        ...bannerData,
      };

      jest.spyOn(resolver, 'removeBanner').mockResolvedValue(removedBanner);

      expect(await resolver.removeBanner(bannerId)).toEqual(removedBanner);
    });
  });
});
