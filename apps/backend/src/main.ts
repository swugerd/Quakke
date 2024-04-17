import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.setGlobalPrefix(process.env.SERVER_GLOBAL_PREFIX);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({ credentials: true, origin: true });

  await app.listen(process.env.SERVER_PORT);
}

bootstrap();
