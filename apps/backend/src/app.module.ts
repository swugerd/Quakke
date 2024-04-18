import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { CategoriesModule } from './categories/categories.module';
import { PrismaModule } from './prisma/prisma.module';
import { RoleModule } from './role/role.module';
import { SubCategoriesModule } from './sub-categories/sub-categories.module';
import { TagModule } from './tag/tag.module';
import { UserModule } from './user/user.module';
import { VideoModule } from './video/video.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: process.env.NODE_ENV === 'development' ? true : false,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req, res }) => ({ req, res }),
      useGlobalPrefix: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads'),
      serveRoot: `/${process.env.STATIC_PATH}`,
      serveStaticOptions: {
        extensions: ['jpg', 'jpeg', 'png', 'mp4'],
        index: false,
      },
    }),
    UserModule,
    AuthModule,
    PrismaModule,
    RoleModule,
    CategoriesModule,
    SubCategoriesModule,
    TagModule,
    VideoModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
