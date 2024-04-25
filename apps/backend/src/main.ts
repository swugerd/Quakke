import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { graphqlUploadExpress } from 'graphql-upload';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(process.env.SERVER_GLOBAL_PREFIX);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({ credentials: true, origin: true });
  app.use(graphqlUploadExpress({ maxFileSize: 1000000000, maxFiles: 5 }));
  app.use(cookieParser());

  await app.listen(process.env.SERVER_PORT);
}

bootstrap();
